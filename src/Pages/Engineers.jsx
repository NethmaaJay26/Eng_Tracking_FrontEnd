import React, { useState, useEffect } from 'react';
import './CSS/Engineers.css';
import axios from 'axios';

export default function Engineers() {
  const [engineers, setEngineers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [supervisingEngineers, setSupervisingEngineers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    traineeID: '',
    role: 'Recruited Graduate Engineer',
    email: '',
    address: '',
    contact: '',
    password: '',
    supervisingEngineer: '',
    photo: null // Added photo to formData
  });

  useEffect(() => {
    fetchEngineers();
    fetchSupervisingEngineers();
  }, []);

  //fetch engineer
  const fetchEngineers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/engineers');
      setEngineers(response.data);
    } catch (error) {
      console.error('Error fetching engineers:', error);
    }
  };

  //fetch supervising engineer
  const fetchSupervisingEngineers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/sengineers');
      setSupervisingEngineers(response.data);
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
    try {
      const response = await axios.post('http://localhost:4000/api/engineers/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 201) {
        fetchEngineers(); // Refresh the list of engineers
        togglePopup(); // Close the popup
      }
    } catch (error) {
      console.error('Error adding engineer:', error);
    }
  };


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
              <p>{engineer.traineeID}</p>
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
              <p>{engineer.traineeID}</p>
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
                  <option value="Recruited Graduate Engineer">Recruited Graduate Engineer</option>
                  <option value="Experienced Trainee Engineer">Experienced Trainee Engineer</option>
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
              {/*dropdown menu for supervising engineer selecting */}
              <label>
  Supervising Engineer:
  <select
    name="supervisingEngineer"
    value={formData.supervisingEngineer}
    onChange={handleChange}
    required
  >
    <option value="">Select a Supervising Engineer</option>
    {supervisingEngineers.map((supervisor) => (
      <option key={supervisor._id} value={supervisor.name}>
        {supervisor.name}
      </option>
    ))}
  </select>
</label>

         
              <label>
                Password:
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
              </label>
              <label>
                Photo:
                <input type="file" name="photo" onChange={handleFileChange} required />
              </label>
              <button type="submit">Add Trainee</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
