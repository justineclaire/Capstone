import React from 'react';
import { Link } from "react-router-dom";
import "../App.css";
import Logo from './Logo.png';

console.log(Logo);

function Header () {
    return (
        <div className="app-header">
            <Link to="/Login"><img id="header-logo" src={Logo}></img></Link>
              
        </div>

    )
    
}

export default Header;