import React, { useState } from "react";
import "./LoginRegister.css";
import { FaUser, FaUserLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const LoginRegister = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div>
      {/* Web App Name (Top-Left Corner) */}
      <div className="app-name">Virtual Telescope</div>

      <div className={`wrapper ${isRegister ? "active" : ""}`}>
        <div className="form-container">
          {/* Login Form */}
          <div className="form-box login">
            <form>
              <h1>Sign In</h1>
              <div className="input-box">
                <input type="text" placeholder="Username" required />
                <FaUser className="icon" />
              </div>
              <div className="input-box">
                <input type="password" placeholder="Password" required />
                <FaUserLock className="icon" />
              </div>
              <div className="remember-forgot">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <a href="#">Forgot Password</a>
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
            <form>
              <h1>Sign Up</h1>
              <div className="input-box">
                <input type="text" placeholder="Username" required />
                <FaUser className="icon" />
              </div>
              <div className="input-box">
                <input type="email" placeholder="Email" required />
                <MdEmail className="icon" />
              </div>
              <div className="input-box">
                <input type="password" placeholder="Password" required />
                <FaUserLock className="icon" />
              </div>
              <div className="remember-forgot">
                <label>
                  <input type="checkbox" /> I agree to the terms & conditions
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
