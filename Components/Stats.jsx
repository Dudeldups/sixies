export default function Stats({ highscore, score, rolls }) {
  return (
    <div
      className="stats"
      style={{ visibility: rolls === -100 ? "hidden" : "visible" }}
    >
      <p className="right">Highscore: {highscore}</p>
      <div className="linebreak"></div>
      <p>Rolls: {rolls}</p>
      <p className="right">Score: {score}</p>
    </div>
  );
}
