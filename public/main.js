function handle(options) {
    switch(options.type) {
        case 'buffer_reset':
            //create final blob
            buffer.blobs.push(new Blob(buffer.data));
            var point = 0;
            if(buffer.blobs.length != 0) {
                point = buffer.blobs.length - 1;
            }
            console.log
            blob_url = URL.createObjectURL(buffer.blobs[point]);
            audio.src = blob_url;
            audio.play();
            buffer.finished = true;
            while (true) {
                if(buffer.blobs.length == 1) {
                    break;
                }
                buffer.blobs.splice(0,1);
            }
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
var blob_url = '';
var conn = new Connection();
window.onload = function() {
    audio = document.getElementById('target');
    audio.onended = function(e) { console.log('end');};
    conn.dirList();
}
