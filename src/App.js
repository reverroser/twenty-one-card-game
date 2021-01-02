import { useEffect, useState } from 'react';

import './App.css';

const HIGH_SCORE_KEY = 'high_score';
const ACE_CARD_KEY = 'ACE';
const FACE_CARDS_KEYS = ['KING', 'QUEEN', 'JACK'];
const DECK_API_URL = 'https://deckofcardsapi.com/api/deck';

function App() {
  const [highScore, setHighScore] = useState(localStorage.getItem(HIGH_SCORE_KEY) || 0);
  const [cards, setCards] = useState([]);
  const [deckId, setDeckId] = useState();
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    fetch(`${DECK_API_URL}/new/`)
      .then((response) => response.json())
      .then(({ deck_id }) => setDeckId(deck_id));
  }, []);

  const handleDrawCard = async () => {
    // Re shuffle deck
    await fetch(`${DECK_API_URL}/${deckId}/shuffle`);

    // Get new card
    const response = await fetch(`${DECK_API_URL}/${deckId}/draw/?count=1`);
    const data = await response.json();
    const newCard = data?.cards?.[0];

    // Calculate score
    let cardScore = parseInt(newCard.value, 10);
    if (newCard.value === ACE_CARD_KEY) {
      cardScore = 11;
    } else if (FACE_CARDS_KEYS.includes(newCard.value)) {
      cardScore = 10;
    }

    setCards([
      ...cards,
      newCard,
    ]);

    setCurrentScore(currentScore + cardScore);
  }

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
      <div className="footer">
        <div className="current-score">
          Current Score: <span>{currentScore}</span>
        </div>
        <button className="btn btn-primary" onClick={handleDrawCard}>Draw card</button>
      </div>
    </div>
  );
}

export default App;
