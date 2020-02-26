const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
//express required with http server, io middleware
//create listening server
const app = express();
const server = http.createServer(app);
const port = 4001;
server.listen(port, () => console.log(`Listening on port ${port}`));
app.get('/*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
//new connection named socket
const io = socketIo(server);
io.on("connection", socket => {
    console.log("New client connected");

    //data we send named 'data'
    socket.on("incoming data", (data)=>{
        //emit&broadcast   num to help ease logging, sub to 'outgoing data' topic
       socket.broadcast.emit("outgoing data", {num: data});
    });

    //disconnection log
    socket.on("disconnect", () => console.log("Client disconnected"));
});

let socket = require('socket.io-client')('http://127.0.0.1:4001');

let info = 0;
//data here
setInterval(function () {
    if(info<100)
    info++
    socket.emit('incoming data', info);
}, 1000);

})
