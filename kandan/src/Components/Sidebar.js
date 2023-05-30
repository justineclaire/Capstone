import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Sidebar() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    return (
      <nav className={sidebar ? "sidebar active" : "sidebar"}>
        <button className="hamburger" type="button" onClick={showSidebar}>
          <div></div>
        </button>
        <ul onClick={showSidebar}>
          <li><Link to="">Home Page</Link></li>
          <li><Link to="/Login">Login or Signup</Link></li>
          <li><Link to="/Translate">Translate</Link></li>
          <li><Link to="/Flashcards">Flashcards</Link></li>
        </ul>
      </nav>
    );
  }
  
  export default Sidebar;


