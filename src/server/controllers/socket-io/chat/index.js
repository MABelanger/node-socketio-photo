// Whenever someone connects this gets executed
io.on('connection', function(socket) {
  console.log('A user connected');

  socket.on('clientEvent', function(jsonData) {
    let dataClient = JSON.parse(jsonData);
    handleEmit.emitToClient(dataClient, socket);
  }); // end clientEvent()

  socket.on('disconnect', function() {
    console.log('A user disconnected');
  });
});
