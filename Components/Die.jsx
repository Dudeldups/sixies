export default function Die(props) {
  const getBackgroundColor = () => {
    const values = [20, 35, 50, 65, 80, 95, 110];
    const index = Math.max(props.remainingRounds, 0);
    const h = values[index] || 125;

    return props.isHeld ? `hsl(${h}, 100%, 40%)` : "white";
  };

  const backgroundColor = getBackgroundColor();

  return (
    <div className="die" style={{ backgroundColor }} onClick={props.clickDie}>
      <p>{props.value}</p>
    </div>
  );
}
