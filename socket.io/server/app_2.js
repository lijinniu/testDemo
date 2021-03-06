/**
**  模拟项目开发中socket.io连接异常；
**/
var io = require('socket.io')(3003);
var fs = require('fs');
var url = require("url");

// 连接成功事件
// socket对象默认属于命名空间：'/'
io.on('connection', function (socket) {
  socket.on('chatevent', function (data, cb) {
  	var msg = data.msg;
  	// 将前台信息 发送给所有人
    cb('success!');
    io.emit('chatevent', data);
  });
  socket.on('disconnect', function (data) {
    console.log('服务器2：已断开连接，data:' + data);
  });

  socket.on('auth', function(data, cb){
    var socketRooms = socket.rooms;
    // var aObjArray = [{x:2}, {y:3},{z:8}];
    // console.log('aObjArray:' + aObjArray);
    // console.log( 'aObjArray_to_string:' + JSON.stringify(aObjArray) );

    // 输出 socket 客户端对象相关属性值
    console.log( 'socket.rooms: ' + JSON.stringify(socketRooms) );
    console.log('socket.id: ' + socket.id);
  	// data里的参数用不着, 100%返回授权通过
  	cb({"code":0, "msg":"xx"});
  });

  socket.on('command', function(data, cb){
  	var _action = "",
  		relData = {"code":0,"msg":"è¯·æ±æåï¼","data":"{\"message\":{\"boomid\":20311,\"num\":1,\"delay\":180,\"ticket\":200,\"players\":[{\"uid\":\"qq-jumyxeyvhr\",\"isBoom\":0,\"isOri\":1,\"avatar\":\"http://004.img.qf.56.itc.cn/group3/M04/26/F5/MTAuMTAuODguODM=/dXBsb2FkRmlsZV8xXzE0NDA1MDY1NzAyODQ=.png\",\"nickname\":\"åå¾ä»\"}]},\"status\":200}"};

  	_action = data.action;
  	// 根据data里参数判断，执行哪一类业务逻辑（本次是主要两中：getTicket  startGame）
  	if (_action == "getTickets"){
  		console.log('服务器2：请求票成功！');
  		cb({"status":200, "data": '服务器2'});
  	} else if(_action == "join"){
  		console.log('服务器2：请求开始游戏成功！');
  		cb(relData);
  		io.emit('startGame', data);
  	}
  });
});
