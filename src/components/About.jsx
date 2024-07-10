import React from "react";
import "./css/about.css";
import Footer from "./Footer";
import profile from "../assets/avatar.jpg";

function About() {
  return (
    <div className="container-fluid about p-5 d-flex flex-column gap-3 justify-content-center align-items-center">
      <div className="profile">
        <img src={profile} className="profileImg mb-3" alt="" />
        <h1>SAHIL NARALE</h1>
        <h5>FULL STACK DEVELOPER</h5>
      </div>
      <div className="info">
        <p>Full Stack Developer 🚀 with experience in building Web and Mobile Applications. I am skilled in JavaScript, React JS, DSA, Python, and other cool libraries and frameworks.</p>
        <p>A dedicated programmer with a keen interest in developing new software that may contribute to improving society or organization. As a Software developer, I aim to build solutions that can make human life easier in any way possible.</p>
        <p>Check the links provided in footer, to contact with me.</p>  
      </div>
      <Footer />
    </div>
  );
}

export default About;
