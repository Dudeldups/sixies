import { useEffect, useState } from "react";
import Die from "../Components/Die.jsx";

export default function App() {
  const [sixies, setSixies] = useState(false);
  const [round, setRound] = useState(-1);
  const [dice, setDice] = useState(createAllDice());

  useEffect(() => {
    console.log("Dice changed: " + dice.map((x) => x.activeRounds));
    //check for win status (all dice held and all have the same number)

    // then set round to 0 for restart
  }, [dice]);

  useEffect(() => {
    console.log("Round changed to: " + round);
  }, [round]);

  function createAllDice() {
    let newDice = [];
    for (let i = 0; i < 6; i++) {
      newDice.push(createDie(i, 6));
    }
    return newDice;
  }

  function createDie(id, value) {
    value = value || Math.ceil(Math.random() * 6);
    return {
      id,
      value,
      isHeld: false,
      activeRounds: 0,
    };
  }

  function clickDie(die) {
    if (round === -1) {
      return;
    }
    setDice((prevDice) =>
      prevDice.map((cur) =>
        cur.id === die.id ? { ...die, isHeld: !die.isHeld } : cur
      )
    );
  }

  function rollDice() {
    setDice((prevDice) =>
      prevDice.map((cur) => {
        if (cur.activeRounds >= 6 || !cur.isHeld) {
          return createDie(cur.id);
        } else {
          return { ...cur, activeRounds: cur.activeRounds + 1 };
        }
      })
    );
    setRound((prev) => (prev === -1 ? 1 : prev + 1));
  }

  const diceElements = dice.map((die) => {
    return (
      <Die
        key={die.id}
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
      <button className="game-button" onClick={rollDice}>
        {round === -1 ? "Start" : round === 0 ? "Restart" : "Roll"}
      </button>
      <br />
      <p>Round: {round}</p>
    </div>
  );
}
