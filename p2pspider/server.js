// 启动spider服务，到网络中爬取种子

'use strict';
var fs = require("fs");
// var post = require('./post');
var P2PSpider = require('../lib');

var p2p = P2PSpider({
    nodesMaxSize: 20, // be careful
    maxConnections: 40, // be careful
    timeout: 5000
});

p2p.ignore(function(infohash, rinfo, callback) {
    var theInfohashIsExistsInDatabase = false;
    callback(theInfohashIsExistsInDatabase);
});

p2p.on('metadata', function(metadata) {
    console.log('');
    // if (!metadata.info.name) {
    //     return;
    // }
    
    // metadata.info.name && console.log('filename======', metadata.info.name.toString('utf-8'));    
    // metadata.magnet && console.log('magnet====', metadata.magnet);
    // metadata.info.pieces && console.log('pieces========', metadata.info.pieces.toString('utf-8'));
    // metadata.info.pieces = "pieces";
    var torrentName = metadata.info.name.toString('utf-8');
    console.log("torrentName === ", torrentName);
    metadata.info.name && (metadata.info.name = torrentName);

    var filesSize = 0,
        files = metadata.info.files;
    if (files) {
        for (var i = 0, len = files.length; i < len; i++) {
            filesSize += files[i].length;
            var a;
            files[i].path = files[i].path.toString('GB2312');
        }
    }

    // var fileContent = metadata.info.name.toString('utf-8') + "\n\n" + metadata.magnet + "\n\n" + filesSize;
    // post(JSON.stringify(metadata));
});

p2p.listen(6881, '0.0.0.0');