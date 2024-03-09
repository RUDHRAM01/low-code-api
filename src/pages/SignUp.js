import React from "react";
import { useNavigate } from "react-router-dom";


function SignUp() {
const navigate = useNavigate();
  return (
    <div className="loginContainer">
      <div className="form-login">
        <h1>Sign Up</h1>
        <form>
          <div className="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" />
          </div>
          <div className="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div className="actionBtn">
            <button type="submit">Sign Up</button>
          </div>
          <div className="question">
            <p>
              already have an account? <button onClick={() => navigate('/login')}>Login</button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
