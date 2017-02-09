var socket = io();
socket.on('connect', function () {
    console.log('Connected to server');

    socket.emit('createMessage', {
        from: 'Brooks',
        text: 'Bring water'
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log(`From: ${message.from}`);
    console.log(`@ ${Date(message.createdAt)}`);
    console.log(`> ${message.text}`);
});