import React from 'react';
import './CSS/SE_HowEvaluate.css';
import IMG_ALGO from '../Components/Assets/IMG_ALGO.svg';
import { useNavigate } from 'react-router-dom';


const SE_HowEvaluate = () => {
  const navigate = useNavigate();

  const goToMarkAllocation = () => {
    // Navigate to the Mark Allocation page
    navigate('/login/supervising-engineers/mark-allocations/marklist');
  };


  const goToWeightAllocation = () => {
    navigate('/login/supervising-engineers/mark-allocations/weight');
  };


  return (
    <div className="se-how-evaluate">

      <section className="allocation-section">
        <div className="allocation-box">
          <h4>Weight Allocation</h4>
          <p>
            For experienced engineers, managerial trainings carry higher weight,
            while technical trainings hold greater significance for trainee engineers.
          </p>
          <button onClick={goToWeightAllocation}>Read More</button>
        </div>
        <div className="allocation-box">
          <h4>Mark Allocation</h4>
          <p>
            Marks are awarded for each goal completed, culminating in a total mark for the training.
          </p>
          <button onClick={goToMarkAllocation}>Read More</button>
        </div>
      </section>
      <section className="algorithm-section">
        <div className="expertise-circle">
          <img src={IMG_ALGO} alt="Kavindu" />
        </div>
      </section>
    </div>
  );
};

export default SE_HowEvaluate;
