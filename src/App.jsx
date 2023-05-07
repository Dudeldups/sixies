import { useState } from "react";
import Die from "../Components/Die.jsx";

export default function App() {
  const [dice, setDice] = useState(startGame());
  const [game, setGame] = useState({
    won: false,
    state: "Start",
    startTime: Date.now(),
  });

  function startGame() {
    let newDice = [];
    for (let i = 0; i < 6; i++) {
      newDice.push(createDie(i));
    }
    return newDice;
  }

  function createDie(id) {
    return {
      id,
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      activeRounds: 0,
    };
  }

  function clickDie(die) {
    setDice((prevDice) =>
      prevDice.map((cur) =>
        cur.id === die.id ? { ...die, isHeld: !die.isHeld } : cur
      )
    );
  }

  const diceElements = dice.map((die) => {
    return (
      <Die
        key={die.id}
        id={die.id}
        value={die.value}
        isHeld={die.isHeld}
        activeRounds={die.activeRounds}
        clickDie={() => clickDie(die)}
      />
    );
  });

  return (
    <div className="container">
      <div className="dice-grid">{diceElements}</div>
      <button className="game-button">{game.state}</button>
    </div>
  );
}
