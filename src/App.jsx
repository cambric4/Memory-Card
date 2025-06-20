import React, { useEffect, useState } from "react";
import Scoreboard from "./components/Scoreboard.jsx";
import Card from "./components/Card.jsx";
import { fetchPokemon } from "./utils/api.jsx";
import "./App.css";

export default function App() {
    const [cards, setCards] = useState([]);
    const [clicked, setClicked] = useState([]);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [hasWon, setHasWon] = useState(false); // 👈 new state

    useEffect(() => {
        getCards();
    }, []);

    async function getCards() {
        const data = await fetchPokemon(12);
        setCards(shuffle(data));
    }

    const shuffle = (array) => {
        return [...array].sort(() => 0.5 - Math.random());
    };

    const handleCardClick = (name) => {
        if (clicked.includes(name)) {
            setScore(0);
            setClicked([]);
            setHasWon(false);
        } else {
            const newClicked = [...clicked, name];
            const newScore = score + 1;

            setClicked(newClicked);
            setScore(newScore);
            setBestScore(Math.max(bestScore, newScore));
            setCards(shuffle(cards));

            if (newClicked.length === 12) {
                setHasWon(true); // 🎉 You win!
            }
        }
    };

    const restartGame = () => {
        setScore(0);
        setClicked([]);
        setHasWon(false);
        getCards();
    };

    return (
        <div className="App">
            <h1 className="title">Pokemon Memory Game</h1>
            <h2 className="desc">Remember which card you have not picked yet!</h2>
            <Scoreboard score={score} best={bestScore} />

            {hasWon && (
                <div className="victory-message">
                    <h2>🎉 You won! Perfect memory!</h2>
                    <button onClick={restartGame}>Play Again</button>
                </div>
            )}

            <div className="card-grid">
                {cards.map((card) => (
                    <Card
                        key={card.name}
                        name={card.name}
                        image={card.image}
                        onClick={() => handleCardClick(card.name)}
                    />
                ))}
            </div>
        </div>
    );
}
