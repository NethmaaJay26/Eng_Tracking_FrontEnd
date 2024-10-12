import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CSS/engineer_details.css';

function EngineerDetails() {
  const { engineerId } = useParams(); // Get the engineerId from the URL
  const [engineer, setEngineer] = useState(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    role: '',
    address: '',
    contact: '',
    email: '',
    traineeID: '',
    training: '', // Initialize training as a string
  });

  useEffect(() => {
    const fetchEngineerDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/engineers/${engineerId}`);
        setEngineer(response.data);
        setFormValues({
          name: response.data.name,
          role: response.data.role,
          address: response.data.address,
          contact: response.data.contact,
          email: response.data.email,
          traineeID: response.data.traineeID,
          training: response.data.training ? response.data.training.name : '', // Accessing specific property
        });
      } catch (error) {
        setError('Error fetching engineer details');
        console.error('Error fetching engineer details:', error);
      }
    };

    fetchEngineerDetails();
  }, [engineerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/api/engineers/${engineerId}`, formValues);
      setEngineer(response.data);
      setIsEditing(false);
      alert('Engineer details updated successfully!'); // Optional success message
    } catch (error) {
      setError('Error updating engineer details');
      console.error('Error updating engineer details:', error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFormValues({
      name: engineer.name,
      role: engineer.role,
      address: engineer.address,
      contact: engineer.contact,
      email: engineer.email,
      traineeID: engineer.traineeID,
      training: engineer.training ? engineer.training.name : '', // Accessing specific property
    });
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!engineer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="engineer-details">
      <h1>Engineer Details</h1>
      {isEditing ? (
        <div>
          <form>
            <label>
              Name:
              <input type="text" name="name" value={formValues.name} onChange={handleChange} />
            </label>
            <label>
              Role:
              <input type="text" name="role" value={formValues.role} onChange={handleChange} />
            </label>
            <label>
              Address:
              <input type="text" name="address" value={formValues.address} onChange={handleChange} />
            </label>
            <label>
              Contact:
              <input type="text" name="contact" value={formValues.contact} onChange={handleChange} />
            </label>
            <label>
              Email:
              <input type="email" name="email" value={formValues.email} onChange={handleChange} />
            </label>
            <label>
              Trainee ID:
              <input type="text" name="traineeID" value={formValues.traineeID} onChange={handleChange} />
            </label>
            <label>
              Training:
              <input type="text" name="training" value={formValues.training} onChange={handleChange} />
            </label>
          </form>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        <div>
          <p><strong>Name:</strong> {engineer.name}</p>
          <p><strong>Role:</strong> {engineer.role}</p>
          <p><strong>Address:</strong> {engineer.address}</p>
          <p><strong>Contact:</strong> {engineer.contact}</p>
          <p><strong>Email:</strong> {engineer.email}</p>
          <p><strong>Trainee ID:</strong> {engineer.traineeID}</p>
          <p><strong>Training:</strong> {engineer.training ? engineer.training.name : 'No training assigned'}</p>
          <button onClick={handleEditClick}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default EngineerDetails;
