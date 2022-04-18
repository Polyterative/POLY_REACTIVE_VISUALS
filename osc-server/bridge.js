let osc = require('node-osc');
let socketIo = require('socket.io');


// this file is used to create a bridge between the osc server and the web client
// without this the web client would not be able to send messages to the osc server and vice versa
// cors config is needed to allow stuff to happen, keep in mind that this is not really secure
// still, it's fine when working in localhost

let server = new socketIo.Server(8081, {
    cors: {
        origin: "http://localhost:4200", methods: ["GET", "POST"]
    }
});

let oscServer, oscClient;

server.on('connection', socket => {

    console.log('a user connected: ' + socket.id);

    // console.log(socket);


    oscServer = new osc.Server(8001, '127.0.0.1');
    oscClient = new osc.Client('127.0.0.1', 8000);

    oscClient.send('/status', socket.id + ' connected');

    oscServer.on('message', function (msg, rinfo) {
        socket.emit('message', msg);
        // console.log('sent OSC message to WS', msg, rinfo);
    });


    socket.on('message', function (obj) {
        var toSend = obj.split(' ');
        oscClient.send(...toSend);
        // console.log('sent WS message to OSC', toSend);
    });
    socket.on("disconnect", function () {
        if (oscServer) {
            oscServer = undefined;
            console.log('oscServer disconnected');
        }
    })
});
