var buffer = {
    data: [],
    blob: new Blob([]),
    finished: false,
    push: function(x) {
        if(this.finished) {
            this.finished = false;
            this.data = [];
        }
        this.data.push(x);
    },
    get: function() { conn.ws.send(JSON.stringify({type: 'start_buffer', msg: ''})); }
}
var conn = {
    ws: new WebSocket('ws://192.168.0.186:8890'),
    ret: ''
}

var Msg = { //creating the JSON
    create: function(type, msg) {
        if(type != 'connection' &&
            type != 'message' &&
            type != 'start_buffer' &&
            type != 'dirlist') {
            throw 'invalid message';
        }
        var ret = {
            type: type,
            message: msg || ''
        };
        return JSON.stringify(ret);
    },
    parse: function(msg) {
        if(msg === '') return ''; //empty string was throwing error
        try {
            var parsed = JSON.parse(msg);
            return parsed;
        } catch (e) {
            throw e;
        }
    }
}

conn.ws.onopen = function() {console.log("connected");}; //don't start buffer immediately, otherwise there is a percetpable lag
conn.ws.onerror = function(e) { console.log(e);};
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
            //create final blob
            buffer.blob = new Blob(buffer.data);
            buffer.finished = true;
            break;
        default:
            return options;
    }
}
