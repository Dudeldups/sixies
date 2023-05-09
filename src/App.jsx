import { useEffect, useState } from "react";
import Die from "../Components/Die.jsx";

export default function App() {
  const [score, setScore] = useState(0);
  const [sixies, setSixies] = useState(false);
  const [rolls, setRolls] = useState(-1);
  const [number, setNumber] = useState(0);
  const [dice, setDice] = useState(createAllDice());

  useEffect(() => {
    const amtHeld = dice.filter((d) => d.isHeld).length;
    !amtHeld && number && setNumber(0);
    if (amtHeld === 6 && !sixies) {
      setSixies(true);
      setScore((prev) => prev + 1);
      setRolls((prev) => prev + 10);
      setDice((prevDice) =>
        prevDice.map((d) => ({ ...d, remainingRounds: 6 }))
      );
    }
  }, [dice]);

  useEffect(() => {}, [sixies]);

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
      remainingRounds: 10,
    };
  }

  function clickDie(die) {
    if (sixies || rolls === -1 || (number && die.value !== number)) {
      return;
    }
    if (die.isHeld && dice.filter((d) => d.isHeld).length === 1) {
      setNumber(0);
    } else if (!number) {
      setNumber(die.value);
    }
    setDice((prevDice) =>
      prevDice.map((cur) =>
        cur.id === die.id ? { ...cur, isHeld: !cur.isHeld } : cur
      )
    );
  }

  function rollDice() {
    if (sixies) {
      setSixies(false);
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
      setRolls((prev) => (prev < 1 ? 6 : prev - 1));
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
    if (rolls === -1) {
      return "Start";
    } else if (rolls === 0) {
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
    </div>
  );
}
