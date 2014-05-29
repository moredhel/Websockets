var net = require('net');
var WebsocketServer = require('ws').Server;

var sessions = [];

var server = net.createServer(function(socket) {
    socket.write("hello world");
    socket.on('connection', function(ws) {
        console.log('connection opened');
    });
    socket.pipe(socket);
});

server.listen('1337','127.0.0.1');
