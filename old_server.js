const path = require("path");
const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
let socketId;

io.on('connection', (socket) => {
    socketId = socket.id;
    console.log('client connected', socket.id);
});

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, "build")))

app.post('/api/send-data', (req, res) => {
    // send user data to chinese API endpoint
    res.send({msg: 'request sent'});
});

app.post('/api/receive-data', (req, res) => {
    if (socketId) {
        io.to(socketId).emit('newData', req.body);
    }
    res.send({data: 'hey works!!!!!'});
});

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
})

server.listen(PORT, () => console.log(`app is listening on port ${PORT}`));