var http = require("http");
var url = require("url");
var WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({port: 8890});
wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        //console.log('received: %s', message);
        try {
            var input = JSON.parse(message);
            console.log(input);
            console.log(JSON.stringify(input));
            ws.send(JSON.stringify(input));
        } catch (e) { console.log(e);}
    });
    ws.addEventListener('close', function() { 
        console.log('closing'); 
    });
});

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
    }).listen(8889, '127.0.0.1');
