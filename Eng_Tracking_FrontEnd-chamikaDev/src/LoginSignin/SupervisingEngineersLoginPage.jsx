import React from 'react';
import './LoginSignin.css';
import { useNavigate } from 'react-router-dom';


export default function SupervisingEngineersLoginPage() {
    const navigate = useNavigate();
    return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Supervising Engineers Login</h1>
        <div className="loginsignup-fields">
          <input type="email" placeholder='Your Email Address' />
          <input type="password" placeholder='Enter Your Password' />
        </div>
        <div className="hr-buttons">
        <button onClick={() => navigate('/login/supervising-engineers/home')}>Login</button>
        <button onClick={() => navigate(-1)}>Back</button>
        </div  >
        
      </div>
    </div>
  );
}
