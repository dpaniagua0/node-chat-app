const expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var from = 'Daniel';
    var text = 'Testing messages';
    var message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toHaveProperty('from');
    expect(message).toHaveProperty('text');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Daniel';
    var lat = 15;
    var long = 19;
    var url  = 'https://www.google.com/maps?q=15,19';
    var location = generateLocationMessage(from, {lat, long});

    expect(typeof location.createdAt).toBe('number');
    expect(location).toHaveProperty('from');
    expect(location).toHaveProperty('url',url);
  });
});
