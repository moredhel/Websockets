var buffer = {
    //buffer object
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
    get: function() { conn.send(JSON.stringify({type: 'start_buffer', msg: ''})); }
}

function Connection() {
    //connection object
    var ws = new WebSocket('ws://192.168.0.186:8890');
    ws.onopen = function() {console.log("connected"); ready = true;}; //don't start buffer immediately, otherwise there is a percetpable lag
    ws.onerror = function(e) { console.log(e);};
    ws.onmessage = function(msg) {
        if(msg.data instanceof Blob) {
            buffer.push(msg.data);
            return 0;
        }
        this.ret = handle(Msg.parse(msg.data));
    };

    var ready = false;
    var ret = '';
    this.getRet = function() { return ret; };
    //potentially add command queuing if socket not opened yet
    this.send = function(msg) {
        if (ready) {
            ws.send(msg);
            return true;
        }
        else return false;
    };
    
    this.dirList = function() {
        this.send(Msg.create('dirlist',''));
    }

    this.changeTrack = function(trackid) {
        //fetch new song, then clear buffer
        this.send(Msg.create('change_track', trackid));
    }
    var Msg = {
        //creating the JSON
        create: function(type, msg) {
            if(type != 'connection' &&
                type != 'message' &&
                type != 'start_buffer' &&
                type != 'change_track' &&
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
                console.log(msg);
                var parsed = JSON.parse(msg);
                return parsed;
            } catch (e) {
                throw e;
            }
        }
    }
}
