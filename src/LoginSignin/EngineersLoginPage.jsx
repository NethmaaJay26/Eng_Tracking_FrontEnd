import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginSignin.css';

export default function EngineersLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:4000/login/engineers', {
                email,
                password
            });
            // Assuming the response includes the user data and a success message
            console.log('Login successful:', response.data);
            // Redirect or perform actions upon successful login
            navigate('/dashboard'); // Change to the route you want to navigate to after login
        } catch (error) {
            console.error('Login error:', error.response.data.message);
            // Handle login error (e.g., display error message to the user)
        }
    };

    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>Engineers Login</h1>
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
                <button onClick={handleLogin}>Login</button>
                <button onClick={() => navigate(-1)}>Back</button>
            </div>
        </div>
    );
}
