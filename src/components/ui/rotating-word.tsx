import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = { words: string[]; interval?: number; };

export default function RotatingWord({ words, interval = 2200 }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [interval, words.length]);

  const word = words[index];

  return (
    <span className="relative inline-block align-baseline">
      <AnimatePresence mode="wait">
        <motion.span
          key={word}
          initial={{ y: "40%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-40%", opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="bg-gradient-to-r from-[#7B61FF] to-[#00E6A8] bg-clip-text text-transparent"
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
