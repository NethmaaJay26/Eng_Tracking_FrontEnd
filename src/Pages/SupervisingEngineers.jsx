import React, { useState, useEffect } from 'react';
import './CSS/SupervisingEngineers.css'; // Make sure the CSS file exists and is correctly named
import axios from 'axios';

export default function SupervisingEngineers() {
  const [engineers, setEngineers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    traineeID: '',
    role: 'Supervising Engineer',
    email: '',
    address: '',
    contact: '',
    photo: null // Added photo to formData
  });

  useEffect(() => {
    fetchEngineers();
  }, []);

  const fetchEngineers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/sengineers'); // Corrected endpoint for fetching supervising engineers
      setEngineers(response.data);
    } catch (error) {
      console.error('Error fetching supervising engineers:', error);
    }
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0] // Handle file input
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    console.log('Submitting data:', formData); // Debugging line
    try {
      const response = await axios.post('http://localhost:4000/api/sengineers/add', data, { // Corrected endpoint for adding supervising engineers
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 201) {
        fetchEngineers(); // Refresh the list of engineers
        togglePopup(); // Close the popup
      }
    } catch (error) {
      console.error('Error adding supervising engineer:', error);
    }
  };

  return (
    <div className='supervising-engineers'>
      <h1>Supervising Engineers</h1>
      <hr />
      <div className='top-bar'>
        <input type="text" placeholder="Search for a supervising engineer by name or email" />
        <button>Export CSV</button>
        <button onClick={togglePopup}>Add Supervising Engineer</button>
      </div>
      <div className='section'>
        <h2>Supervising Engineers</h2>
        <div className='engineer-grid'>
          {engineers.map((engineer, index) => (
            <div className='engineer-card' key={index}>
              <img src={`http://localhost:4000/uploads/${engineer.photo}`} alt="Engineer" />
              <h3>{engineer.name}</h3>
              <p>{engineer.traineeID}</p>
              <button>More</button>
            </div>
          ))}
        </div>
      </div>
      
      {showPopup && (
        <div className='popup'>
          <div className='popup-inner'>
            <h2>Add a Supervising Engineer</h2>
            <button className='close-btn' onClick={togglePopup}>Close</button>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </label>
              <label>
                TraineeID:
                <input type="text" name="traineeID" value={formData.traineeID} onChange={handleChange} required />
              </label>
              <label>
                Role:
                <select name="role" value={formData.role} onChange={handleChange} required>
                  <option value="Supervising Engineer">Supervising Engineer</option>
                </select>
              </label>
              <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </label>
              <label>
                Address:
                <input type="text" name="address" value={formData.address} onChange={handleChange} required />
              </label>
              <label>
                Contacts:
                <input type="number" name="contact" value={formData.contact} onChange={handleChange} required />
              </label>
              <label>
                Photo:
                <input type="file" name="photo" onChange={handleFileChange} required />
              </label>
              <button type="submit">Add Supervising Engineer</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
