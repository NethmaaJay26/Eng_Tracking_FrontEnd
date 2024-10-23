import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CSS/GoalsPage.css'; // Import the CSS file

function GoalsPage() {
  const { trainingId } = useParams();
  const [training, setTraining] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');

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
    }
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
              <p>Status: {goal.isCompleted ? 'Completed' : 'Not Completed'}</p> {/* Display status only */}
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
    </div>
  );
}

export default GoalsPage;
