import Die from "../Components/Die.jsx";
import Stats from "../Components/Stats.jsx";

const Game = ({
  sixies,
  highscore,
  score,
  rolls,
  dice,
  clickDie,
  rollDice,
}) => {
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
    if (rolls === -100) {
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
    <>
      <Stats key="stats" highscore={highscore} score={score} rolls={rolls} />
      <div className="dice-grid">{diceElements}</div>
      <button className="game-button" onClick={rollDice}>
        {buttonText()}
      </button>
    </>
  );
};

export default Game;
