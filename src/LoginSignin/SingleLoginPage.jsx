import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginSignin.css';

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
        localStorage.setItem('role', role);  // Ensure role is also stored
  
        // Redirect based on the role
        if (role === 'hr') {
          navigate('/home');
        } else if (role === 'engineer') {
          navigate('/Enghome');
        } else if (role === 'supervising-engineer') {
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
        <h1>Login</h1>
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
          <button onClick={() => navigate('/')}>Back</button>
        </div>
      </div>
    </div>
  );
}
