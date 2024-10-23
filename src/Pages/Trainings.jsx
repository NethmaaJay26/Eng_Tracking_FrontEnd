import React, { useState, useEffect } from 'react';
import './CSS/Trainings.css';

export default function Trainings() {
  const [showPopup, setShowPopup] = useState(false);
  const [trainings, setTrainings] = useState([]);
  const [filteredTrainings, setFilteredTrainings] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    company: '',
    timePeriod: '',
    goals: [{ goal: '', isCompleted: false }] // Goals as objects with 'goal' and 'isCompleted'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [debounceTimeout, setDebounceTimeout] = useState(null); // For debouncing the search input

  useEffect(() => {
    // Fetch trainings when the component mounts
    fetch('http://localhost:4000/api/trainings/')
      .then(response => response.json())
      .then(data => {
        setTrainings(data);
        setFilteredTrainings(data); // Initially, all trainings are displayed
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  // Handle goal changes
  const handleGoalChange = (index, value) => {
    setFormData(prevData => {
      const newGoals = [...prevData.goals];
      newGoals[index].goal = value;
      return { ...prevData, goals: newGoals };
    });
  };

  // Add a new goal field
  const addGoalField = () => {
    setFormData(prevData => ({ ...prevData, goals: [...prevData.goals, { goal: '', isCompleted: false }] }));
  };

  // Submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:4000/api/trainings/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setTrainings([...trainings, data]); // Add new training to the list
        setFilteredTrainings([...trainings, data]); // Update filtered list
        setShowPopup(false); // Close the popup
        // Reset the form data after submission
        setFormData({
          name: '',
          category: '',
          company: '',
          timePeriod: '',
          goals: [{ goal: '', isCompleted: false }] // Reset goals to a single empty field
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  // Handle search input with debouncing
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Clear the previous debounce timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set a new debounce timeout
    setDebounceTimeout(
      setTimeout(() => {
        if (value === '') {
          setFilteredTrainings(trainings); // Show all trainings if search is cleared
        } else {
          const filtered = trainings.filter((training) =>
            training.name.toLowerCase().includes(value.toLowerCase()) || 
            training.company.toLowerCase().includes(value.toLowerCase())
          );
          setFilteredTrainings(filtered);
        }
      }, 500) // Adjust debounce delay (500ms)
    );
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className='trainings'>
      <h1>Trainings</h1>
      <hr />
      <div className='add-training'>
        <input
          type="text"
          placeholder="Search for a Training by name or company"
          value={searchTerm}
          onChange={handleSearch} // Trigger search on typing
        />
        <button onClick={togglePopup}>Add a Training</button>
      </div>
      <div className='section'>
        <table className='trainings-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Company</th>
              <th>Time Period</th>
              <th>Goals</th>
            </tr>
          </thead>
          <tbody>
            {filteredTrainings.length === 0 ? (
              <tr>
                <td colSpan="5">No trainings found</td>
              </tr>
            ) : (
              filteredTrainings.map(training => (
                <tr key={training._id}>
                  <td>{training.name}</td>
                  <td>{training.category}</td>
                  <td>{training.company}</td>
                  <td>{training.timePeriod}</td>
                  <td>
                    {Array.isArray(training.goals)
                      ? training.goals.map((goal, idx) => (
                          <div key={idx}>
                            {goal.goal}
                          </div>
                        ))
                      : ''}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {showPopup && (
        <div className='popup'>
          <div className='popup-inner'>
            <h2>Add a Training</h2>
            <button className='close-btn' onClick={togglePopup}>Close</button>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
              </label>
              <label>
                Category:
                <select name="category" value={formData.category} onChange={handleChange}>
                  <option value="">Select a category</option>
                  <option value="technical">Technical</option>
                  <option value="managerial">Managerial</option>
                  <option value="interdisciplinary">Interdisciplinary</option>
                  <option value="communication">Communication</option>
                </select>
              </label>
              <label>
                Company:
                <input type="text" name="company" value={formData.company} onChange={handleChange} />
              </label>
              <label>
                Time Period:
                <input type="text" name="timePeriod" value={formData.timePeriod} onChange={handleChange} />
              </label>
              <label>Goals:</label>
              {formData.goals.map((goalObj, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={goalObj.goal}
                    onChange={(e) => handleGoalChange(index, e.target.value)}
                    placeholder={`Goal ${index + 1}`}
                  />
                </div>
              ))}
              <button type="button" onClick={addGoalField}>Add Goal</button>
              <button type="submit">Add the Training</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
