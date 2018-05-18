const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected');

	socket.emit('newEmail', {
		from: 'dpaniagua0@gmail.com',
		text: 'test text',
		createdAt: 123
	});

	socket.emit('newMessage', {
		from: 'johndoe@email.com',
		text: 'Hey test message',
		createdAt: 1234
	})

	socket.on('createEmail', (email) => {
		console.log('createEmail', email);
	});

	socket.on('createMessage', (message) => {
		console.log('createMessage', message);
	})

	socket.on('disconnect', (socket) => {
		console.log('Client disconnected');
	});
});



server.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
