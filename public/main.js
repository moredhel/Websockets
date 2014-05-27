//the main javascript file

var conn = new WebSocket('ws://127.0.0.1:8889');

conn.onopen = function() { console.log("connection opened");};
conn.onerror = function(e) { console.log(e);};
conn.onmessage = function(msg) { console.log(msg);};
