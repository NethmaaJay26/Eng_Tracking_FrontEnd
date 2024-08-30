import React, { useState } from 'react';
import './CSS/Trainings.css';

export default function Trainings() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className='trainings'>
      <h1>Trainings</h1>
      <hr />
      <div className='top-bar'>
        <input type="text" placeholder="Search for a Training by name or company" />
        <button>Export CSV</button>
        <button onClick={togglePopup}>Add a Training</button>
      </div>
      <div className='section'>
        <table className='trainings-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Time Period</th>
              <th>Email address</th>
              <th>Assigned</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
      {showPopup && (
        <div className='popup'>
          <div className='popup-inner'>
            <h2>Add a Training</h2>
            <button className='close-btn' onClick={togglePopup}>Close</button>
            <form>
              
              <label>
                Name:
                <input type="text" name="name" />
              </label>
              <label>
                Company:
                <input type="text" name="company" />
              </label>
              <label>
                Time Period:
                <input type="text" name="timePeriod" />
              </label>
              <label>
                Email address:
                <input type="email" name="email" />
              </label>
              <label>
                Assigned:
                <input type="text" name="assigned" />
              </label>
              <button type="submit">Add the Training</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
