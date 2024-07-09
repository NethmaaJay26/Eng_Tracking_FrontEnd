import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Engineers from "./Pages/Engineers.jsx"
import SupervisingEngineers from "./Pages/SupervisingEngineers.jsx"
import LoginSignin from "./Pages/LoginSignin.jsx"
import Trainings from "./Pages/Trainings.jsx"
import Reports from "./Pages/Reports.jsx"
import Evaluations from "./Pages/Evaluations.jsx"
import Home from "./Pages/Home.jsx"
import Footer from "./Components/Footer/Footer.jsx"
import Topbar from './Components/TopBar/Topbar.jsx';



function App() {
  return (
    <div className="App">

      <BrowserRouter>

        <Topbar/>
        <Navbar />

        <Routes>

          <Route path='/' element = {<Home/>}/>
          <Route path='/engineers' element = {<Engineers/>}/>
          <Route path='/supervisingengineers' element = {<SupervisingEngineers/>}/>
          <Route path='/trainings' element = {<Trainings/>}/>
          <Route path='/evaluations' element = {<Evaluations/>}/>
          <Route path='/reports' element = {<Reports/>}/>
          <Route path='/loginsignin' element = {<LoginSignin/>}/>


        </Routes>
      
      <Footer/>
      </BrowserRouter>

      

      
    </div>
  );
}

export default App;