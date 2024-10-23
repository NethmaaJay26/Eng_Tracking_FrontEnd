import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/engineerDetails.css';

export default function EngineerDetails() {
  const [engineer, setEngineer] = useState(null);
  const [trainingDetails, setTrainingDetails] = useState([]); 
  const [error, setError] = useState('');
  const [expandedTrainingId, setExpandedTrainingId] = useState(null);

  useEffect(() => {
    const fetchEngineerDetails = async () => {
      try {
        const engineerId = localStorage.getItem('engineerId'); 
        if (!engineerId) {
          setError('Engineer ID not found');
          return;
        }

        const response = await axios.get(`http://localhost:4000/api/engineers/${engineerId}`);
        setEngineer(response.data);  

        const trainingIds = response.data.training.map(training => training._id);
        localStorage.setItem('trainingIds', JSON.stringify(trainingIds));

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
        setTrainingDetails(responses.map(res => res.data)); 
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

  const handleGoalCompletionChange = async (goalIndex, trainingId, isCompleted) => {
    try {
      // Update the goal status in the backend
      await axios.put(`http://localhost:4000/api/trainings/${trainingId}/goals/status`, {
        goalIndex,
        isCompleted,
      });

      // After successful update, update the local state to reflect the change
      setTrainingDetails(prevDetails => prevDetails.map(training => {
        if (training._id === trainingId) {
          const updatedGoals = training.goals.map((goal, index) => {
            if (index === goalIndex) {
              return { ...goal, isCompleted }; // Update the specific goal's completion status
            }
            return goal;
          });
          return { ...training, goals: updatedGoals };
        }
        return training;
      }));

      alert('Goal status updated successfully!');
    } catch (error) {
      console.error('Error updating goal status:', error);
    }
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
                        <span>{goal.goal}</span>
                        <select 
                          value={goal.isCompleted ? 'completed' : 'not completed'} 
                          onChange={(e) => handleGoalCompletionChange(index, training._id, e.target.value === 'completed')}
                        >
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
