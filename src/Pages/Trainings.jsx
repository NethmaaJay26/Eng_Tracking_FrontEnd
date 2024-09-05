import React, { useState, useEffect } from 'react';
import './CSS/Trainings.css';

export default function Trainings() {
  const [showPopup, setShowPopup] = useState(false);
  const [trainings, setTrainings] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    company: '',
    timePeriod: '',
    Goals: '' // Ensure 'Goals' matches your schema field
  });

  useEffect(() => {
    // Fetch trainings when the component mounts
    fetch('http://localhost:4000/api/trainings/')
      .then(response => response.json())
      .then(data => setTrainings(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:4000/api/trainings/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      setTrainings([...trainings, data]); // Add new training to the list
      setShowPopup(false);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

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
                <td>{training.Goals}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showPopup && (
        <div className='popup'>
          <div className='popup-inner'>
            <h2>Add a Training</h2>
            <button className='close-btn' onClick={togglePopup}>Close</button>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
              </label>
              <label>
                Category:
                <select name="category" value={formData.category} onChange={handleChange}>
                  <option value="">Select a category</option>
                  <option value="technical">Technical</option>
                  <option value="managerial">Managerial</option>
                  <option value="interdisciplinary">Interdisciplinary</option>
                  <option value="communication">Communication</option>
                  <option value="category1">Category 1</option>
                </select>
              </label>
              <label>
                Company:
                <input type="text" name="company" value={formData.company} onChange={handleChange} />
              </label>
              <label>
                Time Period:
                <input type="text" name="timePeriod" value={formData.timePeriod} onChange={handleChange} />
              </label>
              <label>
                Goals:
                <input type="text" name="Goals" value={formData.Goals} onChange={handleChange} />
              </label>
              <button type="submit">Add the Training</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
