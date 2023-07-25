const http = require("http");
const express = require("express");
const socketIo = require("socket.io");
const cors = require("cors");
const { Socket } = require("dgram");
const app = express();
const port = 3500 || process.env.PORT;

const users = [{}];

app.use(cors());

app.get("/", (req, res)=>{
   res.send("Hell its woring")
})
 
const server = http.createServer(app);

const io=socketIo(server);

io.on("connection", (socket)=>{
    console.log("New connection");
   
    socket.on('joined', ({user})=>{
        users[socket.id] = user;
       console.log(`${users[socket.id]} has joined`);
       socket.broadcast.emit('userJoined', {user:'Admin', message:`${users[socket.id]} has joined`})
       socket.emit('welcome', {user: "Admin", message:`Welcome to the chat ${users[socket.id]}`});
    })
    
    socket.on('disconnect',()=>{
         socket.broadcast.emit('leave',{user:"Admin", message:`${users[socket.id]} has left`})
        console.log("user left");
    })

    socket.on('message', ({message, id})=>{
        io.emit('sendMessage', {user:users[id] ,message, id})
    })
})


server.listen(port, ()=>{
    console.log(`server is runing on http://localhost:${port}`)

})