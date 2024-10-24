import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HRnavbar.css';
import im30 from '../Assets/Image 30.png'; 
import im31 from '../Assets/Image 31.png'; 
import im32 from '../Assets/Image 32.png'; 
import im33 from '../Assets/Image 33.png'; 
import logo from '../Assets/icon.png';

export default function HRnavBar() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const navItems = [
    { name: 'Dashboard', path: '/home',icon:im30},
    { name: 'Training Engineers', path: '/engineers',icon:im31},
    { name: 'Supervising Engineers', path: '/supervisingengineers',icon:im32 },
    { name: 'Trainings', path: '/trainings',icon:im33 },
    
  ];

  return (
    <div className='hsidebar'>
      <div className="hsidebar-profile">
        <img src={logo} alt="icon" />
        <p>HR Admin</p>
        <hr />
      </div>
      <ul className="hsidebar-menu">
        {navItems.map((item, index) => (
          <li
            key={index}
            onClick={() => handleItemClick(item.name)}
            style={{ backgroundColor: selectedItem === item.name ? '#F2A922' : 'transparent' }}
          >
            <Link to={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src={item.icon} alt={`${item.name} icon`} className='nav-icon' />

              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
