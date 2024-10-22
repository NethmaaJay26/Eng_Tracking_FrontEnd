import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/Engtrainings.css';

export default function Trainings() {
  const [trainings, setTrainings] = useState([]);  // All available trainings
  const [selectedTrainings, setSelectedTrainings] = useState([]);  // Engineer's selected trainings
  const [error, setError] = useState('');
  const [status, setStatus] = useState({});  // Status of each training (Completed/Not Completed)

  // Fetch all trainings and engineer's selected trainings on component mount
  useEffect(() => {
    const fetchAllTrainings = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/trainings/');
        setTrainings(response.data); // Store all trainings

        const initialStatus = response.data.reduce((acc, training) => {
          acc[training._id] = training.isCompleted ? 'Completed' : 'Not Completed';
          return acc;
        }, {});
        setStatus(initialStatus); // Set initial status for each training
      } catch (error) {
        console.error('Error fetching trainings:', error);
        setError('Error fetching trainings');
      }
    };

    const fetchEngineerTrainings = async () => {
      try {
        const engineerId = localStorage.getItem('engineerId'); // Get engineer ID from local storage
        const response = await axios.get(`http://localhost:4000/api/engineers/${engineerId}`);
        setSelectedTrainings(response.data.training); // Store engineer's selected trainings (populated)
      } catch (error) {
        console.error('Error fetching engineer trainings:', error);
        setError('Error fetching engineer trainings');
      }
    };

    fetchAllTrainings();  // Fetch all available trainings
    fetchEngineerTrainings();  // Fetch the engineer's selected trainings
  }, []);

  const handleStatusChange = async (e, trainingId) => {
    const newStatus = e.target.value;
    setStatus(prevStatus => ({
      ...prevStatus,
      [trainingId]: newStatus
    }));

    // Update the training status in the database
    try {
      await axios.put(`http://localhost:4000/api/trainings/${trainingId}`, { isCompleted: newStatus === 'Completed' });
      alert('Training status updated successfully!');
    } catch (error) {
      console.error('Error updating training status:', error);
      setError('Error updating training status');
    }
  };

  const handleSelectionChange = (trainingId) => {
    setSelectedTrainings(prevSelected => {
      if (prevSelected.some(training => training._id === trainingId)) {
        // Deselect training
        return prevSelected.filter(training => training._id !== trainingId);
      } else {
        // Select training
        const selectedTraining = trainings.find(training => training._id === trainingId);
        return [...prevSelected, selectedTraining];  // Add the selected training object
      }
    });
  };

  const saveSelectedTrainings = async () => {
    try {
      const engineerId = localStorage.getItem('engineerId'); // Assuming you have stored engineer ID in local storage
      const trainingIds = selectedTrainings.map(training => training._id); // Extract IDs of selected trainings
      await axios.put(`http://localhost:4000/api/engineers/${engineerId}`, { training: trainingIds });
      alert('Selected trainings updated successfully!');
    } catch (error) {
      console.error('Error saving selected trainings:', error);
      setError('Error saving selected trainings');
    }
  };

  return (
    <div className="trainings">
      <h1>All Trainings</h1>
      <hr />
      {error && <div className="error-message">{error}</div>}
      {trainings.length > 0 ? (
        <div className="section">
          <table className="trainings-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Company</th>
                <th>Time Period</th>
                <th>Status</th>
                <th>Select</th>
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
                    <select
                      value={status[training._id] || 'Not Completed'}
                      onChange={(e) => handleStatusChange(e, training._id)}
                    >
                      <option value="Completed">Completed</option>
                      <option value="Not Completed">Not Completed</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedTrainings.some(t => t._id === training._id)}
                      onChange={() => handleSelectionChange(training._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={saveSelectedTrainings}>Save Selected Trainings</button>
        </div>
      ) : (
        <div>No trainings available yet.</div>
      )}

      {/* Display Selected Trainings */}
      <h2>Selected Trainings</h2>
      {selectedTrainings.length > 0 ? (
        <ul>
          {selectedTrainings.map(training => (
            <li key={training._id}>
              <strong>{training.name}</strong> - {training.category}, {training.company} ({training.timePeriod})
            </li>
          ))}
        </ul>
      ) : (
        <div>No trainings selected.</div>
      )}
    </div>
  );
}
