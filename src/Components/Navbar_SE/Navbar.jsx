import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/icon.png';
import im30 from '../Assets/Image 30.png'; 
import im31 from '../Assets/Image 31.png'; 
import im34 from '../Assets/Image 34.png'; 
import im33 from '../Assets/Image 33.png'; 

export default function Sidebar() {
  const [selectedItem, setSelectedItem] = useState(null);
  /*const navigate = useNavigate();*/

  const supervisorName = localStorage.getItem('name') || 'Guest';
  const supervisorImageURL = localStorage.getItem('image') || 'Guest';



  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const navItems = [
    { name: 'Dashboard', path: '/login/supervising-engineers/home' ,icon:im30},
    { name: 'Assigned Engineers', path: '/login/supervising-engineers/assigned_engineers',icon:im31 },
    { name: 'Evaluations', path: '/login/supervising-engineers/mark-allocations',icon:im33 },
    { name: 'Requests', path: '/login/supervising-engineers/requests' ,icon:im34},
  ];

  return (
    <div className='ssidebar'>
      <div className="ssidebar-profile">
        <img src={supervisorImageURL ? `http://localhost:4000/uploads/${supervisorImageURL}` : logo} alt="icon" />
        <p>{supervisorName}</p>
        <hr />
      </div>
      <ul className="ssidebar-menu">
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