import React, { useState } from "react";
import './css/login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function Register() {
  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""});
  let navigate = useNavigate();

  const handleSubmit = async(e) =>{
    e.preventDefault();
    const {name, email, password} = credentials;
    const response = await fetch(`http://localhost:5000/api/auth/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, password})
    });

    const json = await response.json();
    if(credentials.password !== credentials.cpassword){
      return toast.error("Password and Confirm password must be same");
    }else if(json.success2){
      localStorage.setItem('token', json.authToken);
      navigate("/login");
      toast.success("Registered Successfully.");
    }else{
      toast.error("Something went wrong or Email already exists!")
    }
    console.log(json);
  }

  const handleChange = (e) =>{
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }
  return (
    <div className="m-0 p-3">
      <ToastContainer />
      <div className="login-box">
        <p>Register</p>
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input required="" name="name" id="name" type="text" value={credentials.name} onChange={handleChange} />
            <label htmlFor="name">name</label>
          </div>
          <div className="user-box">
            <input required="" name="email" id="email" type="email" value={credentials.email} onChange={handleChange} />
            <label htmlFor="email">Email</label>
          </div>
          <div className="user-box">
            <input required="" name="password" id="password" type="password" value={credentials.password} minLength={5} onChange={handleChange} />
            <label htmlFor="password">Password</label>
          </div>
          <div className="user-box">
            <input required="" name="cpassword" id="cpassword" type="password" value={credentials.cpassword} minLength={5} onChange={handleChange} />
            <label htmlFor="cpassword">Confirm password</label>
          </div>
          <button type="submit" className="btn btn-outline-light">Register</button>
        </form>
        <p>
          Already have an account?{" "}
          <a href="/login" className="a2">
            Sign in!
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;