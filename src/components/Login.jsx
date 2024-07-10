import React, { useState } from "react";
import './css/login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [credentials, setCredentials] = useState({email: "", password: ""});
  let navigate = useNavigate();

  const handleSubmit = async(e) =>{
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password})
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      toast.success("Login Successfully.");
      localStorage.setItem('token', json.authToken);
      navigate("/");
    }else{
      toast.error("Invalid Credentials!")
    }
  }

  const handleChange = (e) =>{
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }

  return (
    <div className="m-0 p-3">
      <ToastContainer />
      <div className="login-box">
        <p>Login</p>
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input required="" name="email" id="email" value={credentials.email} onChange={handleChange} type="text" />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input required="" name="password" id="password" value={credentials.password} onChange={handleChange} type="password" />
            <label>Password</label>
          </div>
          <button type="submit" className="btn btn-outline-light">Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <a href="/register" className="a2">
            Sign up!
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
