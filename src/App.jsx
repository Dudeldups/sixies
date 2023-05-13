import { useEffect, useState, useRef } from "react";
import Die from "../Components/Die.jsx";

export default function App() {
  const [sixies, setSixies] = useState(false);
  const [score, setScore] = useState(0);
  const [rolls, setRolls] = useState(null);
  const [dice, setDice] = useState(createAllDice());
  const amtHeld = dice.filter((d) => d.isHeld).length;
  const number = dice.find((d) => d.isHeld)?.value || 0;

  useEffect(() => {
    if (rolls <= 0) {
      setDice((prevDice) =>
        prevDice.map((d) => ({ ...d, remainingRounds: 0 }))
      );
    }
  }, [rolls]);

  useEffect(() => {
    console.log("Amount held: " + amtHeld);
    if (amtHeld === 6 && !sixies) {
      setSixies(true);
      setScore((prev) => prev + 1);
      setRolls((prev) => prev + number);
      setDice((prevDice) =>
        prevDice.map((d) => ({ ...d, remainingRounds: 20 }))
      );
    }
  }, [dice]);

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
      remainingRounds: 6,
    };
  }

  function clickDie(die) {
    if (sixies || rolls === null || (number && die.value !== number)) {
      return;
    }
    const heldChange = die.isHeld ? -1 : 1;
    setRolls((prev) => prev + heldChange);
    setDice((prevDice) =>
      prevDice.map((cur) =>
        cur.id === die.id
          ? {
              ...cur,
              isHeld: !cur.isHeld,
            }
          : cur.value === number && cur.isHeld
          ? {
              ...cur,
              remainingRounds: cur.remainingRounds + (die.isHeld ? -1 : 6),
            }
          : cur
      )
    );
  }

  function rollDice() {
    if (sixies || rolls <= 0) {
      sixies && setSixies(false);
      if (rolls <= 0) {
        setScore(0);
        setRolls(6);
      }
      setDice((prevDice) => prevDice.map((d) => createDie(d.id)));
    } else {
      setDice((prevDice) =>
        prevDice.map((cur) => {
          if (cur.remainingRounds < 1 || !cur.isHeld) {
            return createDie(cur.id);
          } else {
            return { ...cur, remainingRounds: cur.remainingRounds - 1 };
          }
        })
      );
      setRolls((prev) => (prev === null ? 6 : prev - 1));
    }
  }

  const diceElements = dice.map((die) => {
    return (
      <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        remainingRounds={die.remainingRounds}
        clickDie={() => clickDie(die)}
      />
    );
  });

  const buttonText = () => {
    if (rolls === null) {
      return "Start";
    } else if (rolls <= 0) {
      return "Restart";
    } else if (sixies) {
      return "Continue";
    } else {
      return "Roll";
    }
  };

  return (
    <div className="container">
      <div className="dice-grid">{diceElements}</div>
      <button className="game-button" onClick={rollDice}>
        {buttonText()}
      </button>
      <br />
      <p>Rolls: {rolls}</p>
      <p>Score: {score}</p>
      <p>Number: {number}</p>
      <p>AmtHeld: {amtHeld}</p>
    </div>
  );
}
