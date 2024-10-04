// src/components/MenuBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa'; // Heart icon
import "../styles/MenuBar.css";

function MenuBar() {
    return (
      <header className="header">
          <nav className="menu">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/tomm">Tom<FaHeart className="heart-icon"></FaHeart></Link></li>
              <li><Link to="/loit">Loit</Link></li>
            </ul>
          </nav>
      </header>
    );
  }

export default MenuBar;
