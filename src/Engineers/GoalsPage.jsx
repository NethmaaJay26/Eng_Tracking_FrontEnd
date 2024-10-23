import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CSS/GoalsPage.css'; // Import the CSS file

function GoalsPage() {
  const { trainingId } = useParams();
  const [training, setTraining] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false); // State for showing the popup
  const [popupMessage, setPopupMessage] = useState(''); // Message to display in the popup

  useEffect(() => {
    const fetchTrainingGoals = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/trainings/${trainingId}`);
        setTraining(response.data);
      } catch (error) {
        console.error('Error fetching training goals:', error);
        setError('Error fetching training goals.');
      }
    };

    if (trainingId) {
      fetchTrainingGoals();
    }
  }, [trainingId]);

  // Handle the file input change
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle file upload logic
  const handleFileUpload = () => {
    const formData = new FormData();
    if (selectedFile) {
      formData.append('file', selectedFile);
      // File upload logic with axios can be implemented here
      console.log("File ready to be uploaded", selectedFile);
      setPopupMessage('File uploaded successfully!');
      setShowPopup(true); // Show success popup for file upload
    }
  };

  // Simulating a status update function
  const handleStatusUpdate = async (goalId) => {
    try {
      // Assuming there's an API to update the goal status
      await axios.put(`http://localhost:4000/api/goals/${goalId}/update-status`, { isCompleted: true });
      // Remove any alert, use popup instead
      setPopupMessage('Goal status updated successfully!');
      setShowPopup(true); // Show success popup for status update
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Simulating a marks update function
  const handleMarksUpdate = async (goalId, newMarks) => {
    try {
      // Assuming there's an API to update the goal marks
      await axios.put(`http://localhost:4000/api/goals/${goalId}/update-marks`, { marks: newMarks });
      // Remove any alert, use popup instead
      setPopupMessage('Marks updated successfully!');
      setShowPopup(true); // Show success popup for marks update
    } catch (error) {
      console.error('Error updating marks:', error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage('');
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="container">
      <h1>{training?.name} - Goals</h1>

      {training?.goals && training.goals.length > 0 ? (
        <ul className="goal-list">
          {training.goals.map((goal, index) => (
            <li key={index} className="goal-item">
              <h3>Goal {index + 1}: {goal.goal}</h3>
              <p>Status: {goal.isCompleted ? 'Completed' : 'Not Completed'}</p>
              {/* Trigger status update on button click */}
              <button onClick={() => handleStatusUpdate(goal.id)}>Mark as Complete</button>
              {/* Marks update logic */}
              <button onClick={() => handleMarksUpdate(goal.id, 100)}>Update Marks</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No goals found for this training.</p>
      )}

      {/* File upload section */}
      <div className="file-upload-container">
        <h2>Submit Files</h2>
        <div className="file-upload-box">
          <input type="file" id="file" onChange={handleFileChange} />
          <button className="upload-button" onClick={handleFileUpload}>Upload File</button>
        </div>
        {selectedFile && <p>Selected file: {selectedFile.name}</p>}
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <p>{popupMessage}</p>
            <button onClick={closePopup} className="ok-button">OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GoalsPage;
