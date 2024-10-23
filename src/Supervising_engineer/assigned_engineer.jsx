import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CSS/SE_AssignedEngineer.css';

function AssignedEngineer() {
  const [assignedEngineers, setAssignedEngineers] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [selectedTrainingId, setSelectedTrainingId] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [engineerToEdit, setEngineerToEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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


  const confirmAddTraining = async () => {
    try {
      await axios.put(`http://localhost:4000/api/engineers/${engineerToEdit._id}`, {
        training: selectedTrainingId
      });

      setAssignedEngineers((prev) =>
        prev.map((engineer) =>
          engineer._id === engineerToEdit._id ? { ...engineer, training: selectedTrainingId } : engineer
        )
      );

      setPopupVisible(false);
      setIsEditing(false);
    } catch (error) {
      console.error('Error adding training:', error);
    }
  };

  const cancelAddTraining = () => {
    setPopupVisible(false);
    setSelectedTrainingId(null);
  };

  const handleRowClick = (engineerId) => {
    // Save the engineer ID to local storage if needed
    localStorage.setItem('engineerId', engineerId); 
    console.log('Saved Engineer ID:', engineerId);
    
    // Navigate to the engineer details page with the engineer ID
    navigate(`/engineer/${engineerId}`); // Update this path according to your routing setup
  
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
                <th>Trainee Engineer</th>
                <th>Name</th>
                <th>Email Address</th>
              </tr>
            </thead>
            <tbody>
              {assignedEngineers.length > 0 ? (
                assignedEngineers.map((engineer) => (
                  <tr key={engineer._id} onClick={() => handleRowClick(engineer._id)}>
                    <td>{engineer.traineeID}</td>
                    <td>{engineer.name}</td>
                    <td>{engineer.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No assigned engineers found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

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
