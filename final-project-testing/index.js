const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('node:path');
const { Server } = require('socket.io');
const io = new Server(server);
// const uuid = require('uuid');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

io.on('connection', socket => {
  socket.on('chat message', message => {
    io.emit('chat message', message);
  });
  // revieved from client
  socket.on('marking', dataSet => {
    // from server sending to client
    io.emit('marking', dataSet);
  });

  socket.on('join room', roomName => {
    socket.join(roomName);
    console.log(roomName);
    io.emit('join room', roomName);
  });

});

server.listen(3000, () => {
  console.log('listening on port 3000');
});
