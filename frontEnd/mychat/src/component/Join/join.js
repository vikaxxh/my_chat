import React, {useState} from 'react'
import "./join.css"
import logo from "../images/live-chat-icon-7403.png"
import { Link } from 'react-router-dom';
let user;


const sendUser = () =>{
  user = document.getElementById('joinInput').value;
  document.getElementById('joinInput').value = "";
}

const Join = () => {

  const [name, setname] = useState("");
  console.log(name);

  return (
    <div className='joinPage'>
        <div className='joinContainer'>
            <img src={logo} alt="logo"/>
            <h1>My Chat</h1>
            <input onChange={(e) => setname(e.target.value)} placeholder='Enter Your Name' type='text' id='joinInput'/>

            <Link onClick={(event) => !name ? event.preventDefault() & alert("Enter Your Name Frist") : null} to="/chat"><button onClick={sendUser} className='joinBtn'>Log In</button></Link>
        </div>
    </div>
  )
}

export default Join;
export {user};