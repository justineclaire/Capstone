import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import Logo from './Logo.png';
import { auth } from '../firebase';

export const getCurrentUserEmail = () => {
  const user = auth.currentUser;
  return user ? user.email : null;
};

export const signOut = () => {
    return auth.signOut();
};

export const isUserLoggedIn = () => {
const currentUser = auth.currentUser;
return currentUser !== null;
};
function Header() {
  const currentUserEmail = getCurrentUserEmail();

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div className="app-header">
      <Link to="/Login">
        <img id="header-logo" src={Logo} alt="Logo" />
      </Link>
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
