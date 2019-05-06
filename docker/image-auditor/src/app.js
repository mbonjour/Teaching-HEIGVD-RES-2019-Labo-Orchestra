var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var net = require('net');
var moment = require('moment')

const TCP_PORT = 2205;
const HOST = "127.0.0.1";

const PROTOCOL_MULTICAST_ADDRESS = "239.255.22.5";
const PROTOCOL_PORT = 9907;
var songs = new Map();
songs.set( "ti-ta-ti","piano");
songs.set( "pouet", "trumpet");
songs.set( "trulu","flute");
songs.set( "gzi-gzi","violin");
songs.set( "boum-boum","drum");

var musicians = new Map();

function addMusician(msg){
    var musician = JSON.parse(msg);
    musician.timestamp = Date.now();
    musician.instrument = songs.get(musician.MUSIC);
    musicians.set(musician.UUID, musician)
}

server.bind(PROTOCOL_PORT, function() {
    console.log("Joining multicast group");
    server.addMembership(PROTOCOL_MULTICAST_ADDRESS);
});

server.on('message', function(msg, source) {
    //console.log("Data has arrived: " + msg + ". Source port: " + source.port);
    //TODO: format data correctly
    addMusician(msg);
    //console.log(musicians);
});

var TCPserver = net.createServer((socket) => {
    console.log('Connection on TCP Server');
    musicians.forEach((val, key) => {
        socket.write(JSON.stringify(val));
    })
    socket.end();
});

TCPserver.listen(TCP_PORT, HOST);



