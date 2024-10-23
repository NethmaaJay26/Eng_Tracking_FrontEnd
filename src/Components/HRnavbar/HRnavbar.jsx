import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HRnavbar.css';
import logo from '../Assets/icon.png';

export default function HRnavBar() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const navItems = [
    { name: 'Dashboard', path: '/home' },
    { name: 'Training Engineers', path: '/engineers' },
    { name: 'Supervising Engineers', path: '/supervisingengineers' },
    { name: 'Trainings', path: '/trainings' },
    
  ];

  return (
    <div className='sidebar'>
      <div className="sidebar-profile">
        <img src={logo} alt="icon" />
        <p>HR Admin</p>
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
    </div>
  );
}
