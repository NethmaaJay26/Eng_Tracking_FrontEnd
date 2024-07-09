import React from 'react';
import './CSS/Engineers.css';
import engineerIcon from '../Components/Assets/engineerIcon.png'; // Replace with actual path

export default function Engineers() {
  const engineers = [
    //  engineersdata
    { name: 'Mr. ABC Perera', email: 'abc@gmail.com' },
    { name: 'Mr. ABC Perera', email: 'abc@gmail.com' },
    { name: 'Mr. ABC Perera', email: 'abc@gmail.com' },
    { name: 'Mr. ABC Perera', email: 'abc@gmail.com' },
    { name: 'Mr. ABC Perera', email: 'abc@gmail.com' },
  ];

  return (
    <div className='engineers'>
      <h1>Trainee Engineers</h1>
      <hr />
      <div className='top-bar'>
        <input type="text" placeholder="Search for a engineer by name or email" />
        <button>Export CSV</button>
        <button>Add Trainees</button>
      </div>
      <div className='section'>
        <h2>Recruited Graduate Engineers</h2>
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
      <div className='section'>
        <h2>Experienced Trainee Engineers</h2>
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