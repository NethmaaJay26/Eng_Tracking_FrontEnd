import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignin.css';

export default function EngineersLoginPage() {
    const navigate = useNavigate();
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Engineers Login</h1>
        <div className="loginsignup-fields">
          <input type="email" placeholder='Your Email Address' />
          <input type="password" placeholder='Enter Your Password' />
        </div>

        <div className="hr-buttons">
        <button>Login</button>
        <button onClick={() => navigate(-1)}>Back</button>

        </div>
        
      </div>
    </div>
  );
}
