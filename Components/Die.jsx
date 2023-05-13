export default function Die(props) {
  const getBackgroundColor = () => {
    const values = [20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];
    const index = Math.max(props.remainingRounds, 0);
    const h = values[index] || 130;

    return props.isHeld ? `hsl(${h}, 100%, 40%)` : "white";
  };

  const backgroundColor = getBackgroundColor();

  return (
    <div className="die" style={{ backgroundColor }} onClick={props.clickDie}>
      <p>{props.value}</p>
      <br />
      <p>{props.remainingRounds}</p>
    </div>
  );
}
