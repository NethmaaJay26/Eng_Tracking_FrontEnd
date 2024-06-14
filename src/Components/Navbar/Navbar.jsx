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
    <div>
      
    </div>
  );
}
