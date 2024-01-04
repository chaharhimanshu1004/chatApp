const http = require('http');
const express = require('express');
const app = express();
const socketIo = require('socket.io')
const port = 4500 || process.env.port; 

const cors = require('cors');
app.use(cors());
app.get('/',(req,res)=>{
    res.send('Running !!!')
})

const users = [{}];

const server = http.createServer(app);
const io = socketIo(server);

// whenever connection established between frontend and backend -->> then it will be showing connection
io.on("connection",(socket)=>{
    console.log('New Connection');
    socket.on('joined',({user})=>{
        console.log(`${user} has joined.`)
        users[socket.id] = user;
        socket.broadcast.emit('userJoined',{user:"Admin",message:`${users[socket.id]} has joined the chat!`})
        socket.emit('welcome',{user:"Admin",message:`Welcome to the chat! ${users[socket.id]}`});
    })
    socket.on('disconnect',()=>{
        socket.broadcast.emit('leave',{user:'Admit',message:`${users[socket.id]} has left the chat!!`})
        console.log('User has left the chat !!')
    })
    
    // broadcast means jisne join kiya usey chodke baaki sbpe msg phuchega...
   
})

server.listen(port,()=>{
    console.log(`Server is running on Port : ${port}` )
})