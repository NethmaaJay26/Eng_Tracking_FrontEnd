import React from 'react';
import './CSS/mark_allocation.css'; 

const MarkAllocation = () => {
  const trainingCategories = [
    { category: 'Technical Training', weight: '40%' },
    { category: 'Managerial Involvement', weight: '30%' },
    { category: 'Interpersonal Skills', weight: '15%' },
    { category: 'Professional Conduct', weight: '10%' },
    { category: 'Other', weight: '5%' }
  ];

  const trainingCategories2 = [
    { category: 'Technical Training', weight: '30%' },
    { category: 'Managerial Involvement', weight: '40%' },
    { category: 'Interpersonal Skills', weight: '15%' },
    { category: 'Professional Conduct', weight: '10%' },
    { category: 'Other', weight: '5%' }
  ];

  return (
    <div className="mark-allocation-container">
      <div className="table-container">
        <h2>Newly Recruited Engineers</h2>
        <table className="mark-allocation-table">
          <thead>
            <tr>
              <th>Training Category</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            {trainingCategories.map((item, index) => (
              <tr key={index}>
                <td>{item.category}</td>
                <td>{item.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-container">
        <h2>Experienced Engineers</h2>
        <table className="mark-allocation-table">
          <thead>
            <tr>
              <th>Training Category</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            {trainingCategories2.map((item, index) => (
              <tr key={index}>
                <td>{item.category}</td>
                <td>{item.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarkAllocation;
