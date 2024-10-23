import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/MarkList.css'; // Import CSS for styling

function MarkList() {
  const [assignedEngineers, setAssignedEngineers] = useState([]);
  const [selectedEngineer, setSelectedEngineer] = useState(null);
  const [trainings, setTrainings] = useState([]); // Ensure it's initialized as an empty array
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch assigned engineers for the relevant supervisor
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

    fetchAssignedEngineers();
  }, []);

  const handleEngineerSelect = async (engineer) => {
  setSelectedEngineer(engineer);
  setTrainings([]);
  setError('');

  try {
    const response = await axios.get(`http://localhost:4000/api/engineers/${engineer._id}`);
    const engineerData = response.data;

    console.log(engineerData); // Check the structure of the response

    if (Array.isArray(engineerData.training) && engineerData.training.length > 0) {
      const trainingWithMarks = await Promise.all(
        engineerData.training.map(async (training) => {
          try {
            console.log(training); // Check if training name exists here
            const marksResponse = await axios.put(`http://localhost:4000/api/trainings/${training._id}`, { marks: training.marks });
            return { ...training, marks: marksResponse.data.marks };
          } catch (err) {
            console.error('Error fetching marks for training:', err);
            return { ...training, marks: 'Error fetching marks' };
          }
        })
      );
      setTrainings(trainingWithMarks);
    } else {
      setTrainings([]);
      setError('No trainings found for this engineer');
    }
  } catch (error) {
    console.error('Error fetching training details:', error);
    setError('Error fetching training details');
  }
};


  // Group trainings by category
  const groupTrainingsByCategory = (trainings) => {
    return trainings.reduce((acc, training) => {
      const { category } = training;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(training);
      return acc;
    }, {});
  };

  const groupedTrainings = groupTrainingsByCategory(trainings);

  return (
    <div className="mark-allocation-container">
      <h1 className="page-title">Mark Allocation</h1>
      {error && <div className="error-message">{error}</div>}

      <div className="engineers-list">
        <h2>Assigned Engineers</h2>
        <ul>
          {assignedEngineers.length > 0 ? (
            assignedEngineers.map((engineer) => (
              <li key={engineer._id} onClick={() => handleEngineerSelect(engineer)}>
                {engineer.name} - {engineer.email}
              </li>
            ))
          ) : (
            <li>No assigned engineers found</li>
          )}
        </ul>
      </div>

      {selectedEngineer && (
  <div className="trainings-section">
    <h2>Trainings for {selectedEngineer.name}</h2>
    {Object.entries(groupedTrainings).length > 0 ? (
      Object.entries(groupedTrainings).map(([category, trainings]) => (
        <div key={category} className="training-category">
          <h3>{category}</h3>
          <div className="table-wrapper"> {/* Centering wrapper */}
            <table className="training-table">
              <thead>
                <tr>
                  <th>Training Name</th>
                  <th>Marks Allocated</th>
                </tr>
              </thead>
              <tbody>
                {trainings.map((training) => (
                  <tr key={training._id}>
                    <td>{training.name ? training.name : 'Unnamed Training'}</td>
                    <td>{training.marks !== null && training.marks !== undefined ? training.marks : 'Marks not allocated'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))
    ) : (
      <p>No trainings found for this engineer.</p>
    )}
  </div>
)}

    </div>
  );
}

export default MarkList;
