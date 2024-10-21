import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginSignin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

export default function UnifiedLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/unified/login', { email, password });

      if (response.data.success) {
        const { token, role, user } = response.data;

        // Store common data in local storage
        localStorage.setItem('token', token);
        localStorage.setItem('email', user.email);
        localStorage.setItem('name', user.name || '');
        localStorage.setItem('role', role);  // Store the role

        // If user is an engineer, store the training ID in local storage
        if (role === 'engineer') {
          if (user.training) {
            localStorage.setItem('trainingId', user.training); // Store training ID
            console.log('Training ID saved in local storage:', user.training);  // Print to console
          } else {
            console.log('No training assigned to this engineer.');
          }

          // Redirect to the engineer home page
          navigate('/Enghome');
        } else if (role === 'hr') {
          navigate('/home');
        } else if (role === 'supervising-engineer') {
          localStorage.setItem('supervisorId', user._id);  // Assuming user._id is the supervisor's ID
          console.log('Supervisor ID saved in local storage:', user._id);
          navigate('/login/supervising-engineers/home');
        }
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('An error occurred during login.');
    }
  };



  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Welcome Back!</h1>
        <div className="loginsignup-fields">
          <div className='input-wrapper'>
            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
            <input
              type="email"
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <input
              type="password"
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="login-button">
          <button onClick={handleLogin}>Log In</button>

        </div>
      </div>
    </div>
  );
}
