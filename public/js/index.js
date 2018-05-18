var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
  socket.emit('createEmail', {
    to: 'dpaniaguam@gmail.com',
    text: 'sent from client end'
  });

  socket.emit('createMessage', {
    from: 'dpaniagua0@gmail.com',
    text: 'Hey this a new message'
  })
});

socket.on('disconnect', () => {
  console.log('Disconnected from server.')
});

socket.on('newEmail', function(email) {
  console.log("New email: ", email);
});

socket.on('newMessage', function(message) {
  console.log('New message from server', message);
})
