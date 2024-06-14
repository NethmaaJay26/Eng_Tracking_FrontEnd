import React from 'react';
import './loginform.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

const loginform = () => {
  return (
    <div className='wrapper'>
      <form action="">
        <h1>Welcome!</h1>
        <h2>Please Login to Continue to your Account</h2>
        <div className="input-box">
          <input type='text' placeholder='Username' required />
          <FaUser className='icon'/>
        </div>

        <div className="input-box">
          <input type='password' placeholder='Password' required />
          <FaLock className='icon'/>
        </div>


        <div className="remember-forgot">
        <label><input type="checkbox" />Keep me logged in</label>
        <a href="#">Forgot Password?</a>
        </div>

        <button type='submit'>Login</button>

      
      </form>


    </div>
  )
}

export default loginform;