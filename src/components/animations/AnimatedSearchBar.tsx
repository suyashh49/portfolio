"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";

const roles = [
  "System Design",
  "Distributed Systems",
  "Generative AI",
];

const Typewriter = ({ words = roles, typingSpeed = 100, pause = 2000 }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];
    let timeout: any;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayedText(currentWord.slice(0, displayedText.length - 1));
      }, typingSpeed / 2);
    } else {
      timeout = setTimeout(() => {
        setDisplayedText(currentWord.slice(0, displayedText.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && displayedText === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting]);

  return (
    <span className="text-gray-800">
      {displayedText}
      <motion.span
        className="ml-1 text-yellow-400"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        |
      </motion.span>
    </span>
  );
};

const AnimatedSearchBar = () => {
  return (
    <div className="max-w-xl mx-auto py-2">
      <div className="flex items-center bg-white border border-gray-300 rounded-full shadow-md focus-within:ring-2 focus-within:ring-blue-500 transition-all px-4 py-2">
        <FiSearch className="text-gray-500" size={20} />
        <div className="ml-3 w-full text-base text-gray-700 truncate">
          <Typewriter />
        </div>
      </div>
    </div>
  );
};

export default AnimatedSearchBar;