import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/Trainings.css';

export default function Trainings() {
  const [trainings, setTrainings] = useState([]);
  const navigate = useNavigate(); // Use useNavigate hook

  useEffect(() => {
    // Fetch trainings when the component mounts
    fetch('http://localhost:4000/api/trainings/')
      .then(response => response.json())
      .then(data => setTrainings(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleAddTraining = () => {
    // Navigate to the Add Training page
    navigate('/trainings/add');
  };

  return (
    <div className='trainings'>
      <h1>Trainings</h1>
      <hr />
      <div className='top-bar'>
        <input type="text" placeholder="Search for a Training by name or company" />
        <button>Export CSV</button>
        <button onClick={handleAddTraining}>Add a Training</button> 
      </div>
      <div className='section'>
        <table className='trainings-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Company</th>
              <th>Time Period</th>
              <th>Goals</th>
            </tr>
          </thead>
          <tbody>
            {trainings.map(training => (
              <tr key={training._id}>
                <td>{training.name}</td>
                <td>{training.category}</td>
                <td>{training.company}</td>
                <td>{training.timePeriod}</td>
                <td>
                  {training.goals && training.goals.map((goal, index) => (
                    <div key={index}>
                      <label>{`Goal ${index + 1}:`}</label>
                      <input type="text" value={goal} disabled /> {/* Textbox for each goal */}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}