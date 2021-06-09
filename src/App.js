import React, { useState } from 'react';
//import axios from 'axios';
import './App.css';

import Dashboard from './components/Dashboard';
import LoginScreen from './components/LoginScreen';


function App() {

  //  App States
  //  (https://serverless-stack.com/chapters/load-the-state-from-the-session.html)
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  return (
    isAuthenticated ? ( <Dashboard></Dashboard> ) : ( <LoginScreen></LoginScreen> )
  )
  
}

export default App;
