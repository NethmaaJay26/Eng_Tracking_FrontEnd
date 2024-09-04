import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignin.css';
import { useUser } from '../Components/Usercontext'; 

export default function RoleSelectionPage() {
  const navigate = useNavigate();
  const { setUser } = useUser(); 

  const handleRoleSelection = (role) => {
    setUser({ role }); // Set the selected role in the context

    switch(role) {
      case 'hr':
        navigate('/login/hr');
        break;
      case 'engineer':
        navigate('/login/engineers');
        break;
      case 'supervising-engineer':
        navigate('/login/supervising-engineers');
        break;
      default:
        navigate('/');
        break;
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Select Your Role</h1>
        <div className="loginsignup-fields">
          <button onClick={() => handleRoleSelection('hr')}>HR</button>
          <button onClick={() => handleRoleSelection('engineer')}>Engineers</button>
          <button onClick={() => handleRoleSelection('supervising-engineer')}>Supervising Engineers</button>
          <button onClick={() => navigate('/')}>Back</button>
        </div>
      </div>
    </div>
  );
}
