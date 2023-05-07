export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "green" : "white",
  };
  return (
    <div className="die" style={styles} onClick={props.clickDie}>
      {props.value}
    </div>
  );
}
