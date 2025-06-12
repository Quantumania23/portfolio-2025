import React from "react";
import { motion, useScroll } from "framer-motion";

const LiIcon = ({ reference }) => {
  const { scrollYProgress } = useScroll({
    target: reference,
    offset: ["center end", "center center"],
    layoutEffect: false,
  });

  return (
    <figure className="absolute left-0 stroke-icons-dark dark:stroke-icons-light">
      <svg className="-rotate-90" width="75" height="75" viewBox="0 0 100 100">
        <circle
          cx="75"
          cy="50"
          r="20"
          className="stroke-icons-primary dark:stroke-icons-primaryDark stroke-[5px] fill-none"
        />
        <motion.circle
          cx="75"
          cy="50"
          r="20"
          className="stroke-[5px] fill-icons-light dark:fill-icons-dark"
          style={{
            pathLength: scrollYProgress,
          }}
        />
        <circle
          cx="75"
          cy="50"
          r="10"
          className="stroke-1 fill-icons-primary dark:fill-icons-primaryDark animate-pulse"
        />
      </svg>
    </figure>
  );
};

export default LiIcon;