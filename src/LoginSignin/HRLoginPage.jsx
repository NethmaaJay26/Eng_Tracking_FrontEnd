import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginSignin.css';

export default function HRLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://eng-tracking-back-end.vercel.app/api/user/login', { email, password });
      if (response.data.success) {
        // Store the token in localStorage or any state management
        localStorage.setItem('token', response.data.token);
        // Navigate to a different page after successful login
        navigate('/home');
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
        <h1>HR Login</h1>
        <div className="loginsignup-fields">
          <input
            type="email"
            placeholder='Your Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder='Enter Your Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="error-message">{error}</div>}

        <div className="hr-buttons">
        <button onClick={handleLogin}>Login</button>
        <button onClick={() => navigate(-1)}>Back</button>
        </div>
        
      </div>
    </div>
  );
}