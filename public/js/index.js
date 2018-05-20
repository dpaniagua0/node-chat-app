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
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = $("<li></li>");
  li.text(`${message.from} ${formattedTime}: ${message.text}`);
  $("#messages").append(li);
});

socket.on('newLocationMessage', function(message) {
  var li = $("<li></li>");
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var link = $("<a target='_blink'>My current location</a>");

  li.text(`${message.from} ${formattedTime}: `);
  link.attr('href', message.url);
  $(li).append(link);
  $("#messages").append(li);

});

$(function() {
  var messageForm = $("#message-form");
  $("#message-form").on('submit', function(e) {
    e.preventDefault();
    var messageTextBox = $('[name="message"]');
    socket.emit('createMessage', {
      from: 'Guest 1',
      text: $(messageTextBox).val()
    }, function() {
      $(messageTextBox).val("");
    });
  });

  var locationBtn  = $("#send-location");
  $(locationBtn).on("click", function() {
    if(!navigator.geolocation){
      return alert('Geolocation not supported by your browser');
    }
    locationBtn.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position){
      locationBtn.removeAttr('disabled').text('Send location');
      socket.emit('createLocationMessage', {
        lat: position.coords.latitude,
        long: position.coords.longitude
      })
    }, function() {
      locationBtn.removeAttr('disabled');
      return alert('Unable to fetch location');
    })
  });
});
