import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Translate from "./Pages/Translate";
import Flashcards from "./Pages/Flashcards";
import Sidebar from "./Components/Sidebar";
import FlashcardList from './Pages/FlashcardList';

function App() {
  const [flashcards, setFlashcards] = useState(TEST_FLASHCARDS)
  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/Translate" exact component={Translate} />
          <Route path="/Flashcards" component={Flashcards} />
        </Routes>
      </Router>
      <FlashcardList flashcards={flashcards} />
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

const TEST_FLASHCARDS = [
  {
    id: 1,
    question: 'What is the name of the leader of TWICE',
    answer: 'Jihyo',
    options: ['Mina', 'Momo', 'Jihyo', 'Sana']
  },
  {
    id: 2,
    question: 'What is the meaning of the word 막내 (maknae)',
    answer: 'Youngest',
    options: ['Oldest', 'Aquaintance', 'Friend', 'Youngest']
  },
  {
    id: 3,
    question: 'What is the birth day of Jin from BTS',
    answer: 'Jihyo',
    options: ['24', '9', '4', '8']
  }
]

export default App;
