export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "hsl(120, 100%, 40%)" : "white",
  };
  return (
    <div className="die" style={styles} onClick={props.clickDie}>
      {props.value}
    </div>
  );
}
