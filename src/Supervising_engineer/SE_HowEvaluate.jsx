import React from 'react';
import './CSS/SE_HowEvaluate.css';
import IMG_ALGO from '../Components/Assets/IMG_ALGO.svg';

const SE_HowEvaluate = () => {
  return (
    <div className="se-how-evaluate">
      <section className="header-section">
        <h2 className="algorithm-title">
          Algorithm that assesses the <span>performance of engineers</span> and suggests the subsequent set of <span>training needs</span>.
        </h2>
      </section>

      <section className="algorithm-section">
        <h3 className="algorithm-question">What is the Algorithm?</h3>
        <p className="algorithm-description">
          Each training category is assigned a weight, tailored to job experience level.
        </p>
        <div className="expertise-circle">
          <img src= {IMG_ALGO} alt="Kavindu" />
        </div>
      </section>

      <section className="allocation-section">
        <div className="allocation-box">
          <h4>Weight Allocation</h4>
          <p>
            For experienced engineers, managerial trainings carry higher weight,
            while technical trainings hold greater significance for trainee engineers.
          </p>
          <button>Read More</button>
        </div>
        <div className="allocation-box">
          <h4>Goal Allocation</h4>
          <p>
            Every training encompasses multiple goals, each contributing to your overall mark.
          </p>
          <button>Read More</button>
        </div>
        <div className="allocation-box">
          <h4>Mark Allocation</h4>
          <p>
            Marks are awarded for each goal completed, culminating in a total mark for the training.
          </p>
          <button>Read More</button>
        </div>
      </section>
    </div>
  );
};

export default SE_HowEvaluate;
