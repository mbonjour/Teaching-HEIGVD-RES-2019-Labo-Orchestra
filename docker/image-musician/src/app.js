const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const uuid = require('uuid');
const moment = require('moment');

const PROTOCOL_MULTICAST_ADDRESS = "239.255.22.5";
const PROTOCOL_PORT = 9907;

if(process.argv.length < 2) {
    console.log('Not enough args !');
    return;
}

var instruments = new Map();
	instruments.set("piano", "ti-ta-ti");
	instruments.set("trumpet", "pouet");
	instruments.set("flute", "trulu");
	instruments.set("violin", "gzi-gzi");
	instruments.set("drum", "boum-boum");

var musicianType = process.argv[2];
var song = instruments.get(musicianType);
var myUuid = uuid.v4()
function sendPeriod(){
    var payload = JSON.stringify({
        UUID: myUuid,
        MUSIC: song,
        timestamp : moment()
    });
    message = new Buffer(payload);
    client.send(message, 0, message.length, PROTOCOL_PORT, PROTOCOL_MULTICAST_ADDRESS, function(err, bytes) {        
        console.log("Sending payload: " + payload + " via port " + client.address().port);
    });
}

setInterval(sendPeriod, 1000);