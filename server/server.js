var ws_port = 8890;
var port = 8889;

var http = require("http");
var url = require("url");
var fs = require("fs");
var WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({host: '0.0.0.0', port: ws_port});

static_files = './public';

wss.on('connection', function(ws) {
    //TODO, add support for user tracking
    ws.on('message', function(message, flags) {
        try {
            ws.send(handleInput(message, ws));
            //ws.send(JSON.stringify(input));
        } catch (e) { console.log(e);}
    });
    ws.addEventListener('close', function() { 
        console.log('closing'); 
    });
});

//http.createServer(function (req, res) {
 //   res.writeHead(200, {'Content-Type': 'text/plain'});
    //console.log(req.url);
  //  res.end();
//}).listen(8889, '127.0.0.1');

function handleInput(input, ws) {
    //this function handles all inputs
    var msg = JSON.parse(input);
    console.log(msg);
    switch(msg.type) {
        case 'connection':
            return pack(msg.type,'');
            break;
        case 'message':
            return pack(msg.type, msg.message);
            break;
        case 'dirlist': //request dir list
            //console.log(getDir());
            return pack(msg.type, getDir());
        case 'start_buffer':
            var readStream =
                fs.createReadStream("public/test.mp3")
            readStream.on('data', function(data) {
                    ws.send(data, {binary: true, mask: false});
            });
            readStream.on('end', function(data) {
                    ws.send("{\"type\": \"buffer_reset\", \"msg\": \".\"}");
            });
            break;
        default:
            return "{\"type\": \"error\", \"msg\": "+msg+"}";
    }
}
function pack(type,msg) {
    return JSON.stringify({ type: type,
             msg: msg || '' });
}
//read_files
function getDir() {
    return fs.readdirSync('/home/moredhel/Music/youtube');
}

function readfile(filename) {
    fs.readFile(static_files + filename, 'utf8', function(err, data) {
        if (err) throw err;
        console.log('OK: ' + filename);
        console.log(data)
        });
}
