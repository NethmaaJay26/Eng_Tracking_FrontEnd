import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Engnavbar.css';
import logo from '../Assets/icon.png';
import im30 from '../Assets/Image 30.png'; 
import im31 from '../Assets/Image 31.png';  
import im33 from '../Assets/Image 33.png'; 

export default function EngnavBar() {
  const [selectedItem, setSelectedItem] = useState(null);
  const supervisorName = localStorage.getItem('name') || 'Guest';
  const supervisorImageURL = localStorage.getItem('image') || 'Guest';

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const navItems = [
    { name: 'Dashboard', path: '/Enghome',icon:im30 },
    { name: 'My Profile', path: '/Engprofile' ,icon:im31},
    { name: 'My Trainings', path: '/Engtrainings',icon:im33 },
  ];

  return (
    <div className='esidebar'>
      <div className="esidebar-profile">
      <img 
          src={supervisorImageURL ? `http://localhost:4000/uploads/${supervisorImageURL}` : logo} 
          alt="icon" 
          onError={(e) => e.target.src = logo} 
        />
        <p>{supervisorName}</p>
        <hr />
      </div>
      <ul className="esidebar-menu">
        {navItems.map((item, index) => (
          <li
            key={index}
            onClick={() => handleItemClick(item.name)}
            style={{ backgroundColor: selectedItem === item.name ? '#F2A922' : 'transparent' }}
          >
            <Link to={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src={item.icon} alt={`${item.name} icon`} className='snav-icon' />
            <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
