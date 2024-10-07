import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/Engtrainings.css';

export default function Trainings() {
  const [trainingDetails, setTrainingDetails] = useState(null);
  const [error, setError] = useState('');

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
      } catch (error) {
        console.error('Error fetching training details:', error);
        setError('Error fetching training details');
      }
    };

    fetchTrainingDetails();
  }, []);

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
                <td>{trainingDetails.isCompleted ? 'Completed' : 'Not Completed'}</td>
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
