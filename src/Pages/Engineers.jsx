import React, { useState, useEffect } from 'react';
import './CSS/Engineers.css';
import axios from 'axios';

export default function Engineers() {
  const [engineers, setEngineers] = useState([]);
  const [showAddTraineePopup, setShowAddTraineePopup] = useState(false);
  const [showMorePopup, setShowMorePopup] = useState(false);
  const [supervisingEngineers, setSupervisingEngineers] = useState([]);
  const [selectedEngineer, setSelectedEngineer] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    traineeID: '',
    role: 'Recruited Graduate Engineer',
    email: '',
    address: '',
    contact: '',
    password: '',
    supervisingEngineer: '', // Store ID instead of name
    photo: null
  });

  useEffect(() => {
    fetchEngineers();
    fetchSupervisingEngineers();
  }, []);

  const fetchEngineers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/engineers');
      setEngineers(response.data);
    } catch (error) {
      console.error('Error fetching engineers:', error);
    }
  };

  const fetchSupervisingEngineers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/sengineers');
      setSupervisingEngineers(response.data);
    } catch (error) {
      console.error('Error fetching supervising engineers:', error);
    }
  };

  const toggleAddTraineePopup = () => {
    setShowAddTraineePopup(!showAddTraineePopup);
  };

  const toggleMorePopup = () => {
    setShowMorePopup(!showMorePopup);
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
      const response = await axios.post('http://localhost:4000/api/engineers/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 201) {
        fetchEngineers();
        toggleAddTraineePopup();
      }
    } catch (error) {
      console.error('Error adding engineer:', error);
    }
  };

  const handleMoreClick = async (engineer) => {
    try {
      if (engineer.supervisingEngineer) {
        const response = await axios.get(`http://localhost:4000/api/engineers/${engineer._id}`);
        const { supervisingEngineer } = response.data;
        const supervisingEngineerName = supervisingEngineer ? supervisingEngineer.name : 'N/A'; // Handle missing names
        setSelectedEngineer({ ...engineer, supervisingEngineerName });
      } else {
        setSelectedEngineer(engineer);
      }
      setShowMorePopup(true);
    } catch (error) {
      console.error('Error fetching supervising engineer:', error);
    }
  };


  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleUpdate = async (e) => {
    // e.preventDefault();
    const data = new FormData();
    for (const key in selectedEngineer) {
      if (key !== '_id') { // Exclude _id field from FormData (unique identifier and do not need to update)
        data.append(key, selectedEngineer[key]);
      }
    }
    try {
      const response = await axios.put(`http://localhost:4000/api/engineers/${selectedEngineer._id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 200) {
        fetchEngineers();
        setShowMorePopup(false);
        setEditMode(false);
      }
    } catch (error) {
      console.error('Error updating engineer:', error);
    }
  };


  //delete option delete engineer by id

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/engineers/${selectedEngineer._id}`);
      if (response.status === 200) {
        fetchEngineers();
        setShowMorePopup(false);
      }
    } catch (error) {
      console.error('Error deleting engineer:', error);
    }
  };
  
  
  return (
    <div className='engineers'>
      <h1>Trainee Engineers</h1>
      <hr />
      
      <div className='add-te'>
        <input type="text" placeholder="Search for a Trainee Engineer" />
        <button onClick={toggleAddTraineePopup}>Add Trainees</button>
      </div>
      <div className='section'>
        <h2>Recruited Graduate Engineers</h2>
        <div className='engineer-grid'>
          {engineers.filter(engineer => engineer.role === 'Recruited Graduate Engineer').map((engineer, index) => (
            <div className='engineer-card' key={index}>
              <img src={`http://localhost:4000/uploads/${engineer.photo}`} alt="Engineer" />
              <h3>{engineer.name}</h3>
              <p>{engineer.traineeID}</p>
              <button onClick={() => handleMoreClick(engineer)}>More</button>
            </div>
          ))}
        </div>
      </div>
      <div className='section'>
        <h2>Experienced Trainee Engineers</h2>
        <div className='engineer-grid'>
          {engineers.filter(engineer => engineer.role === 'Experienced Trainee Engineer').map((engineer, index) => (
            <div className='engineer-card' key={index}>
              <img src={`http://localhost:4000/uploads/${engineer.photo}`} alt="Engineer" />
              <h3>{engineer.name}</h3>
              <p>{engineer.traineeID}</p>
              <button onClick={() => handleMoreClick(engineer)}>More</button>
            </div>
          ))}
        </div>
      </div>

      {showAddTraineePopup && (
        <div className='popup'>
          <div className='popup-inner'>
            <h2>Add a Trainee</h2>
            <button className='close-btn' onClick={toggleAddTraineePopup}>Close</button>
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
                Contact:
                <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />
              </label>
              <label>
                Password:
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
              </label>
              <label>
                Supervising Engineer:
                <select name="supervisingEngineer" value={formData.supervisingEngineer} onChange={handleChange} required>
                  <option value="">Select Supervising Engineer</option>
                  {supervisingEngineers.map(se => (
                    <option key={se._id} value={se._id}>{se.name}</option>
                  ))}
                </select>
              </label>
              <label>
                Photo:
                <input type="file" onChange={handleFileChange} />
              </label>
              <button type="submit">Add Trainee</button>
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
                  TraineeID:
                  <input type="text" name="traineeID" value={selectedEngineer.traineeID} onChange={(e) => setSelectedEngineer({...selectedEngineer, traineeID: e.target.value})} />
                </label>
                <label>
                  Role:
                  <input type="text" name="role" value={selectedEngineer.role} onChange={(e) => setSelectedEngineer({...selectedEngineer, role: e.target.value})} />
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
                  Contact:
                  <input type="text" name="contact" value={selectedEngineer.contact} onChange={(e) => setSelectedEngineer({...selectedEngineer, contact: e.target.value})} />
                </label>

                <label>c
            Supervising Engineer:
            <select 
              name="supervisingEngineer" 
              value={selectedEngineer.supervisingEngineer} 
              onChange={(e) => setSelectedEngineer({...selectedEngineer, supervisingEngineer: e.target.value})} 
              required
            >
              <option value="">Select Supervising Engineer</option>
              {supervisingEngineers.map(se => (
                <option key={se._id} value={se._id}>{se.name}</option>
              ))}
            </select>
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
                    TraineeID:
                    <input type="text" name="traineeID" value={selectedEngineer.traineeID} readOnly />
                  </label>
                  <label>
                    Role:
                    <input type="text" name="role" value={selectedEngineer.role} readOnly />
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
                    Supervising Engineer:
                    <input type="text" name="supervisingEngineerName" value={selectedEngineer.supervisingEngineerName || 'N/A'} readOnly />
                  </label>
                  <label>
                    Photo:
                    <img src={`http://localhost:4000/uploads/${selectedEngineer.photo}`} alt="Engineer" />
                  </label>
                </form>
                <button onClick={handleEditClick}>Edit</button>
                <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>  {/*should be update css properties* */}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
