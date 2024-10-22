import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/Engtrainings.css';

export default function Trainings() {
  const [trainingDetails, setTrainingDetails] = useState(null);
  const [error, setError] = useState('');
  const [status, setStatus] = useState(''); // State to manage the training status

  useEffect(() => {
    const fetchTrainingDetails = async () => {
      try {
        const trainingId = localStorage.getItem('trainingId'); // Get training ID from local storage
        if (!trainingId) {
          setError('No training assigned to this engineer.');
          return;
        }

        // Fetch training details using the training ID
        const response = await axios.get(`http://localhost:4000/api/trainings/${trainingId}`);
        setTrainingDetails(response.data);
        setStatus(response.data.isCompleted ? 'Completed' : 'Not Completed'); // Initialize status
      } catch (error) {
        console.error('Error fetching training details:', error);
        setError('Error fetching training details');
      }
    };

    fetchTrainingDetails();
  }, []);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    // Update the training status in the database
    try {
      const trainingId = localStorage.getItem('trainingId');
      console.log ('training id saved', trainingId);// training id is saving properly
      await axios.put(`http://localhost:4000/api/trainings/${trainingId}`, { isCompleted: newStatus === 'Completed' });
      alert('Training status updated successfully!');
    } catch (error) {
      console.error('Error updating training status:', error);
      setError('Error updating training status');
    }
  };

  return (
    <div className="trainings">
      <h1>Training Details</h1>
      <hr />
      {error && <div className="error-message">{error}</div>}
      {trainingDetails ? (
        <div className="section">
          <table className="trainings-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Company</th>
                <th>Time Period</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{trainingDetails.name}</td>
                <td>{trainingDetails.category}</td>
                <td>{trainingDetails.company}</td>
                <td>{trainingDetails.timePeriod}</td>
                <td>
                  <select value={status} onChange={handleStatusChange}>
                    <option value="Completed">Completed</option>
                    <option value="Not Completed">Not Completed</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div>No training assigned yet.</div>
      )}
    </div>
  );
}
