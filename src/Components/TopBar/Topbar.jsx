import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Topbar.css';
import logoLTL from '../Assets/logoLTL.png';

export default function Topbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all items from localStorage
    localStorage.clear();

    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div className='topbar'>
      <div className="topbar-logo">
        <img src={logoLTL} alt="Logo" /> 
        <p>ENGINEERINGProTrack</p>
       
      </div>
      <div className="topbar-login">
        
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
}
