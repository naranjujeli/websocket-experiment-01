const REACT_PORT = 3000;

const path = require('path');

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

const cors = require('cors');
app.use(cors);

// Configure listener
const io = new Server(server, {
  cors: {
    origin: `*`,
    methods: ["GET", "POST"]
  }
});

// Initialize empty register of mouses 
let mouses = {};
io.on("connection", (socket) => {
  // Handle user mouse movement
  socket.on('my-mouse-moved', (clientData) => {
    const newPosition = clientData.position;
    if (mouses[socket.id]) { // In case the mouse already has a register
      mouses[socket.id] = { currpos: newPosition, oldpos: mouses[socket.id].currpos, bgcolor: mouses[socket.id].bgcolor};
    } else { // In case this is the first time the user logs in
      // Generate a random color for the new user
      const [red, green, blue] = [Math.floor(Math.random()*256), Math.floor(Math.random()*256), Math.floor(Math.random()*256)];
      const bgColor = `rgb(${red}, ${green}, ${blue})`;
      mouses[socket.id] = { currpos: newPosition, oldpos: newPosition, bgcolor: bgColor};
    }
    // Send updated data
    io.emit('some-mouse-moved', { mouses });
  });
});

server.listen(REACT_PORT+1, () => {
  console.log(`Listening at port ${REACT_PORT+1}`);
});