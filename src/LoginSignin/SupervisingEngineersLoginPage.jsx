import React, { useState } from 'react';
import './LoginSignin.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SupervisingEngineersLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/sengineers/login', { email, password });
      console.log('Login Response:', response.data);

      if (response.data.success) {
        const { token, name, _id } = response.data;
        localStorage.setItem('supervisorId', _id);
        //localStorage.setItem('email', email);
      //  localStorage.setItem('password', password);
        localStorage.setItem('token', token);
        localStorage.setItem('name', name || '');
        //localStorage.setItem('address', address || '');
        navigate('/login/supervising-engineers/home'); 
        //navigate('/login/supervising-engineers/assigned_engineers');
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
        <h1>Supervisor Engineer Login</h1>
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
