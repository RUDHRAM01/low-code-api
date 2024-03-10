import React from "react";
import { useNavigate } from "react-router-dom";
import MongoDb from '../assets/mongodb.svg'
import Api from '../assets/api.svg'
import Code from '../assets/code.svg'
function Login() {
  const navigate = useNavigate();
  return (
    <>
      <div className="login">
        <div className="login-icon-container top-left">
            <img src={MongoDb} alt="MongoDb" className="login-icons" />
        </div>
        <div className="login-icon-container top-left-2">
            <img src={Api} alt="Api" className="login-icons" />
        </div>
        <div className="login-icon-container top-left-3">
            <img src={Code} alt="Code" className="login-icons" />
        </div>
        <div className="login-container">
          <div className="login-logo">
            <img
              src="https://th.bing.com/th/id/R.2c7a5258f3b656da08a7b7a021c300f0?rik=dFK6yoQbTVOvDw&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fanimation-png-animation-png-hd-png-image-1008.png&ehk=0m4RVHcY0EzfQU9eezWhk5fJp1Y7EfsJ9mKjRFoZQYk%3d&risl=&pid=ImgRaw&r=0"
              alt="logo"
            />
          </div>
          <form>
            <h3>Login Here</h3>

            <label for="username">Username</label>
            <input type="text" placeholder="Email or Phone" id="username" />

            <label for="password">Password</label>
            <input type="password" placeholder="Password" id="password" />

            <button>Log In</button>
            <p  onClick={() => {
                  navigate("/signup");
                }} className="question">
              Don't have an account?{" "}
              <span
               
              >
                Sign Up
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
