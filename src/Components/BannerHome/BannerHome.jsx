import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BannerHome.css';
import pointImage1 from '../Assets/point1.png';
import pointImage2 from '../Assets/point2.png';
import pointImage3 from '../Assets/point3.png';

const Banner = () => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className="banner">
      <div className="welcome-container">
        <h1>Welcome to your dashboard, Admin!</h1>
      </div>
      <div className="points-container">
        <div className="point" onClick={() => handleClick('/supervisingengineers')}>
          <img src={pointImage1} alt="Point 1" />
          <h3>Add Supervising Engineers</h3>
        </div>
        <div className="point" onClick={() => handleClick('/engineers')}>
          <img src={pointImage2} alt="Point 2" />
          <h3>Add Training Engineers</h3>
        </div>
        <div className="point" onClick={() => handleClick('/trainings')}>
          <img src={pointImage3} alt="Point 3" />
          <h3>Add Trainings</h3>
        </div>
      </div>
    </div>
  );
};

export default Banner;