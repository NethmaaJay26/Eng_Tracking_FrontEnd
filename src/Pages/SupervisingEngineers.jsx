import React, { useState } from 'react';
import './CSS/SupervisingEngineers.css';
import engineerIcon from '../Components/Assets/engineerIcon2.png'; 

export default function SupervisingEngineers() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const engineers = [
    //  engineersdata
    { name: 'Eng. ABC Perera', SENGID: 'SEN0001' },
    { name: 'Eng. DEF Silva', SENGID: 'SEN0002' },
    { name: 'Dr. HGCM Fernando',  SENGID: 'SEN0003' },
    { name: 'Dr. JKL Gunawardena',  SENGID: 'SEN0004' },
    { name: 'Eng. DNH Jayasinghe', SENGID: 'SEN0005' },
  ];

  return (
    <div className='engineers'>
      <h1>Supervising Engineers</h1>
      <hr />
      <div className='top-bar'>
        <input type="text" placeholder="Search for an engineer by name or email" />
        <button>Export CSV</button>
        <button onClick={togglePopup}>Add Supervisors</button>
      </div>
      <div className='section'>
        <div className='engineer-grid'>
          {engineers.map((engineer, index) => (
            <div className='engineer-card' key={index}>
              <img src={engineerIcon} alt="Engineer" />
              <h3>{engineer.name}</h3>
              <p>{engineer.SENGID}</p>
              <button>More</button>
            </div>
          ))}
        </div>
      </div>
      {showPopup && (
        <div className='popup'>
          <div className='popup-inner'>
            <h2>Add a Supervisor</h2>
            <button className='close-btn' onClick={togglePopup}>Close</button>
            <form>
              <label>
                Name:
                <input type="text" name="name" />
              </label>
              <label>
                SupervisorID:
                <input type="text" name="id" />
              </label>
              <label>
                Email:
                <input type="email" name="email" />
              </label>
              <label>
                Contacts:
                <input type="number" name="contact" />
              </label>
              <button type="submit">Add the Supervisor</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
