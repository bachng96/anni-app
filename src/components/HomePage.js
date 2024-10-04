// src/MainPage.js
import React, { useEffect, useState } from 'react';
import '../styles/HomePage.css';
import tomImg from '../assets/images/tom.jpg';
import loitImg from '../assets/images/loit.jpg';

const MainPage = () => {
  const yourDate = new Date("2023-10-07");
  const music = ['ido', 'noinaycoanh', 'nguoiamphu'];
  const [days, setDays] = useState(0);
  const [timeString, setTimeString] = useState('');
  const [musicSrc, setMusicSrc] = useState('');

  useEffect(() => {
    // Calculate days together
    const calculateDays = () => {
      const now = new Date();
      const dayCount = Math.floor((now - yourDate) / (1000 * 60 * 60 * 24));
      setDays(dayCount);
    };

    // Update the clock every second
    const updateClock = () => {
      const now = new Date();
      const hrs = (Math.floor((now - yourDate) / 1000 / 60 / 60) % 24);
      const min = (Math.floor((now - yourDate) / 1000 / 60) % 60);
      const sec = Math.floor((now - yourDate) / 1000 % 60);
      setTimeString(`${(hrs > 9) ? hrs : "0" + hrs}:${(min > 9) ? min : "0" + min}:${(sec > 9) ? sec : "0" + sec}`);
    };

    calculateDays();
    updateClock(); // Initial call to set timeString

    const timerId = setInterval(() => {
      updateClock(); // Update clock every second
    }, 1000);

    // Set music source randomly
    setMusicSrc(`music/${music[Math.floor(Math.random() * music.length)]}.mp3`);

    return () => clearInterval(timerId); // Cleanup interval on unmount
  }, [yourDate, music]);

  return (
    <div id="wrapper">
      <h1>LOVE DAYS</h1>
      <div id="clock-box">
        <div id="clock">
          <date>{days} DAYS</date>
          <time>{timeString}</time>
        </div>
      </div>
      <div id="info">
        <div className="one">
          <img src={loitImg} className="avt" alt="" />
          <p>Bách</p>
        </div>
        <div id="heart">
          ❤<anni>{(yourDate.getDate() > 9) ? yourDate.getDate() : "0" + yourDate.getDate()}-{(yourDate.getMonth() > 8) ? (yourDate.getMonth() + 1) : "0" + (yourDate.getMonth() + 1)}-{yourDate.getFullYear()}</anni>
        </div>
        <div className="two">
          <img src={tomImg} className="avt" alt="" />
          <p>Tom chiến tướng liên quân</p>
        </div>
      </div>
      <div id="music">
        <audio loop autoPlay controls>
          <source src={musicSrc} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
      <footer>Thank you for your love 💕</footer>
    </div>
  );
};

export default MainPage;
