import React, { useEffect, useState } from 'react'
import {user} from '../Join/Join'
import socketIo from 'socket.io-client'
import './chat.css'
import sendLogo from '../../images/send.png'
import Message from '../Message/Message'
import ReactScrollToBottom from "react-scroll-to-bottom"
import closeIcon from '../../images/closeIcon.png'


const ENDPOINT = 'http://localhost:4500/';


function Chat() {
    const [id,setId] = useState('');
    const [messages,setMessages] = useState([]);
    const socket = socketIo(ENDPOINT,{transports:['websocket']});

    const send=()=>{
        const message = document.getElementById('chatInput').value;
        socket.emit('message',{message,id});
        document.getElementById('chatInput').value="";
    }
    
    useEffect(()=>{

        socket.on('connect',()=>{
            alert('connected');
            setId(socket.id);
        })
        socket.emit('joined',{user});
        socket.on('welcome',(data)=>{
            setMessages([...messages,data]);
            console.log(data.user,data.message);
        })
        socket.on('userJoined',(data)=>{
            setMessages([...messages,data]);
            console.log(data.user,data.message);
        })
        socket.on('leave',(data)=>{
            setMessages([...messages,data]);
            console.log(data.user,data.message)
        })
        return()=>{
            socket.emit('offline');
            socket.off();
        }
    },[]);

    useEffect(()=>{

        socket.on('sendMessage',(data)=>{
            setMessages([...messages,data]);
            console.log(data.user,data.message,data.id);
        });
        return()=>{
            socket.off(); // varna hr message pr message array bar bar render hogi..
        }
    },[messages])
    

  return (
    <div className="chatPage">
        <div className="chatContainer">
            <div className="header">
                <h2>Chat App!</h2>
                <a href="/"><img src={closeIcon} alt="close button" /></a>
            </div>
            <ReactScrollToBottom className="chatBox">
                {
                    messages.map((item,i)=><Message user={item.id===id?'':item.user} message={item.message} classs={item.id===id?'right':'left'}/>)
                }
            </ReactScrollToBottom>
            <div className="inputBox">
                <input onKeyPress={(event)=>event.key==='Enter'? send():null} type="text" id='chatInput' />
                <button onClick={send} className='sendBtn' ><img src={sendLogo} alt="" /></button>
            </div>

        </div>
    </div>
  )
}

export default Chat