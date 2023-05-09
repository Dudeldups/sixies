export default function Die(props) {
  let h;

  switch (props.remainingRounds) {
    case 0:
      h = 20;
      break;

    case 1:
      h = 35;
      break;

    case 2:
      h = 50;
      break;

    case 3:
      h = 65;
      break;

    case 4:
      h = 80;
      break;

    case 5:
      h = 95;
      break;

    case 6:
      h = 110;
      break;

    default:
      h = 120;
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
