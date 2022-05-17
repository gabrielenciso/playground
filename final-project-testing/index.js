const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('node:path');
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

io.on('connection', socket => {
  socket.on('chat message', message => {
    console.log('3');
    io.emit('chat message', message);
  });
  socket.on('marking', dataSet => {
    console.log('sent to server');
    io.emit('marking', dataSet);
  });
});

server.listen(3000, () => {
  console.log('listening on port 3000');
});
