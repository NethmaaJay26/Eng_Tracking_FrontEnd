import React from 'react';
import './EngDisplay.css';
import EngPic from '../Assets/engineer.png'; 

const EngDisplay = ({ engineer }) => {
  return (
    <div className='eng-display'>
      <div className='eng-display-left'>
        <img className='eng-display-img' src={EngPic} alt='Engineer' />
      </div>

      <div className='eng-display-right'>
        <h1>{engineer.name}</h1>
        <div className='eng-display-details'>
          <p><strong>Name:</strong> {engineer.name}</p>
          <p><strong>Department:</strong> {engineer.department}</p>
          <p><strong>Role:</strong> {engineer.role}</p>
          <p><strong>Email:</strong> {engineer.email}</p>
          <p><strong>Contact:</strong> {engineer.contact}</p>
        </div>

        <div className="eng-display-actions">

          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default EngDisplay;