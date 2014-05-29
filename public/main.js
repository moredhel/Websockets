//the main javascript file

//var conn = new WebSocket('ws://127.0.0.1:8890');
//var x;
var conn = {
    ws: new WebSocket('ws://127.0.0.1:8890'),
    msg: '' }

var Msg = { //creating the JSON
    create: function(type, msg) {
        if(type != 'connection' &&
            type != 'message' &&
            type != 'dirlist') {
            throw 'invalid message';
        }
        var msg = {
            type: type,
            message: msg || ''};
        return JSON.stringify(msg);
    },
    parse: function(msg) {
        try {
            var parsed = JSON.parse(msg);
            return parsed;
        } catch (e) {
            throw e;
        }
    }
}

conn.ws.onopen = function() { console.log("connection opened");};
conn.ws.onerror = function() { console.log("error");};
conn.ws.onmessage = function(msg) {
    conn.msg = Msg.parse(msg.data);
};
