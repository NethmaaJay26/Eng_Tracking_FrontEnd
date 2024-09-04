import React, { useState } from 'react';
import './CSS/Engtrainings.css';

export default function Trainings() {
  

  return (
    <div className='trainings'>
      <h1>Trainings</h1>
      <hr />
      
      <div className='section'>
        <table className='trainings-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Company</th>
              <th>Time Period</th>
              <th>Email address</th>
              <th>Completed/Not completed</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
      
        
    </div>
  );
}
