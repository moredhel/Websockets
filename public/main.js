function handle(options) {
    switch(options.type) {
        case 'buffer_reset':
            //create final blob
            buffer.blob = new Blob(buffer.data);
            buffer.finished = true;
            break;
        case 'dirlist':
            var ul = document.getElementById('tracks');
            ul.innerHTML = '';
            for(var i = 0; i < options.msg.length; i++) {
               ul.innerHTML = ul.innerHTML + "\n<a href=\"#\"><li onclick=\"changeSong(this)\"track=\""+i+"\" >"+options.msg[i]+"</li></a>"; 
            }
            break;
        default:
            return options;
    }
}
function changeSong(elem) { 
    var track = elem.getAttribute('track');
    conn.changeTrack(track);
}

var audio;
var conn = new Connection();
window.onload = function() {
    audio = document.getElementById('target');
    audio.onended = function(e) { console.log('end');};
    conn.dirList();
}
