import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EngBannerHome.css';
import pointImage1 from '../Assets/point1.png';
import pointImage2 from '../Assets/point2.png';
import pointImage3 from '../Assets/point3.png';

const Banner = () => {
  const navigate = useNavigate();
  const supervisorName = localStorage.getItem('name') || 'Guest';

  const handleClick = (path) => {
    navigate(path);
  };


  return (
    <div className="banner">
      <div className="welcome-container">
        <h1>Welcome to your dashboard, {supervisorName}!</h1>
      </div>
      <div className="points-container">
        <div className="point" onClick={() => handleClick('/Engprofile')}>
          <img src={pointImage1} alt="Point 1" />
          <h3>My Profile</h3>
        </div>
        <div className="point" onClick={() => handleClick('/Engtrainings')}>
          <img src={pointImage2} alt="Point 2" />
          <h3>My Trainings</h3>
        </div>
        <div className="point" onClick={() => handleClick('/Enggrades')}>
          <img src={pointImage3} alt="Point 3" />
          <h3>Grades & Progress</h3>
        </div>
      </div>
    </div>
  );
};

export default Banner;