var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server.')
});

socket.on('newEmail', function(email) {
  console.log("New email: ", email);
});

socket.on('newMessage', function(message) {
  console.log('New message from server', message);
  var li = $("<li></li>");
  li.text(`${message.from}: ${message.text}`);
  $("#messages").append(li);
});

$(function() {
  var messageForm = $("#message-form");
  $("#message-form").on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage', {
      from: 'Guest 1',
      text: $('[name="message"]').val()
    }, function() {

    });
  });
});
