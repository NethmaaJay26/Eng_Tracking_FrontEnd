/*import './App.css';
import Footer from './Footer/footer';
import LoginSignin from './LoginSignin/MainLoginPage';

function App() {
  return (
    <div className="App">
      
      <Footer />
      <LoginSignin />
    </div>
  );
}

export default App;
*/

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLoginPage from './LoginSignin/MainLoginPage';
import RoleSelectionPage from './LoginSignin/RoleSelectionPage';
import HRLoginPage from './LoginSignin/HRLoginPage';
import EngineersLoginPage from './LoginSignin/EngineersLoginPage';
import SupervisingEngineersLoginPage from './LoginSignin/SupervisingEngineersLoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLoginPage />} />
        <Route path="/role-selection" element={<RoleSelectionPage />} />
        <Route path="/login/hr" element={<HRLoginPage />} />
        <Route path="/login/engineers" element={<EngineersLoginPage />} />
        <Route path="/login/supervising-engineers" element={<SupervisingEngineersLoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
