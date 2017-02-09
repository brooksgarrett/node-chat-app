const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

console.log(`Public path: ${publicPath}`);

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('createMessage', (message) => {
        console.log(`From: ${message.from}, Text: ${message.text}`);
        message.createdAt = Date.now() / 1000 | 0;
        socket.emit('newMessage', message);
    });
});

server.listen(port, () => {
    console.log(`Server running Port: ${port} Public: ${publicPath}`)
});
