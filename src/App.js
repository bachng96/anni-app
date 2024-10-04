// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuBar from './components/MenuBar';
import HomePage from './components/HomePage';
import TommPage from './components/TomPage';
import LoitPage from './components/LoitPage';
import HeartAnimation from './components/HeartAnimation';

function App() {
  return (
    <div className="App">
      <HeartAnimation /> {/* Heart animation as background */}
      <Router>
        <MenuBar />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tomm" element={<TommPage />} />
            <Route path="/loit" element={<LoitPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
