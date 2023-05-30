import React from 'react';
import { Link } from 'react-router-dom';
import Cake from '../Components/cake.png';
import Ring from '../Components/ring.png';
import Sleep from '../Components/sleep.png';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hpcontainer">
        <div className="tiles">
          <div className="tile">
            <Link to="/Flashcards" className="tile-link">
              <img src={Cake} alt="My Flashcards" />
              <h2>My Flashcards</h2>
            </Link>
          </div>
          <div className="tile">
            <Link to="/Translate" className="tile-link">
              <img src={Ring} alt="Translate" />
              <h2>Translate</h2>
            </Link>
          </div>
          <div className="tile">
            <Link to="/Newcard" className="tile-link">
              <img src={Sleep} alt="Create Flashcards" />
              <h2>Create Flashcards</h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
