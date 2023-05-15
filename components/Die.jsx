import { motion } from "framer-motion";

export default function Die(props) {
  const getBackgroundColor = () => {
    const values = [20, 35, 50, 65, 80, 95, 110];
    const index = Math.max(props.remainingRounds, 0);
    const h = values[index] || 125;

    return props.isHeld ? `hsl(${h}, 100%, 40%)` : "white";
  };

  const backgroundColor = getBackgroundColor();
  const randNum = (min, max) => Math.round(Math.random() * (max - min) + min);

  return (
    <motion.div
      className="die"
      style={{ backgroundColor }}
      onClick={props.clickDie}
      animate={
        props.animate && {
          scale: [1, 0.6, 1],
          rotate: [randNum(-360, 360), randNum(-360, 360), 0],
        }
      }
      transition={{ duration: 0.2 }}
    >
      {props.value}
    </motion.div>
  );
}
