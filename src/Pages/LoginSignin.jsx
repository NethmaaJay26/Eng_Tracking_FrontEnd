import React from 'react'
import "./CSS/LoginSignin.css"

export default function LoginSignin() {
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder='Your Name' />
          <input type="email" placeholder='Your Email Address' />
          <input type="password" placeholder='Enter Your Password' />
        </div>
        <button>Continue</button>
        <p className='loginsignup-login'>
          Already have an account <span>Login here</span> 
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox" name='id' />
          <p>By continuing, I agree to the terms of use and privacy policy. </p>
        </div>
      </div>
      
    </div>
  )
}
