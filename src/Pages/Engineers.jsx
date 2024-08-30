import React, { useState } from 'react';
import './CSS/Engineers.css';
import engineerIcon from '../Components/Assets/engineerIcon.png'; 

export default function Engineers() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const engineers = [
    //  engineersdata
    { name: 'Eng. ABC Perera', TraineeID: 'TREN0001' },
    { name: 'Eng. ABC Perera', TraineeID: 'TREN0002' },
    { name: 'Eng. ABC Perera', TraineeID: 'TREN0003' },
    { name: 'Eng. ABC Perera', TraineeID: 'TREN0004' },
    { name: 'Eng. ABC Perera', TraineeID: 'TREN0005' },
  ];

  return (
    <div className='engineers'>
      <h1>Trainee Engineers</h1>
      <hr />
      <div className='top-bar'>
        <input type="text" placeholder="Search for an engineer by name or email" />
        <button>Export CSV</button>
        <button onClick={togglePopup}>Add Trainees</button>
      </div>
      <div className='section'>
        <h2>Recruited Graduate Engineers</h2>
        <div className='engineer-grid'>
          {engineers.filter(engineer => engineer.role === 'Recruited Graduate Engineer').map((engineer, index) => (
            <div className='engineer-card' key={index}>
              <img src={`http://localhost:4000/uploads/${engineer.photo}`} alt="Engineer" /> {/* Display photo */}
              <h3>{engineer.name}</h3>
              <p>{engineer.TraineeID}</p>
              <button>More</button>
            </div>
          ))}
        </div>
      </div>
      <div className='section'>
        <h2>Experienced Trainee Engineers</h2>
        <div className='engineer-grid'>
          {engineers.filter(engineer => engineer.role === 'Experienced Trainee Engineer').map((engineer, index) => (
            <div className='engineer-card' key={index}>
              <img src={`http://localhost:4000/uploads/${engineer.photo}`} alt="Engineer" /> {/* Display photo */}
              <h3>{engineer.name}</h3>
              <p>{engineer.TraineeID}</p>
              <button>More</button>
            </div>
          ))}
        </div>
      </div>
      
      {showPopup && (
        <div className='popup'>
          <div className='popup-inner'>
            <h2>Add a Trainee</h2>
            <button className='close-btn' onClick={togglePopup}>Close</button>
            <form>
              <label>
                Name:
                <input type="text" name="name" />
              </label>
              <label>
                TraineeID:
                <input type="text" name="id" />
              </label>
              <label>
                Role:
                <select name="role">
                  <option value="Recruited Graduate Engineer">Recruited Graduate Engineer</option>
                  <option value="Experienced Trainee Engineer">Experienced Trainee Engineer</option>
                </select>
              </label>
              <label>
                Email:
                <input type="email" name="email" />
              </label>
              <label>
                Address:
                <input type="text" name="address" />
              </label>
              <label>
                Contacts:
                <input type="number" name="contact" />
              </label>
              <button type="submit">Add the Trainee</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
