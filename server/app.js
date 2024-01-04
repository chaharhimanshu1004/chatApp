const http = require('http');
const express = require('express');
const app = express();
const socketIo = require('socket.io')
const PORT = process.env.PORT ||  4500 

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
    socket.on('offline',()=>{
        socket.broadcast.emit('leave',{user:'Admit',message:`${users[socket.id]} has left the chat!!`})
        console.log(`${users[socket.id]} has left the chat!!`)
    })



    //  -------------   sending and recieving message thing here   ----------

    socket.on('message',({message,id})=>{
        // broadcast -- everyone except jisne bheja
        // socket.emit -- jis user ne bheja sirf user
        // io.emit -- sbko hi bhejdo -- user plus everyone
        io.emit('sendMessage',{user:users[id],message,id});
    })
    

   
})

server.listen(PORT,()=>{
    console.log(`Server is running on Port : ${PORT}` )
})