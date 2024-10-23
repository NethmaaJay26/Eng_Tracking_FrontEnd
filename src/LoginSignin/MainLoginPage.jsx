import './LoginSignin.css';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';

export default function MainLoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = (event) => {
      // When the user presses the back button, redirect to http://localhost:3000/
      window.location.replace('http://localhost:3000/');
    };

    // Add an event listener for the popstate event (browser back/forward navigation)
    window.addEventListener('popstate', handlePopState);

    return () => {
      // Cleanup the event listener on component unmount
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

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
          <h2><span>KnoC</span> Developers</h2> 
          <p>Engineering Training Evaluation and Performance Tracking System.</p>
          <div className="main-login-buttons">
            <button onClick={() => navigate('/login')}><h1><span>Engineering</span> ProTrack</h1></button>
          </div>
        </div>
      </div>
    </div>
  );
}
