var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  }
}

var generateLocationMessage = (from, coords) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${coords.lat},${coords.long}`,
    createdAt: new Date().getTime()
  }
}

module.exports = {generateMessage,generateLocationMessage};
