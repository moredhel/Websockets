//the main javascript file

var conn = new WebSocket('ws://127.0.0.1:8890');
var x;

conn.onopen = function() { console.log("connection opened");};
conn.onerror = function() { console.log("error");};
conn.onmessage = function(msg) { x = JSON.parse(msg.data); }; //add checking TODO
