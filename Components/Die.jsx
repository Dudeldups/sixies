export default function Die(props) {
  let h;

  switch (props.remainingRounds) {
    case 0:
      h = 30;
      break;

    case 1:
      h = 45;
      break;

    case 2:
      h = 60;
      break;

    case 3:
      h = 75;
      break;

    case 4:
      h = 90;
      break;

    case 5:
      h = 105;
      break;

    default:
      h = 120;
      break;
  }

  const styles = {
    backgroundColor: props.isHeld ? `hsl(${h}, 100%, 40%)` : "white",
  };
  return (
    <div className="die" style={styles} onClick={props.clickDie}>
      {props.value}
    </div>
  );
}
