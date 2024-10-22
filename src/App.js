import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Engineers from "./Pages/Engineers.jsx";
import SupervisingEngineers from "./Pages/SupervisingEngineers.jsx";
import Trainings from "./Pages/Trainings.jsx";
import Reports from "./Pages/Reports.jsx";
import Summary from './Pages/Summary';
import Evaluations from "./Pages/Evaluations.jsx";
import Home from "./Pages/Home.jsx";

// import Navbar from './Components/Navbar/Navbar';
import Footer from "./Components/Footer/Footer.jsx";
import Topbar from './Components/TopBar/Topbar.jsx';

import MainLoginPage from './LoginSignin/MainLoginPage';
import RoleSelectionPage from './LoginSignin/SingleLoginPage';
//RoleSelectionPage
import HRLoginPage from './LoginSignin/HRLoginPage';
import EngineersLoginPage from './LoginSignin/EngineersLoginPage';
import SupervisingEngineersLoginPage from './LoginSignin/SupervisingEngineersLoginPage';
import Enghome from './Engineers/Enghome.jsx';
import { UserProvider, useUser } from './Components/Usercontext.jsx';
import HRnavBar from './Components/HRnavbar/HRnavbar.jsx';
import EngnavBar from './Components/Engnavbar/Engnavbar.jsx';
import Engprofile from './Engineers/Engprofile.jsx';
import Engtrainings from './Engineers/Engtrainings.jsx';

import SE_Home from './Supervising_engineer/SE_Home';
import Navbar_SE from './Components/Navbar_SE/Navbar';
import How_Eve from './Supervising_engineer/SE_HowEvaluate';
import Assigned_Eng from './Supervising_engineer/assigned_engineer';

import MarkAllocation from './Supervising_engineer/mark_allocation.jsx';

import EngineerDetails from './Supervising_engineer/engineerDetails.jsx';



const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbarAndTopbar = [
    "/", 
    "/login", 
    "/login/hr", 
    "/login/engineers", 
    "/login/supervising-engineers"
  ].includes(location.pathname);

  const hideFooter = [
    "/",  // MainLoginPage
    "/login"  // SingleLoginPage
  ].includes(location.pathname);
  
  const isSupervisingEngineerPage = [
    "/login/supervising-engineers/home",
    "/login/supervising-engineers/assigned_engineers",
    "/login/supervising-engineers/trainings",
    '/login/supervising-engineers/reports',
    '/login/supervising-engineers/evaluations',
    "/login/supervising-engineers/mark-allocations",
    '/login/supervising-engineers/requests',
    "/engineer/:engineerId",
    "/login/supervising-engineers/mark-allocations/weight", // Include this to handle dynamic routing for engineer details
  ].includes(location.pathname);

  const { user } = useUser();

  const renderNavBar = () => {
    if (hideNavbarAndTopbar) return null;
  
    const role = localStorage.getItem('role');  // Fetch role from localStorage for persistent state
  
    if (role === 'hr') {
      return <HRnavBar />;
    } else if (role === 'engineer') {
      return <EngnavBar />;
    } else if (isSupervisingEngineerPage) {
      return <Navbar_SE />;
    } else {
      return null;  // Handle default case if role is not set
    }
  };
  
  return (
    <>
      {renderNavBar()}
      {!hideNavbarAndTopbar && <Topbar />}
      {!hideNavbarAndTopbar && !isSupervisingEngineerPage && <Topbar />}
      {!hideNavbarAndTopbar && isSupervisingEngineerPage && <Topbar />}
      {!hideNavbarAndTopbar && isSupervisingEngineerPage && <Navbar_SE />}
      {children}
      {!hideFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path='/home' element={<Home />} />
              <Route path='/engineers' element={<Engineers />} />
              <Route path='/supervisingengineers' element={<SupervisingEngineers />} />
              <Route path='/trainings' element={<Trainings />} />
              <Route path='/reports' element={<Reports />} />
              <Route path='/evaluations' element={<Evaluations />} />
              <Route path='/summary' element={<Summary />} />
              <Route path="/" element={<MainLoginPage />} />
              <Route path="/login" element={<RoleSelectionPage />} />
              <Route path="/login/hr" element={<HRLoginPage />} />
              <Route path="/login/engineers" element={<EngineersLoginPage />} />
              <Route path="/login/supervising-engineers" element={<SupervisingEngineersLoginPage />} />
              <Route path='/guest' element={<Home />} />
              <Route path='/login/engineers/Enghome' element={<Enghome />} />
              <Route path='/Enghome' element={<Enghome />} />
              <Route path='/Engprofile' element={<Engprofile />} />
              <Route path='/Engtrainings' element={<Engtrainings />} />
              <Route path="/login/supervising-engineers/home" element={<SE_Home />} />
              <Route path="/login/supervising-engineers/mark-allocations" element={<How_Eve />} />
              <Route path="/login/supervising-engineers/assigned_engineers" element={<Assigned_Eng />} />
              <Route path="/login/supervising-engineers/mark-allocations/weight" element={<MarkAllocation />} />
              <Route path="/engineer/:engineerId" element={<EngineerDetails />} /> {/* Engineer Details page */}
            </Routes>
          </Layout>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
