import React, { useEffect, useState } from 'react'
import {user} from '../Join/join.js'
import "./chat.css"
import closeIcon from '../images/closeIcon.png'
import sendLogo from "../images/send2.png"
import socketIo from 'socket.io-client'
import Message from '../message/message.js'
import ReactScrollToBottom from 'react-scroll-to-bottom';
let socket;

const ENDPOINT = 'http://localhost:3500'

const Chat = () => {
 
  const [id, setid] = useState('');
  const [messages, setmessage] = useState([]);

  const send = ()=>{
  const message =  document.getElementById('chatInput').value;
     socket.emit(`message`, {message, id});
     document.getElementById('chatInput').value = "";
  } 
  useEffect( () => {
     socket = socketIo(ENDPOINT, {transports: ['websocket']});
     socket.on('connect', ()=>{
       setid(socket.id);
     })

    socket.emit('joined', {user});

    socket.on('welcome', (data)=>{
         setmessage([...messages, data]);
         console.log(data.user, data.message);
    })

    socket.on('userJoined',(data)=>{
      setmessage([...messages, data]);
      console.log(data.user, data.message);

    })

    socket.on('leave', (data)=>{
      setmessage([...messages, data]);
      console.log(data.user, data.message);
    })

   
    return () =>{
      socket.on('disconnect');
      socket.off();
    }
},[])

useEffect(() => {
  socket.on('sendMessage', (data)=>{
    setmessage([...messages, data]);
    console.log(data.user, data.message, data.id);
  })

  return () => {
    socket.off();
  }
}, [messages])

  return (
    <div className='chatPage'>
        <div className='chatContainer'>
        <div className='header'>
          <h2>My Chat</h2>
         <a href='/'><img src= {closeIcon} alt="close"/></a> 
        </div>
        <ReactScrollToBottom className='chatBox'>
          {messages.map((item,i)=> <Message message={item.message} user={item.id === id ? '': item.user} classs={item.id == id ?'right': 'left'} />)}
        </ReactScrollToBottom>
        <div className='inputBox'>
            <input onKeyPress={(event)=> event.key ==="Enter" ? send() : null} type='text' id='chatInput' />
            <button onClick={send} className='sendBtn'><img src={sendLogo} alt="send" /></button>
        </div>
        </div>
    </div>
  )
}

export default Chat