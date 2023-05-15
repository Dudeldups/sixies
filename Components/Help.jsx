const Help = () => {
  return (
    <div className="help">
      <h2>Gameplay</h2>
      <br />
      <ul>
        <li>
          Collect six dice with the same value to advance to the next round.
        </li>
        <li>
          On each roll, you can select any number of dice with the same value to
          hold.
        </li>
        <li>
          Each selected die gives you one additional roll and extends the
          lifespan of the other dice that you hold.
        </li>
        <li>When the lifespan of a die expires, it will be rerolled.</li>
        <li>
          If you successfully collect six dice with the same value, you advance
          to the next round, and your score increases by 1. You also earn bonus
          rolls according to the number shown on the collected dice.
        </li>
      </ul>
    </div>
  );
};

export default Help;
