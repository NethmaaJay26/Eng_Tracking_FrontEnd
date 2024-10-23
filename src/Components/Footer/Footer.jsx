import React, { useState } from 'react'
import { FEATURES, TEARMS, US, USERS } from "../Assets/info"
import './Footer.css';

// Define the Item component
const Item = ({ Links, title }) => (
    <div className="footer-section">
        <h1>{title}</h1>
        <ul>
            {Links.map((link) => (
                <li key={link.name}>
                    <a href={link.link}>{link.name}</a>
                </li>
            ))}
        </ul>
    </div>
);

const Footer = () => {
    const [feedback, setFeedback] = useState('');

    const handleFeedbackSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('access_key', '28f8cf42-05b9-4407-aa9a-3ff3faae55c0');
        formData.append('message', feedback);
        formData.append('source', 'Engineering ProTrack'); 

        const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        }).then((res) => res.json());

        if (res.success) {
            alert(res.message);
            setFeedback('');
        } else {
            alert('There was an issue submitting your feedback. Please try again.');
        }
    };

    return (

        <div className='footer'>
            <div className="footer-container">
                <div className="footer-header">
                    <h1><span>Engineering</span> ProTrack</h1>
                    <div className="feedback">
                        <input
                            type="text"
                            placeholder="Enter your feedback"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        />
                        <button onClick={handleFeedbackSubmit}>Send</button>
                    </div>
                </div>
                <div className="footer-content">
                    <Item Links={FEATURES} title="Features" />
                    <Item Links={TEARMS} title="Terms and Privacy" />
                    <Item Links={USERS} title="About User" />
                    <Item Links={US} title="Contact Us" />
                </div>
                <hr />
                <div className="footer-copyright">
                    <p>&copy; 2024 Lakdhanavi Limited | Design and Developed by <a href="/">knoc Developers</a></p>
                </div>

            </div>

        </div>
    );
};

export default Footer;