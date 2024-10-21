import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/AddTraining.css';

export default function AddTraining() {
  const [formData, setFormData] = useState({
    name: '',
    category: '', // Added category to state
    company: '',
    timePeriod: '3 weeks', // Default to '1 weeks'
    goals: Array(5).fill({ title: '', description: '' }), // Array of objects to hold titles and descriptions for each goal
  });

  const navigate = useNavigate(); // useNavigate for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  // Handler for updating goals and their descriptions individually
  const handleGoalChange = (index, field, value) => {
    setFormData(prevData => {
      const newGoals = [...prevData.goals];
      newGoals[index] = { ...newGoals[index], [field]: value }; // Update the specific goal field
      return { ...prevData, goals: newGoals };
    });
  };

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
      console.log('Success:', data);
      navigate('/trainings'); // Navigate back to the trainings list
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div className='add-training'>
      <h2>Add a Training</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <div className='side-by-side'>
          <label>
            Company:
            <input type="text" name="company" value={formData.company} onChange={handleChange} />
          </label>
          <label>
            Time Period:
            <input 
              type="text" 
              name="timePeriod" 
              value={formData.timePeriod} 
              onChange={handleChange} 
              placeholder="e.g. 3 weeks" 
            />
          </label>
        </div>
        <label>
          Category:
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="">Select a category</option>
            <option value="technical">Technical</option>
            <option value="managerial">Managerial</option>
            <option value="interdisciplinary">Interdisciplinary</option>
            <option value="communication">Communication</option>
            <option value="soft skills">Soft Skills</option>
          </select>
        </label>
        <label>
          Goals:
        </label>
        {formData.goals.map((goal, index) => (
          <div key={index} className='goal-container'>
            <label>{`Goal ${index + 1}:`}</label>
            <input 
              type="text" 
              value={goal.title} 
              onChange={(e) => handleGoalChange(index, 'title', e.target.value)} 
            />
            <label>{`Goal ${index + 1}:`}</label>
            <textarea 
              value={goal.description} 
              onChange={(e) => handleGoalChange(index, 'description', e.target.value)} 
              rows="2" 
            />
          </div>
        ))}
        <button type="submit">Add the Training</button>
      </form>
    </div>
  );
}