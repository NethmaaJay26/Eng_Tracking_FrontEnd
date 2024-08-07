import React from 'react'
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
    return (
        <div>
            <div className="footer-container">
                <div className="footer-header">
                    <h1><span>Engineering</span> Pro Track</h1>
                    <div className="feedback">
                        <input type="text" placeholder="Enter your feedback" />
                        <button>Send</button>
                    </div>
                </div>
                <div className="footer-content">
                    <Item Links={FEATURES} title="Features" />
                    <Item Links={TEARMS} title="Terms and Privacy" />
                    <Item Links={USERS} title="About User" />
                    <Item Links={US} title="Contact Us" />
                </div>
            </div>
        </div>
    );
};

export default Footer;