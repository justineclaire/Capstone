import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Translate from "./Pages/Translate";
import Login from "./Pages/Login";
import Flashcards from "./Pages/Flashcards";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Newcard from "./Pages/Newcard";
import HomePage from "./Pages/Homepage";
import MyCards from "./Pages/MyCards"
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <>
      <Router>
        <Header />
        <Sidebar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/App" element={<App />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Translate" element={<Translate />} />
          <Route path="/Flashcards" element={<Flashcards />} />
          <Route path="/Newcard" element={<Newcard />} />
          <Route path="/MyCards" element={<MyCards />} />
        </Routes>
        <Footer />
      </Router>
    </>
 
  ); 
}

export default App;