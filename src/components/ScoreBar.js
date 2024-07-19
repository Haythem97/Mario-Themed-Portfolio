import React from 'react';
import './ScoreBar.css';

const ScoreBar = () => {
  return (
    <div className="scorebar" style={{ position: 'relative', height: '130px' }}>
      <p>
        <span className="topline-mario">Mario Portfolio</span>
        <span className="topline-world">WORLD</span>
        <span className="topline-time">TIME</span>
        <span className="bottomline-score">OOOOOO1</span>
        <span className="bottomline-coin">
          <img src="https://raw.githubusercontent.com/LantareCode/random-this-and-thats/master/CSS/SuperMario-Animation/images/Coin.gif" height="40px" alt="Coin" /> x OO
        </span>
        <span className="bottomline-world">1 - 1</span>
        <span className="bottomline-time">111</span>
      </p>
    </div>
  );
};

export default ScoreBar;
