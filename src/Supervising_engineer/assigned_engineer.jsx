import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/SE_AssignedEngineer.css';

function AssignedEngineer() {
  const [assignedEngineers, setAssignedEngineers] = useState([]);
  const [error, setError] = useState(''); // Error state to handle UI errors

  useEffect(() => {
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
    fetchAssignedEngineers();
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
                    {/*  <td>{engineer.status || 'Active'}</td> */}
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
