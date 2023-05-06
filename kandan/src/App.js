import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Translate from "./Pages/Translate";
import Login from "./Pages/Login";
import Flashcards from "./Pages/Flashcards";
import Sidebar from "./Components/Sidebar";


function App() {
  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Translate" element={<Translate />} />
          <Route path="/Flashcards" element={<Flashcards />} />
        </Routes>
      </Router>
    </>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  ); 
}

export default App;