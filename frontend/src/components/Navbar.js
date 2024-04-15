import React from 'react';
import { Link } from 'react-router-dom';
import './components css/Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <img src="SocNetLogo.png" alt="Logo"></img>
      <Link to="/">
        <h1>SocNet</h1>
      </Link>
      <div></div>
    </div>
  )
}

export default Navbar;
