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

socket.on('newLocationMessage', function(message) {
  var li = $("<li></li>");
  var link = $("<a target='_blink'>My current location</a>");

  li.text(`${message.from}: `);
  link.attr('href', message.url);
  $(li).append(link);
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

  var locationBtn  = $("#send-location");
  $(locationBtn).on("click", function() {
    if(!navigator.geolocation){
      return alert('Geolocation not supported by your browser');
    }
    navigator.geolocation.getCurrentPosition(function(position){
      socket.emit('createLocationMessage', {
        lat: position.coords.latitude,
        long: position.coords.longitude
      })
    }, function() {
      return alert('Unable to fetch location');
    })
  });
});
