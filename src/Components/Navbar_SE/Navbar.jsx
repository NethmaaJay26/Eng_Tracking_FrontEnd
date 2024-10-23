import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/icon.png';

export default function Sidebar() {
  const [selectedItem, setSelectedItem] = useState(null);
  /*const navigate = useNavigate();*/

  const supervisorName = localStorage.getItem('name') || 'Guest';
  const supervisorImageURL = localStorage.getItem('image') || 'Guest';



  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const navItems = [
    { name: 'Dashboard', path: '/login/supervising-engineers/home' },
    { name: 'Assigned Engineers', path: '/login/supervising-engineers/assigned_engineers' },
    { name: 'Evaluations', path: '/login/supervising-engineers/mark-allocations' },
    { name: 'Requests', path: '/login/supervising-engineers/requests' },
  ];

  return (
    <div className='sidebar'>
      <div className="sidebar-profile">
        <img src={supervisorImageURL ? `http://localhost:4000/uploads/${supervisorImageURL}` : logo} alt="icon" />
        <p>{supervisorName}</p>
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