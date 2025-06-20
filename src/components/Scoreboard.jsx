import React from "react";

export default function ScoreBoard({score, best}) {
    return (
        <div className="scoreboard">
            <p>Score: {score}</p>
            <p>Best Score: {best}</p>
        </div>
    );
}