import React, { useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";

const RotatingText = ({ text = "✦ EXPLORE ✦ FURTHER ", radius = 35 }) => {
  const characters = text.split("");
  const charCount = characters.length;
  const angleStep = 360 / charCount;

  const rotate = useMotionValue(0);
  const angleRef = useRef(0);
  const speedRef = useRef(36);

  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    let rafId: number;

    const loop = (time: number) => {
      if (lastTimeRef.current !== null) {
        const delta = (time - lastTimeRef.current) / 1000;
        angleRef.current = (angleRef.current + speedRef.current * delta) % 360;
        rotate.set(angleRef.current);
      }
      lastTimeRef.current = time;
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handleHover = (faster: boolean) => {
    speedRef.current = faster ? 180 : 36;
  };

  return (
    <div
      style={{
        position: "relative",
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
      }}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <motion.div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          rotate: rotate,
        }}
      >
        {characters.map((char, i) => {
          const angle = i * angleStep;
          const x = radius + radius * Math.cos((angle - 90) * (Math.PI / 180));
          const y = radius + radius * Math.sin((angle - 90) * (Math.PI / 180));

          return (
            <span
              key={i}
              style={{
                position: "absolute",
                left: `${x}px`,
                top: `${y}px`,
                transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                transformOrigin: "center",
                color: "#aaa",
                fontSize: "10px",
                fontFamily: "sans-serif",
                letterSpacing: "2px",
              }}
            >
              {char}
            </span>
          );
        })}
      </motion.div>

      {/* Center Arrow */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          color: "#f97316",
          fontSize: "20px",
        }}
      >
        ↓
      </div>
    </div>
  );
};

export default RotatingText;