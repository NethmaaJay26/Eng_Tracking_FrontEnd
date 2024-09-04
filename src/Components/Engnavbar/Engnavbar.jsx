import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Engnavbar.css';
import logo from '../Assets/icon.png';

export default function EngnavBar() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const navItems = [
    { name: 'Dashboard', path: '/Enghome' },
    { name: 'My Profile', path: '/Engprofile' },
    { name: 'My Trainings', path: '/Engtrainings' },
    { name: 'Grades', path: '/Enggrades' },
  ];

  return (
    <div className='sidebar'>
      <div className="sidebar-profile">
        <img src={logo} alt="icon" />
        <p>Engineer</p>
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
