import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Topbar.css';
import bell_icon from '../Assets/bell_icon.png';
import logoLTL from '../Assets/logoLTL.png'

export default function Topbar() {
  const navigate = useNavigate();

  return (
    <div className='topbar'>
      <div className="topbar-logo">
      <p>ENGINEERINGProTrack</p>
        <img src={logoLTL} alt="Kavindu" /> 
      </div>
      <div className="topbar-login">
        <img className='topbar-login-bell' src={bell_icon} alt="bell icon" />
        <div className="topbar-bell-count">0</div>
        <button onClick={() => navigate('/login')}>Log Out</button>
      </div>
    </div>
  );
}