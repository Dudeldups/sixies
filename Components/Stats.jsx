export default function Stats({ score, rolls }) {
  return (
    <div
      className="stats"
      style={{ visibility: rolls === -100 ? "hidden" : "visible" }}
    >
      <span className="test">Rolls: {rolls}</span>
      <span className="test">Score: {score}</span>
    </div>
  );
}
