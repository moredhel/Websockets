//the main javascript file

//var conn = new WebSocket('ws://127.0.0.1:8890');
//var x;
var buffer = {
    data: [],
    finished: false,
    push: function(x) {
        if(this.finished) {
            this.finished = false;
            this.data = [];
        }
        this.data.push(x);
    }
}
var conn = {
    ws: new WebSocket('ws://127.0.0.1:8890'),
    ret: '' }

var Msg = { //creating the JSON
    create: function(type, msg) {
        if(type != 'connection' &&
            type != 'message' &&
            type != 'dirlist') {
            throw 'invalid message';
        }
        var ret = {
            type: type,
            message: msg || ''};
        return JSON.stringify(ret);
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
    if(msg.data instanceof Blob) {
        buffer.push(msg.data);
        return 0;
    }
    conn.ret = handle(Msg.parse(msg.data));
};
function handle(options) {
    switch(options.type) { 
        case 'buffer_reset':
            buffer.finished = true;
            break;
        default:
            return options;
    }
}
