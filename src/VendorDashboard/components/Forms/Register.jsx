import React from 'react'
import { useState } from 'react'
import { API_URL } from '../../Utilities/ApiPath.js';

const Register = ({LoginHandler}) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/register`,{
        method: "POST",
        headers:{'Content-Type' : 'application/json'},
        body: JSON.stringify({username, email, password})
      });
      const data = await response.json();
      if(response.ok){
        setUsername("");
        setEmail("");
        setPassword("");
        alert(data.message);
        LoginHandler();
      } 
    } catch (error) {
      console.error("Registration failed", error)
      alert("Registration failed");
    }
  }

  return (
    <div className='registersection'>
      <form className='authForm' onSubmit={handleSubmit}>
        <h3>Vendor Register</h3>
        <label htmlFor="Username">Username</label>
        <input type="text" id='Username' name='username' value={username} onChange={(e)=> setUsername(e.target.value)} placeholder='enter your username' />
        <label htmlFor="Email">Email</label>
        <input type="email" id='Email' name="email" value={email} placeholder='enter your email' onChange={(e)=>setEmail(e.target.value)}/>
        <label htmlFor="Password">Password</label>
        <input type="password" id='Password' name='password' value={password} placeholder='enter your password' onChange={(e)=> setPassword(e.target.value)}/>
        <div className="btnlogin">
            <button type='submit'>Register</button>
        </div>
      </form>
    </div>
  )
}

export default Register
