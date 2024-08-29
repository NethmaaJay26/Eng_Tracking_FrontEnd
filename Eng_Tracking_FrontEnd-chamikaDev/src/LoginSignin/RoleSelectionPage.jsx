import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignin.css';

export default function RoleSelectionPage() {
  const navigate = useNavigate();

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Select Your Role</h1>
        <div className="loginsignup-fields">
          <button onClick={() => navigate('/login/hr')}>HR</button>
          <button onClick={() => navigate('/login/engineers')}>Engineers</button>
          <button onClick={() => navigate('/login/supervising-engineers')}>Supervising Engineers</button>
          <button onClick={() => navigate('/')}>Back</button>
        </div>
      </div>
    </div>
  );
}
