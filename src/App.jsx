import { useState } from "react";
import Die from "../Components/Die.jsx";

export default function App() {
  const [dice, setDice] = useState(0);
  const [game, setGame] = useState({
    won: false,
    state: "Start",
    startTime: Date.now(),
  });

  return (
    <div className="container">
      <div className="dice-grid">
        <Die />
        <Die />
        <Die />
        <Die />
        <Die />
        <Die />
      </div>
      <button className="game-button">{game.state}</button>
    </div>
  );
}
