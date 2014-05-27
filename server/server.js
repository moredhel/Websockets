var net = require('net');
var port = 8889;

var server = net.createServer(function (c) {
    c.write('hello\r\n');
    c.pipe(c);
    });
    server.listen(port, 'localhost');
