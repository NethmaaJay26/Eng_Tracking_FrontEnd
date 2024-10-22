import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function GoalsPage() {
  const { trainingId } = useParams();  // Extract the trainingId from the URL parameters
  const [training, setTraining] = useState(null);  // State to hold training data
  const [goalSubmissions, setGoalSubmissions] = useState({});  // State for goal submissions

  // Fetch the training data including its goals when the component mounts
  useEffect(() => {
    const fetchTrainingGoals = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/trainings/${trainingId}`);
        setTraining(response.data);  // Store the fetched training data
      } catch (error) {
        console.error('Error fetching training goals:', error);
      }
    };

    if (trainingId) {
      fetchTrainingGoals();  // Only fetch the goals if trainingId is available
    }
  }, [trainingId]);

  // Update the submission text for a specific goal
  const handleGoalSubmission = (goalIndex, submission) => {
    setGoalSubmissions(prevSubmissions => ({
      ...prevSubmissions,
      [goalIndex]: submission,
    }));
  };

  // Submit all goals to the backend
  const handleSubmit = async () => {
    try {
      // Map through the training's goals and combine them with the user's submissions
      const updatedGoals = training.goals.map((goal, index) => ({
        goal,
        submission: goalSubmissions[index] || '',  // Include the submission text or empty string if not submitted
      }));

      // Send the updated goals to the backend
      await axios.put(`http://localhost:4000/api/trainings/${trainingId}`, {
        goals: updatedGoals,
      });

      alert('Goals submitted successfully!');
    } catch (error) {
      console.error('Error submitting goals:', error);
    }
  };

  return (
    <div>
      {/* Display the training's name */}
      <h1>{training?.name} - Goals</h1>

      {/* Check if the training has goals and display them */}
      {training?.goals && training.goals.length > 0 ? (
        training.goals.map((goal, index) => (
          <div key={index}>
            <h3>Goal {index + 1}: {goal}</h3>
            <textarea
              placeholder="Enter your submission here..."
              value={goalSubmissions[index] || ''}  // Set the current submission value
              onChange={(e) => handleGoalSubmission(index, e.target.value)}  // Update the submission state
            />
          </div>
        ))
      ) : (
        <p>No goals found for this training.</p>  // Display if there are no goals
      )}

      {/* Button to submit all goal submissions */}
      <button onClick={handleSubmit}>Submit Goals</button>
    </div>
  );
}

export default GoalsPage;
