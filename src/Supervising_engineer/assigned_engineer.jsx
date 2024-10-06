import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/SE_AssignedEngineer.css';

function AssignedEngineer() {
  const [assignedEngineers, setAssignedEngineers] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [selectedTrainingId, setSelectedTrainingId] = useState(null); // Store the selected training ID
  const [popupVisible, setPopupVisible] = useState(false); // For showing the popup
  const [engineerToEdit, setEngineerToEdit] = useState(null); // Track the engineer being edited
  const [isEditing, setIsEditing] = useState(false); // Track if we are editing
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch assigned engineers
    const fetchAssignedEngineers = async () => {
      try {
        const supervisorId = localStorage.getItem('supervisorId');
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

    // Fetch trainings for dropdown
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

  // Handle training selection and show confirmation popup
  const handleTrainingSelect = (engineer, trainingId) => {
    setEngineerToEdit(engineer);
    setSelectedTrainingId(trainingId); // Store the selected training ID
    setPopupVisible(true); // Show the confirmation popup
  };

  // Handle confirmation of adding or editing training
  const confirmAddTraining = async () => {
    try {
      // Update the engineer with the new training ID
      await axios.put(`http://localhost:4000/api/engineers/${engineerToEdit._id}`, {
        training: selectedTrainingId // Send the new training ID to the backend
      });

      // Update the frontend with the new training assignment
      setAssignedEngineers((prev) =>
        prev.map((engineer) =>
          engineer._id === engineerToEdit._id ? { ...engineer, training: selectedTrainingId } : engineer
        )
      );

      setPopupVisible(false);
      setIsEditing(false); // Stop editing mode after confirmation
    } catch (error) {
      console.error('Error adding training:', error);
    }
  };

  // Handle canceling the popup
  const cancelAddTraining = () => {
    setPopupVisible(false);
    setSelectedTrainingId(null);
  };

  // Handle showing the dropdown when clicking the "Edit" button
  const handleEditTraining = (engineer) => {
    setEngineerToEdit(engineer);
    setIsEditing(true); // Enable editing mode to show dropdown again
  };

  return (
    <div className="assigned-engineer">
      <div className="trainings">
        <h1>Assigned Engineers</h1>
        <hr />
        {error && <div className="error-message">{error}</div>}
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
                assignedEngineers.map((engineer) => (
                  <tr key={engineer._id}>
                    <td>{engineer.name}</td>
                    <td>{engineer.role}</td>
                    <td>{engineer.address}</td>
                    <td>{engineer.contact}</td>
                    <td>{engineer.email}</td>
                    <td>
                      {isEditing && engineerToEdit && engineerToEdit._id === engineer._id ? (
                        // Show dropdown if we're editing this engineer's training
                        <select
                          onChange={(e) => handleTrainingSelect(engineer, e.target.value)}
                          defaultValue={engineer.training || ''}
                        >
                          <option value="">Select Training</option>
                          {trainings.map((training) => (
                            <option key={training._id} value={training._id}>
                              {training.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <>
                          {engineer.training ? (
                            <>
                              {/* Show the current training name */}
                              {trainings.find((t) => t._id === engineer.training)?.name}
                              <button onClick={() => handleEditTraining(engineer)}>Edit</button>
                            </>
                          ) : (
                            <select onChange={(e) => handleTrainingSelect(engineer, e.target.value)}>
                              <option value="">Select Training</option>
                              {trainings.map((training) => (
                                <option key={training._id} value={training._id}>
                                  {training.name}
                                </option>
                              ))}
                            </select>
                          )}
                        </>
                      )}
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

      {/* Popup for confirmation */}
      {popupVisible && (
        <div className="popup">
          <div className="popup-content">
            <h2>Are you sure you want to update this training?</h2>
            <button onClick={confirmAddTraining}>Okay</button>
            <button onClick={cancelAddTraining}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssignedEngineer;
