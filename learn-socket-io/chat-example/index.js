const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.broadcast.emit('Hi from Nandan');
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
    console.log('message: ' + msg);
  });
});

http.listen(port, () => {
  console.log(`Nandan's chat server running at http://localhost:${port}/`);
});