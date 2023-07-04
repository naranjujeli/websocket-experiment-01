const path = require('path');

const io = require('socket.io')();
const express = require('express');
const app = express();
const server = require('http').Server(app);

app.use(express.static(path.join(__dirname, 'build/')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

const port = 8000;

server.listen(port, () => {
    console.log(`Listening at port ${port}`);
})