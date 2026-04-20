import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import exploring from "../../assets/images/Exploring.png";
import beach from "../../assets/images/Beach.png";
import nature from "../../assets/images/Nature.png";
import degree from "../../assets/images/Degree.png";
import corporate from "../../assets/images/Corporate.png";
import music from "../../assets/images/Music.png";




import Image from "next/image";
import { useState } from "react";

const images = [
  { src: exploring, title: "Exploring ⛰️" },
  { src: degree, title: "Degree 🎓" },
  // { src: microWritting, title: "Cooking 👨‍🍳" },
  // { src: microWritting, title: "Micro writting ✍️" },
  { src: music, title: "Music 🎧" },
  { src: corporate, title: "Corporate 💼" },
  { src: beach, title: "Beach 🏖️" },
  { src: nature, title: "Nature 🏕️" },
];

export default function ImageSlider() {
  const repeatedImages = [...images, ...images, ...images];
  const x = useMotionValue(0);
  const [speed, setSpeed] = useState(40);

  const imageWidth = 220 + 48;
  const singleSetWidth = images.length * imageWidth;

  useAnimationFrame((t, delta) => {
    const moveBy = (speed * delta) / 1000;
    let newX = x.get() - moveBy;

    if (newX <= -singleSetWidth) {
      newX = newX + singleSetWidth;
    }

    x.set(newX);
  });

  return (
    <div className="relative overflow-hidden py-20">
      <motion.div
        style={{ x }}
        className="flex gap-12 max-w-screen"
      >
        {repeatedImages.map((item, idx) => (
          <motion.div
            key={idx}
            className="min-w-[220px] rounded-2xl shadow-xl cursor-pointer bg-white p-4 flex -rotate-4 flex-col items-center"
            whileHover={{ scale: 1.1, y: -8, rotate: -10 }}
            onHoverStart={() => setSpeed(20)}
            onHoverEnd={() => setSpeed(40)}
            transition={{ type: "spring" }}
          >
            <Image
              src={item.src}
              alt={item.title}
              width={440}
              height={520}
              quality={95}
              className="w-full h-60 rounded-xl object-cover"
              priority={idx < images.length}
              sizes="(max-width: 768px) 220px, 220px"
            />
            <h1 className="mt-3 text-lg font-semibold text-gray-800 text-center">
              {item.title}
            </h1>
          </motion.div>
        ))}
      </motion.div>

      <div className="pointer-events-none absolute inset-0" />
    </div>
  );
}
