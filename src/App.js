import { useState } from 'react';

import './App.css';

const HIGH_SCORE_KEY = 'high_score';

function App() {
  const [highScore, setHighScore] = useState(localStorage.getItem(HIGH_SCORE_KEY) || 0);

  return (
    <div className="app">
      <div className="navbar">
        <div className="logo">
          21 Game
        </div>
        <div className="score">
          High Score: <span>{highScore}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
