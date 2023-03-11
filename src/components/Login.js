import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [cred, setcred] = useState({email:"",password:""})
    let history=useNavigate();
    
    const handleSubmit= async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email:cred.email,password:cred.password}),
        });
        const json=await response.json();
        console.log(json);
        if(json.success){
          //redirect and save
          localStorage.setItem('token',json.authtoken);
          props.showalert("Logged in successfully","success")
          history('/');
        }
        else{
          props.showalert("Invalid Credential","danger")
        }
          
    }
    const onChange=(e)=>{
        setcred({...cred,[e.target.name]:e.target.value})
    }
  return (
    <div>
      <h2>Login to continue</h2>
        <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" value={cred.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" value={cred.password} onChange={onChange} id="password" name="password"/>
  </div>
  
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Login