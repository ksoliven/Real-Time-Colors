const express = require("express"),
    port = 8000,
    app = express(),
    bodyparser = require("body-parser"),
    session = require('express-session');
    
var color;

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

const io = require("socket.io")(server);

io.sockets.on('connection', function (socket) {
    var socketId = socket.id;
    var clientIp = socket.request.connection.remoteAddress;

    console.log(clientIp);
});

app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 100000 }
}))

app.use(express.static(__dirname + "/static"));

app.set('views', __dirname + '/views'); 

app.set("view engine", "ejs");

app.get("/", function (request, response) {

    io.on('connection', function (socket) {
        socket.on('imconnected', function (data) {
            socket.emit('updateAllClients', { color: color });
        });

    socket.on('red', function (data) { 
        color = "red";
        io.emit('updateAllClients', { color: "red" });
    });

    socket.on('yellow', function (data) {
        color = "yellow";
        io.emit('updateAllClients', { color: "yellow" });
    });

    socket.on('green', function (data) {
        color = "green";
        io.emit('updateAllClients', { color: "green" });
    });

    socket.on('blue', function (data) {
        color = "blue";
        io.emit('updateAllClients', { color: "blue" });
    });

    socket.on('black', function (data) {
        color = "black";
        io.emit('updateAllClients', { color: "black" });
    });
});

    response.render('index');
})