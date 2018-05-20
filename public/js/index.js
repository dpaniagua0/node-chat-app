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
  var template = $("#message-template").html();
  var formattedTime = moment(message.createdAt).format('h:mm a');

  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  $("#messages").append(html);
});

socket.on('newLocationMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $("#location-message-template").html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });
  $("#messages").append(html);
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
