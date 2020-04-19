import React from 'react';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from './route/route'

function App() {
  return (
    <div className="App">
      <div >
        <Router>
            <Routes />
        </Router>
      </div>
    </div>
  );
}

export default App;