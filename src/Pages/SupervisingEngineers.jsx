import React, { useState, useEffect } from 'react';
import './CSS/SupervisingEngineers.css';
import axios from 'axios';

export default function SupervisingEngineers() {
  const [engineers, setSEngineers] = useState([]);
  const [showPopup, setSShowPopup] = useState(false);
  const [showMorePopup, setShowMorePopup] = useState(false);
  const [selectedEngineer, setSelectedEngineer] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setSFormData] = useState({
    name: '',
    traineeID: '',
    email: '',
    address: '',
    contact: '',
    password: '',
    photo: null
  });

  useEffect(() => {
    fetchSEngineers();
  }, []);

  const fetchSEngineers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/sengineers');
      setSEngineers(response.data);
    } catch (error) {
      console.error('Error fetching supervising engineers:', error);
    }
  };

  const togglePopup = () => {
    setSShowPopup(!showPopup);
  };

  const toggleMorePopup = () => {
    setShowMorePopup(!showMorePopup);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setSFormData({
      ...formData,
      photo: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    try {
      const response = await axios.post('http://localhost:4000/api/sengineers/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 201) {
        fetchSEngineers();
        togglePopup();
      }
    } catch (error) {
      console.error('Error adding supervising engineer:', error);
    }
  };

  const handleMoreClick = async (engineer) => {
    setSelectedEngineer(engineer);
    setShowMorePopup(true);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in selectedEngineer) {
      if (key !== '_id') { // Exclude _id field from FormData
        data.append(key, selectedEngineer[key]);
      }
    }
    try {
      const response = await axios.put(`http://localhost:4000/api/sengineers/${selectedEngineer._id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 200) {
        fetchSEngineers();
        setShowMorePopup(false);
        setEditMode(false);
      }
    } catch (error) {
      console.error('Error updating supervising engineer:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/sengineers/${selectedEngineer._id}`);
      if (response.status === 200) {
        fetchSEngineers();
        setShowMorePopup(false);
      }
    } catch (error) {
      console.error('Error deleting supervising engineer:', error);
    }
  };

  return (
    <div className='supervising-engineers'>
      <h1>Supervising Engineers</h1>
      <hr />
      <div className='add-se'>
        <input type="text" placeholder="Search for a Supervising Engineer" />
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
              <button onClick={() => handleMoreClick(engineer)}>More</button>
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
                SupervisorID:
                <input type="text" name="traineeID" value={formData.traineeID} onChange={handleChange} required />
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
                Password:
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
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

      {showMorePopup && selectedEngineer && (
        <div className='popup'>
          <div className='popup-inner'>
            <h2>{selectedEngineer.name}'s Details</h2>
            <button className='close-btn' onClick={toggleMorePopup}>Close</button>
            {editMode ? (
              <form onSubmit={handleUpdate}>
                <label>
                  Name:
                  <input type="text" name="name" value={selectedEngineer.name} onChange={(e) => setSelectedEngineer({...selectedEngineer, name: e.target.value})} />
                </label>
                <label>
                  SupervisorID:
                  <input type="text" name="traineeID" value={selectedEngineer.traineeID} onChange={(e) => setSelectedEngineer({...selectedEngineer, traineeID: e.target.value})} />
                </label>
                <label>
                  Email:
                  <input type="email" name="email" value={selectedEngineer.email} onChange={(e) => setSelectedEngineer({...selectedEngineer, email: e.target.value})} />
                </label>
                <label>
                  Address:
                  <input type="text" name="address" value={selectedEngineer.address} onChange={(e) => setSelectedEngineer({...selectedEngineer, address: e.target.value})} />
                </label>
                <label>
                  Contacts:
                  <input type="number" name="contact" value={selectedEngineer.contact} onChange={(e) => setSelectedEngineer({...selectedEngineer, contact: e.target.value})} />
                </label>
                <label>
                  Photo:
                  <input type="file" onChange={(e) => setSelectedEngineer({...selectedEngineer, photo: e.target.files[0]})} />
                </label>
                <button type="submit">Update</button>
              </form>
            ) : (
              <div>
                <form>
                  <label>
                    Name:
                    <input type="text" name="name" value={selectedEngineer.name} readOnly />
                  </label>
                  <label>
                    SupervisorID:
                    <input type="text" name="traineeID" value={selectedEngineer.traineeID} readOnly />
                  </label>
                  <label>
                    Email:
                    <input type="email" name="email" value={selectedEngineer.email} readOnly />
                  </label>
                  <label>
                    Address:
                    <input type="text" name="address" value={selectedEngineer.address} readOnly />
                  </label>
                  <label>
                    Contacts:
                    <input type="number" name="contact" value={selectedEngineer.contact} readOnly />
                  </label>
                  <label>
                    Photo:
                    <img src={`http://localhost:4000/uploads/${selectedEngineer.photo}`} alt="Engineer" />
                  </label>
                </form>
                <button onClick={handleEditClick}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
