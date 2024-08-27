import React from 'react';
import './CSS/SupervisingEngineers.css';
import engineerIcon from '../Components/Assets/engineerIcon2.png'; // Replace with actual path

export default function Engineers() {
  const engineers = [
    //  engineersdata
    { name: 'Eng. ABC Perera', email: 'abc@gmail.com' },
    { name: 'Eng. ABC Perera', email: 'abc@gmail.com' },
    { name: 'Dr. ABC Perera', email: 'abc@gmail.com' },
    { name: 'Dr. ABC Perera', email: 'abc@gmail.com' },
    { name: 'Eng. ABC Perera', email: 'abc@gmail.com' },
  ];

  return (
    <div className='engineers'>
      <h1>Supervising Engineers</h1>
      <hr />
      <div className='top-bar'>
        <input type="text" placeholder="Search for an engineer by name or email" />
        <button>Export CSV</button>
        <button>Add Supervisors</button>
      </div>
      <div className='section'>
        <div className='engineer-grid'>
          {engineers.map((engineer, index) => (
            <div className='engineer-card' key={index}>
              <img src={engineerIcon} alt="Engineer" />
              <h3>{engineer.name}</h3>
              <p>{engineer.email}</p>
              <button>More</button>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}