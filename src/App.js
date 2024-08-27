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
import Footer from "./Components/Footer/Footer.jsx";
import Topbar from './Components/TopBar/Topbar.jsx';
import MainLoginPage from './LoginSignin/MainLoginPage';
import RoleSelectionPage from './LoginSignin/RoleSelectionPage';
import HRLoginPage from './LoginSignin/HRLoginPage';
import EngineersLoginPage from './LoginSignin/EngineersLoginPage';
import SupervisingEngineersLoginPage from './LoginSignin/SupervisingEngineersLoginPage';
import Enghome from './Engineers/Enghome.jsx';
import { UserProvider, useUser } from './Components/Usercontext.jsx';
import HRnavBar from './Components/HRnavbar/HRnavbar.jsx';
import EngnavBar from './Components/Engnavbar/Engnavbar.jsx';
import Engprofile from './Engineers/Engprofile.jsx';
import Engtrainings from './Engineers/Engtrainings.jsx';


const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbarAndTopbar = [
    "/", 
    "/login", 
    "/login/hr", 
    "/login/engineers", 
    "/login/supervising-engineers"
  ].includes(location.pathname);

  const { user } = useUser();

  const renderNavBar = () => {
    if (hideNavbarAndTopbar) return null;
    
    switch(user?.role) {  
      case 'hr':
        return <HRnavBar />;
      case 'engineer':
        return <EngnavBar />;
      default:
        return <HRnavBar />;
    }
  };

  return (
    <>
      {renderNavBar()}
      {!hideNavbarAndTopbar && <Topbar />}
      {children}
      <Footer />
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
            </Routes>
          </Layout>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
