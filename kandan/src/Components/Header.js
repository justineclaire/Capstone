import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import Logo from './Logo.png';
import { auth } from '../firebase';

function Header() {
  const [currentUserEmail, setCurrentUserEmail] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUserEmail(user.email);
      } else {
        setCurrentUserEmail(null);
      }
    });

    return () => {
      unsubscribe(); // Unsubscribe from the listener when the component unmounts
    };
  }, []);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div className="app-header">
      <Link to="/">
        <img id="header-logo" src={Logo} alt="Logo" />
      </Link>
      <hr class="solid"></hr>
      {currentUserEmail ? (
        <button className="profile-button" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <Link to="/Login">
          <button className="profile-button">Login</button>
        </Link>
      )}
    </div>
  );
}

export default Header;