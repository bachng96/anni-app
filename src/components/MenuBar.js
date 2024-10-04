// src/components/MenuBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa'; // Heart icon

const MenuBar = () => {
  return (
    <nav className="menu-bar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/tomm">Tomm<FaHeart /></Link></li>
        <li><Link to="/loit">Loit</Link></li>
      </ul>
    </nav>
  );
};

export default MenuBar;
