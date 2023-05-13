import { useEffect, useState } from "react";
import Help from "../Components/Help.jsx";
import Game from "../Components/Game.jsx";
import Title from "../Components/Title.jsx";

export default function App() {
  const [showHelp, setShowHelp] = useState(false);
  const [sixies, setSixies] = useState(false);
  const [score, setScore] = useState(0);
  const [rolls, setRolls] = useState(-100);
  const [dice, setDice] = useState(createAllDice());
  const amtHeld = dice.filter((d) => d.isHeld).length;
  const number = dice.find((d) => d.isHeld)?.value || 0;

  useEffect(() => {
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
            return {
              ...cur,
              remainingRounds: cur.remainingRounds - 1,
            };
          }
        })
      );
      setRolls((prev) => prev - 1);
    }
  }

  function clickDie(die) {
    if (
      sixies ||
      rolls < 0 ||
      (number && die.value !== number) ||
      (rolls === 0 && die.isHeld)
    ) {
      return;
    }
    setRolls((prev) => prev + (die.isHeld ? -1 : 1));
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
              remainingRounds: cur.remainingRounds + (die.isHeld ? -6 : 6),
            }
          : cur
      )
    );
  }

  function toggleHelp() {
    setShowHelp((prev) => !prev);
  }

  return (
    <>
      <Title />
      <main>
        <button className="help-btn" onClick={toggleHelp}>
          ?
        </button>
        {showHelp ? (
          <Help />
        ) : (
          <Game
            sixies={sixies}
            score={score}
            rolls={rolls}
            dice={dice}
            clickDie={clickDie}
            rollDice={rollDice}
          />
        )}
      </main>
    </>
  );
}
