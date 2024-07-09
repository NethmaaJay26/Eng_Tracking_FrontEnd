import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/icon.png';
import bell_icon from '../Assets/bell_icon.png';


export default function Sidebar() {
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Training Engineers', path: '/engineers' },
    { name: 'Supervising Engineers', path: '/supervisingengineers' },
    { name: 'Trainings', path: '/trainings' },
    { name: 'Evaluations', path: '/evaluations' },
    { name: 'Reports', path: '/summary' },
  ];

  return (
    <div className='sidebar'>
      <div className="sidebar-icon">
        <img src={logo} alt="icon" />
        <p>Admin</p>
        <hr />
      </div>
      
      <ul className="sidebar-menu">
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
      <div className="sidebar-login-cart">
        <img className='nav-login-cart-bell' src={bell_icon} alt="bell icon" />
        <div className="sidebar-cart-count">0</div>
        <button onClick={() => navigate('/loginsignin')}>Login</button>
      </div>
    </div>
  );
}
