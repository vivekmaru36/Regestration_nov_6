// import React, { Component } from 'react';
import RegistrationPage from './components/RegestrationPage';
import FourDigitNumberInput from './components/email_verification';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
// import { useNavigate } from 'react-router-dom';

function App(){
  return(
    <Router>    
      <Routes>
        <Route path="/" element={<RegistrationPage/>} />
        <Route path="/email-verification" element={<FourDigitNumberInput/>}/>
      </Routes>
  </Router>
  );
}

export default App; 