import React from 'react'
import { useState } from 'react'
import { API_URL } from '../../Utilities/ApiPath.js';

const Login = ({WelcomeHandler}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const LoginSubmit = async(e)=>{
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/login`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({email, password})
      });
      const data = await response.json();
      if(response.ok){
        alert("Login Success");
        setEmail("");
        setPassword("");
        localStorage.setItem("loginToken", data.token);
        localStorage.setItem("showWelcome", "true");
        //WelcomeHandler();
      }
      const vendorId = data.vendorId;
      const vendorresponse = await fetch(`${API_URL}/vendor/allVendors/${vendorId}`);
      const vendorData = await vendorresponse.json();
      if(vendorresponse.ok){
        const vendorFirmId = vendorData.vendorFirmId;
        const firmName = vendorData.firmName;
        if(firmName){
          localStorage.setItem("firmName", firmName);
        }
        if(vendorFirmId){
          localStorage.setItem("firmId", vendorFirmId);
        }
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='loginsection'>
      <form className='authForm' onSubmit={LoginSubmit}>
        <h3>Vendor Login</h3>
        <label htmlFor="Email">Email</label>
        <input type="email" id='Email' name='email' value={email} placeholder='enter your email' onChange={(e)=> setEmail(e.target.value)} />
        <label htmlFor="Password">Password</label>
        <input type="password" id='Password' name='password' value={password} placeholder='enter your password'onChange={(e)=>setPassword(e.target.value)}/>
        <div className="btnlogin">
            <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login
