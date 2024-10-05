import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/SE_AssignedEngineer.css';

function AssignedEngineer() {
  const [assignedEngineers, setAssignedEngineers] = useState([]);
  const [trainings, setTrainings] = useState([]); // State to store the trainings
  const [error, setError] = useState(''); // Error state to handle UI errors

  useEffect(() => {
    // Fetch assigned engineers for the supervising engineer
    const fetchAssignedEngineers = async () => {
      try {
        const supervisorId = localStorage.getItem('supervisorId'); // Retrieve supervisor ID from localStorage
        if (!supervisorId) {
          setError('Supervisor ID not found');
          return;
        }
        const response = await axios.get(`http://localhost:4000/api/engineers/engineers/${supervisorId}`);
        setAssignedEngineers(response.data);
      } catch (error) {
        setError('Error fetching assigned engineers');
        console.error('Error fetching assigned engineers:', error);
      }
    };

    // Fetch trainings to populate the dropdown
    const fetchTrainings = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/trainings/');
        setTrainings(response.data);
      } catch (error) {
        console.error('Error fetching trainings:', error);
      }
    };

    fetchAssignedEngineers();
    fetchTrainings();
  }, []);

  return (
    <div className="assigned-engineer">
      <div className="trainings">
        <h1>Assigned Engineers</h1>
        <hr />
        {error && <div className="error-message">{error}</div>} {/* Display error message */}
        <div className="section">
          <table className="trainings-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Company</th>
                <th>Phone Number</th>
                <th>Email address</th>
                <th>Trainings</th>
              </tr>
            </thead>
            <tbody>
              {assignedEngineers.length > 0 ? (
                assignedEngineers.map(engineer => (
                  <tr key={engineer._id}>
                    <td>{engineer.name}</td>
                    <td>{engineer.role}</td>
                    <td>{engineer.address}</td>
                    <td>{engineer.contact}</td>
                    <td>{engineer.email}</td>
                    {/* Dropdown to select training */}
                    <td>
                      <select>
                        <option value="">Select Training</option>
                        {trainings.map(training => (
                          <option key={training._id} value={training.name}>
                            {training.name}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No assigned engineers found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AssignedEngineer;
