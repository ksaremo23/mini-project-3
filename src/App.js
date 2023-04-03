import './App.css';
import About from './pages/About';
//import User from './pages/User';
import Drawer from './pages/Drawer';
import React, { useState } from "react";
//import ReactDOM from 'react-dom';
import Header from './pages/Header';
import SignIn from './pages/SignIn';
//import SignUp from './pages/SignUp';
//import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogin = () => {
    // code to handle successful login
    setIsDrawerOpen(true);
  };

  return (
    <div>
    <Header/>
    <About/>
      <button onClick={handleLogin}>Log In</button>
      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        {/* Drawer content */}
      </Drawer>
      <SignIn />
    </div>
  );
}

export default App