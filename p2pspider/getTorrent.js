var fetch = require("isomorphic-fetch");
var bencode = require('bencode');
var connect = require("./connect");

var startId = 7613;

function getTorrentInfo() {
    var url = "http://www.lubezhang.cn/torrent/detail?id=";
    fetch(url + startId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
        .then(response => response.json())
        .then(json => receivePosts(json));
}

function receivePosts(json){
    if(json && json.length < 10) {
        console.log("抓取magnet信息完成");
        process.exit();
        return;
    }

    decode(json.json);
    var torrent = analyzeTorrentInfo(json.json);

    if(torrent) {
        console.log("");
        // console.log("处理结果：", startId," = ",torrent.name);
        console.log("");

        // addInfo(torrent);
    }

    startId++;
    // setTimeout(getTorrentInfo, 1000);
}

function addInfo(torrent) {
    // console.log("addInfo");
    var userAddSql = 'INSERT INTO torrent(src_id, name, magnet, files, server) VALUES (?, ?, ?, ?, ?)';
    var userAddSql_Params = [startId, torrent.name, torrent.magnet, torrent.files, torrent.server];

    connect.do(userAddSql, userAddSql_Params);
}

function analyzeTorrentInfo(torrent) {
    var torrentInfo = {};

    // console.log(torrent);
    try {
        torrent = JSON.parse(torrent);

        torrentInfo.magnet = torrent.magnet ? torrent.magnet : "";
        torrentInfo.server = torrent.address ? (torrent.address + ":" + torrent.port) : "";

        var info = torrent.info;
        if (info) {
            torrentInfo.name = info.name ? info.name : "";
        }

        var filesSize = 0, files = info.files, arrayFiles = [];
        if (files) {
            for (var i = 0, len = files.length; i < len; i++) {
                // filesSize += files[i].length;
                // var a;
                // files[i].path = files[i].path.toString('GB2312');
                arrayFiles.push(files[i].path);
            }
        }
        torrentInfo.files = files ? arrayFiles.join(",") : "";

    } catch (e) {
        return;
        console.log("解析JSON字符串错误");
    }

    return torrentInfo;
}

function decode(torrent){
    torrent = JSON.parse(torrent);
    console.log("pieces", torrent.info);
    // var data = new Buffer(torrent);
    // // console.log("data===",data);
    // // var result = bencode.decode( data )
    // try {
    //     var result = bencode.decode( data, 'utf8' );
    //     console.log("result:",result);

    // } catch (e) {
    //     console.log("decode error:", e);        
    // }
}

getTorrentInfo();