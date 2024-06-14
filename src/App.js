import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Engineers from "./Pages/Engineers.jsx"
import SupervisingEngineers from "./Pages/SupervisingEngineers.jsx"
import Home from "./Pages/Home.jsx"
import LoginSignin from "./Pages/LoginSignin.jsx"
import Trainings from "./Pages/Trainings.jsx"
import Summary from "./Pages/Summary.jsx"
import Evaluations from "./Pages/Evaluations.jsx"



function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Navbar />

        <Routes>

          <Route path='/' element = {<Home/>}/>
          <Route path='/engineers' element = {<Engineers/>}/>
          <Route path='/supervisingengineers' element = {<SupervisingEngineers/>}/>
          <Route path='/trainings' element = {<Trainings/>}/>
          <Route path='/evaluations' element = {<Evaluations/>}/>
          <Route path='/summary' element = {<Summary/>}/>
          <Route path='/loginsignin' element = {<LoginSignin/>}/>


        </Routes>
      
      
      </BrowserRouter>

      

      
    </div>
  );
}

export default App;