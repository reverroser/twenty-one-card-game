import { useEffect, useState } from 'react';

import './App.css';

const HIGH_SCORE_KEY = 'high_score';

const DECK_API_URL = 'https://deckofcardsapi.com/api/deck';

function App() {
  const [highScore, setHighScore] = useState(localStorage.getItem(HIGH_SCORE_KEY) || 0);
  const [cards, setCards] = useState([]);
  const [deckId, setDeckId] = useState();

  useEffect(() => {
    fetch(`${DECK_API_URL}/new/`)
      .then((response) => response.json())
      .then(({ deck_id }) => setDeckId(deck_id));
  }, []);

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
      <div className="gameArea">
        {cards.map((card, i) => <img key={i} src={card.image} alt={card.code} />)}
      </div>
    </div>
  );
}

export default App;
