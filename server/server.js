const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const {generateMessage} = require('./utils/message');
const port = process.env.PORT || 3000;

console.log(`Public path: ${publicPath}`);

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user has joined'));

    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

});

server.listen(port, () => {
    console.log(`Server running Port: ${port} Public: ${publicPath}`)
});
