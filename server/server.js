var sys = require("sys");
var net = require("net");
var http = require("http");
var magic_string = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"
var key = "4aRdFZG5uYrEUw8dsNLW6g==";

function createTestServer(){
    return new testServer();
};

function testServer(){
    var server = this;
    http.Server.call(server, function(){});

    server.addListener("connection", function(){
            // requests_recv++;
            });

    server.addListener("request", function(req, res){
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.write("okay");
            res.end();
            });

    server.addListener("upgrade", function(req, socket, upgradeHead){
            // done like this as this object cannot be reused https://github.com/joyent/node/issues/1415
            var sec_accept = require('crypto').createHash('sha1').update(req.headers['sec-websocket-key'] + magic_string).digest('base64');
            socket.write( "HTTP/1.1 101 Web Socket Protocol Handshake\r\n"
                + "Upgrade: WebSocket\r\n"
                + "Connection: Upgrade\r\n"
                + "WebSocket-Origin: http://localhost:8889\r\n"
                + "Sec-WebSocket-Accept: " + sec_accept + "\r\n"
                + "WebSocket-Location: ws://localhost:8889/\r\n"
                + "\r\n"
                );

            request_upgradeHead = upgradeHead;

            socket.ondata = function(d, start, end){
            //var data = d.toString('utf8', start, end);
            var original_data = d.toString('utf8', start, end);
            var data = original_data.split('\ufffd')[0].slice(1);
            if(data == "kill"){
            socket.end();
            } else {
            sys.puts(data);
            socket.write("\u0000", "binary");
            socket.write(data, "utf8");
            socket.write("\uffff", "binary");
            }
            };
    });
};

sys.inherits(testServer, http.Server);

var server = createTestServer();
server.listen(8889);
