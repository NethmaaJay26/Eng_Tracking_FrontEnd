import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/engineerDetails.css';

export default function EngineerDetails() {
  const [engineer, setEngineer] = useState(null);
  const [trainingDetails, setTrainingDetails] = useState([]); // State to hold detailed training info
  const [error, setError] = useState('');
  const [expandedTrainingId, setExpandedTrainingId] = useState(null); // Track expanded training for goals

  useEffect(() => {
    const fetchEngineerDetails = async () => {
      try {
        const engineerId = localStorage.getItem('engineerId'); // Get engineerId from localStorage
        if (!engineerId) {
          setError('Engineer ID not found');
          return;
        }

        const response = await axios.get(`http://localhost:4000/api/engineers/${engineerId}`);
        setEngineer(response.data);  // Store the engineer's data

        // Save training IDs in local storage
        const trainingIds = response.data.training.map(training => training._id);
        localStorage.setItem('trainingIds', JSON.stringify(trainingIds));

        // Fetch training details using the saved IDs
        fetchTrainingDetails(trainingIds);
      } catch (error) {
        console.error('Error fetching engineer details:', error);
        setError('Error fetching engineer details');
      }
    };

    const fetchTrainingDetails = async (trainingIds) => {
      try {
        const trainingPromises = trainingIds.map(id => 
          axios.get(`http://localhost:4000/api/trainings/${id}`)
        );
        const responses = await Promise.all(trainingPromises);
        setTrainingDetails(responses.map(res => res.data)); // Store fetched training details
      } catch (error) {
        console.error('Error fetching training details:', error);
        setError('Error fetching training details');
      }
    };

    fetchEngineerDetails();
  }, []);

  const toggleGoals = (trainingId) => {
    setExpandedTrainingId(expandedTrainingId === trainingId ? null : trainingId);
  };

  const handleGoalCompletionChange = (goalIndex, trainingId) => {
    // Implement logic for handling goal completion change (e.g., API call)
    console.log(`Goal ${goalIndex} completion status for training ${trainingId} changed`);
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!engineer) {
    return <div>Loading engineer details...</div>;
  }

  return (
    <div className="engineer-details">
      <h1>{engineer.name}'s Trainings and Goals</h1>
      <hr />
      
      <div className="trainings-section">
        <h2>Trainings</h2>
        {trainingDetails.length > 0 ? (
          <ul>
            {trainingDetails.map((training) => (
              <li key={training._id} className="training-item">
                <strong onClick={() => toggleGoals(training._id)}>{training.name}</strong>
                <div className={`goals-list ${expandedTrainingId === training._id ? 'expanded' : ''}`}>
                  {training.goals && training.goals.length > 0 ? (
                    training.goals.map((goal, index) => (
                      <div key={index} className="goal-item">
                        <span>{goal}</span>
                        <select onChange={(e) => handleGoalCompletionChange(index, training._id)}>
                          <option value="">Select Status</option>
                          <option value="completed">Completed</option>
                          <option value="not completed">Not Completed</option>
                        </select>
                      </div>
                    ))
                  ) : (
                    <div>No goals assigned for this training.</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div>No trainings assigned.</div>
        )}
      </div>
    </div>
  );
}
