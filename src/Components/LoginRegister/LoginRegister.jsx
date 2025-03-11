import React, { useState } from "react";
import axios from "axios";
import "./LoginRegister.css";
import { FaUser, FaUserLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const LoginRegister = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert("You must agree to the terms & conditions");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/users/register", formData);
      alert(res.data.message);
      setIsRegister(false);
    } catch (err) {
      alert("Error registering user");
    }
};

const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post("http://localhost:5000/api/users/login", formData);
        alert(res.data.message);
        
        // Store user info in localStorage (optional)
        if (rememberMe) {
            localStorage.setItem("user", JSON.stringify(res.data.user));
        }
    } catch (err) {
        alert("Error logging in: " + err.response?.data?.error || err.message);
    }
};



  return (
    <div>
      <div className="app-name">Virtual Telescope</div>

      <div className={`wrapper ${isRegister ? "active" : ""}`}>
        <div className="form-container">
          {/* Login Form */}
          <div className="form-box login">
            <form onSubmit={handleLogin}>
              <h1>Sign In</h1>
              <div className="input-box">
                <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
                <MdEmail className="icon" />
              </div>
              <div className="input-box">
                <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
                <FaUserLock className="icon" />
              </div>
              <div className="remember-forgot">
                <label>
                  <input type="checkbox" onChange={(e) => setRememberMe(e.target.checked)} /> Remember me
                </label>
                <a href="#">Forgot Password?</a>
              </div>
              <button type="submit">Sign In</button>
              <div className="register-link">
                <p>
                  Don't have an account?{" "}
                  <a href="#" onClick={() => setIsRegister(true)}>
                    Sign Up
                  </a>
                </p>
              </div>
            </form>
          </div>

          {/* Registration Form */}
          <div className="form-box register">
            <form onSubmit={handleRegister}>
              <h1>Sign Up</h1>
              <div className="input-box">
                <input type="text" name="username" placeholder="Username" required onChange={handleChange} />
                <FaUser className="icon" />
              </div>
              <div className="input-box">
                <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
                <MdEmail className="icon" />
              </div>
              <div className="input-box">
                <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
                <FaUserLock className="icon" />
              </div>
              <div className="remember-forgot">
                <label>
                  <input type="checkbox" onChange={(e) => setAgreeTerms(e.target.checked)} /> I agree to the terms & conditions
                </label>
              </div>
              <button type="submit">Sign Up</button>
              <div className="register-link">
                <p>
                  Already have an account?{" "}
                  <a href="#" onClick={() => setIsRegister(false)}>
                    Sign In
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;

