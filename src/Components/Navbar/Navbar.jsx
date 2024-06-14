import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/logo.png';
import bell_icon from '../Assets/bell_icon.png';
import search_icon from '../Assets/search_icon.png';


export default function Navbar() {
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Engineers', path: '/engineers' },
    { name: 'Supervising Engineers', path: '/supervisingengineers' },
    { name: 'Trainings', path: '/trainings' },
    { name: 'Evaluations', path: '/evaluations' },
    { name: 'Summary', path: '/summary' },
  ];

  return (
    <div className='navbar'>
      <div className='navbar-upper-layer'>
        <div className="nav-logo">
          <img src={logo} alt="logo" />
          <p>EngineeringProTrack</p>
          <div className="navbar-searchbox">
            <input type="text" placeholder='  search' />
            <img src={search_icon} alt="search icon" />
          </div>
        </div>
        <div className="nav-login-cart">
          <img className='nav-login-cart-bell' src={bell_icon} alt="bell icon" />
          <div className="nav-cart-count">0</div>
          <button onClick={() => navigate('/loginsignin')}>Login</button> {/* Navigate to login page */}
        </div>
      </div>
      <div className='nav-menu-container'>
        <ul className="nav-menu">
          {navItems.map((item, index) => (
            <li
              key={index}
              onClick={() => handleItemClick(item.name)}
              style={{ backgroundColor: selectedItem === item.name ? '#F2A922' : 'transparent' }}
            >
              <Link to={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
   </div>
  );
}