var mysql  = require('mysql');  //调用MySQL模块

var connectEnv = {     
  host     : '10.16.93.35',       //主机
  user     : 'root',               //MySQL认证用户名
  password : 'qwe123',        //MySQL认证用户密码
  port: '3306',                   //端口号
  database: "torrent"
}

var pool = mysql.createPool(connectEnv);

exports.do = function(sql, params, callback) {
  this.getConnection(function(err, connection) {
    if (err) {
      console.log("连接错误", err);
    }
    connection.query(sql, params, function(err) {
      if (err) {
        console.log("连接错误", err);
      }
      // callback.apply(connection, arguments);
      connection.release();
    });
  })
}.bind(pool);

//创建一个connection
// var connection = mysql.createConnection(); 
// //创建一个connection
// connection.connect(function(err){
//     if(err){        
//           console.log('[query] - :'+err);
//         return;
//     }
//       console.log('[connection connect]  succeed!');
// });  
// //执行SQL语句
// connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) { 
//      if (err) {
//              console.log('[query] - :'+err);
//         return;
//      }
//      console.log('The solution is: ', rows[0].solution);  
// });  
// //关闭connection
// connection.end(function(err){
//     if(err){        
//         return;
//     }
//       console.log('[connection end] succeed!');
// });

// var Pool = require('generic-pool').Pool;
// var pool = new Pool({
//   name: 'mysql',
//   create: function(callback) {
//     var Client = require('mysql');
//     // console.log(typeof Client);
//     var c = new Client();
//     c.user = 'root';
//     c.password = 'qwe123';
//     c.database = 'torrent';
//     c.connect();

//     // parameter order: err, resource
//     // new in 1.0.6
//     callback(null, c);
//   },
//   destroy: function(client) {
//     client.end();
//   },
//   max: 10,
//   // optional. if you set this, make sure to drain() (see step 3)
//   min: 2,
//   // specifies how long a resource can stay idle in pool before being removed
//   idleTimeoutMillis: 30000,
//   // if true, logs via console.log - can also be a function
//   log: true
// });

// module.exports = connection;