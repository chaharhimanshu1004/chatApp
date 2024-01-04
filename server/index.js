const http = require('http');
const express = require('express');
const app = express();
const port = 4500 || process.env.port; 

const cors = require('cors');
app.use(cors());
app.get('/',(req,res)=>{
    res.send('Running !!!')
})

const socketIo = require('socket.io')
const server = http.createServer(app);
const io = socketIo(server);

// whenever connection established between frontend and backend -->> then it will be showing connection
io.on("connection",()=>{
    console.log('New Connection');
})

server.listen(port,()=>{
    console.log(`Server is running on Port : ${port}` )
})