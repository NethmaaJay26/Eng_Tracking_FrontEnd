import React from 'react';
import './CSS/SE_AssignedEngineer.css'; // Import relevant CSS file

function AssignedEngineer() {
  return (
    <div className="assigned-engineer">
      
      <div className="trainings">
        <h1>Assigned Engineers</h1>
        <hr />
        
        <div className="section">
          <table className="trainings-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Trainings</th>
                <th>Company</th>
                <th>Phone Number</th>
                <th>Email address</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Rows of training data will go here */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AssignedEngineer;
