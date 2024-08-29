import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/SE_Home.css';
import evaluateIcon from '../Components/Assets/evaluate.jpg';
import markAllocationIcon from '../Components/Assets/mark_allocation.jpg';
import trainingsIcon from '../Components/Assets/trainings.jpg';
import requestsIcon from '../Components/Assets/requests.jpg';
import engineerIcon from '../Components/Assets/engineer.jpg';

const SE_Home = () => {
    const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(path);
    };

    return (
        <div className="se-home">
            <div className="welcome-container">
                <h1>Welcome to your dashboard, A.B.C Perera</h1>
            </div>
            <div className="features-container">
                <div className="feature" onClick={() => handleClick('/login/supervising-engineers/assigned_engineers')}>
                    <img src={engineerIcon} alt="engineers" />
                    <h3>Assigned Engineers</h3>
                </div>
                <div className="feature" onClick={() => handleClick('/login/supervising-engineers/evaluations')}>
                    <img src={evaluateIcon} alt="Evaluate Engineers" />
                    <h3>Evaluations</h3>
                </div>
                <div className="feature" onClick={() => handleClick('/login/supervising-engineers/mark-allocations')}>
                    <img src={markAllocationIcon} alt="Mark Allocations" />
                    <h3>Mark Allocations</h3>
                </div>
                <div className="feature" onClick={() => handleClick('/login/supervising-engineers/trainings')}>
                    <img src={trainingsIcon} alt="Available Trainings" />
                    <h3>Available Trainings</h3>
                </div>
                <div className="feature" onClick={() => handleClick('/login/supervising-engineers/requests')}>
                    <img src={requestsIcon} alt="Requests" />
                    <h3>Requests & Feedbacks</h3>
                </div>
            </div>
            <div className="summary-section">
                <div className="summary-introduction">
                    <p>
                        Designed to help you effectively manage and monitor your team of engineers.
                        This dashboard serves as your central hub for overseeing key operations and tasks,
                        providing quick access to essential features.
                    </p>
                </div>
            </div>

        </div>
    );
};

export default SE_Home;
