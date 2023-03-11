import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [cred, setcred] = useState({name:"",email:"",password:"",cpassword:""})
    let history=useNavigate();
    
    const handleSubmit= async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name:cred.name,email:cred.email,password:cred.password}),
        });
        const json=await response.json();
        console.log(json);
        if(json.success){
          //redirect and save
          localStorage.setItem('token',json.authtoken);
          history('/');
          props.showalert("Account created successfully","success")
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
      <div>
        <h2>Create an account to continue</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" onChange={onChange} id="name" name="name" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" onChange={onChange} id="email" name="email" aria-describedby="emailHelp"/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={onChange} id="password" name="password"/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">confirm Password</label>
    <input type="password" className="form-control" onChange={onChange} id="cpassword" name="cpassword"/>
  </div>
  
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div> 
    </div>
  )
}

export default Signup