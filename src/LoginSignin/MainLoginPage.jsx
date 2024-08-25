import './LoginSignin.css';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';


export default function MainLoginPage() {
  const navigate = useNavigate();

  return (
    <div className='main-login'>
      <div className="main-login-container">
        <div className="main-login-left">
          <Player
            autoplay
            loop
            src="https://lottie.host/cde5fb72-e9e2-4f5a-8f5a-115124eb9348/0KYIftDHu2.json"
            style={{ height: '300px', width: '300px' }}
          />
        </div>
        <div className="main-login-right">
          <h1><span>Engineering</span> Pro Track</h1>
          <p>Please login to your account or continue as a guest.</p>
          <div className="main-login-buttons">
            <button onClick={() => navigate('/role-selection')}>Login</button>
            <button onClick={() => navigate('/guest')}>View as Guest</button>
          </div>
        </div>
      </div>
    </div>
  );
}
