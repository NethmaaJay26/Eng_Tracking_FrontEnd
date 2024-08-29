import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import Topbar from './Components/TopBar/Topbar';
import Footer from './Components/Footer/Footer';

import Engineers from "./Pages/Engineers";
import SupervisingEngineers from "./Pages/SupervisingEngineers";
import Trainings from "./Pages/Trainings";
import Reports from "./Pages/Reports";
import Evaluations from "./Pages/Evaluations";
import Home from "./Pages/Home";
import Summary from './Pages/Summary';

import MainLoginPage from './LoginSignin/MainLoginPage';
import RoleSelectionPage from './LoginSignin/RoleSelectionPage';
import HRLoginPage from './LoginSignin/HRLoginPage';
import EngineersLoginPage from './LoginSignin/EngineersLoginPage';
import SupervisingEngineersLoginPage from './LoginSignin/SupervisingEngineersLoginPage';
import SE_Home from './Supervising_engineer/SE_Home';
import Navbar_SE from './Components/Navbar_SE/Navbar';
import How_Eve from './Supervising_engineer/SE_HowEvaluate';
import Assigned_Eng from './Supervising_engineer/assigned_engineer';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbarAndTopbar = [
    "/", 
    "/login", 
    "/login/hr", 
    "/login/engineers", 
    "/login/supervising-engineers"
  ].includes(location.pathname);

  const isSupervisingEngineerPage = [
    "/login/supervising-engineers/home",
    "/login/supervising-engineers/assigned_engineers",
    "/login/supervising-engineers/trainings",
    '/login/supervising-engineers/evaluations',
    "/login/supervising-engineers/mark-allocations",
    '/login/supervising-engineers/requests'
    // Add more SE-specific routes here
  ].includes(location.pathname);

  return (
    <>
      {!hideNavbarAndTopbar && !isSupervisingEngineerPage && <Topbar />}
      {!hideNavbarAndTopbar && !isSupervisingEngineerPage && <Navbar />}
      {!hideNavbarAndTopbar && isSupervisingEngineerPage && <Topbar />}
      {!hideNavbarAndTopbar && isSupervisingEngineerPage && <Navbar_SE />}
      {children}
      <Footer />
    </>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>

            <Route path='/home' element={<Home />} />
            <Route path='/engineers' element={<Engineers />} />
            <Route path='/supervisingengineers' element={<SupervisingEngineers />} />
            <Route path='/trainings' element={<Trainings />} />
            <Route path='/evaluations' element={<Evaluations />} />
            <Route path='/summary' element={<Summary />} />
            <Route path="/" element={<MainLoginPage />} />
            <Route path="/login" element={<RoleSelectionPage />} />
            <Route path="/login/hr" element={<HRLoginPage />} />
            <Route path="/login/engineers" element={<EngineersLoginPage />} />
            <Route path="/login/supervising-engineers" element={<SupervisingEngineersLoginPage />} />
            <Route path="/login/supervising-engineers/home" element={<SE_Home />} />
            <Route path="/login/supervising-engineers/mark-allocations" element={<How_Eve />} />
            <Route path="/login/supervising-engineers/assigned_engineers" element={<Assigned_Eng />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
