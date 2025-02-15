import { motion } from "framer-motion";

const AnimatedBeam = () => {
  return (
    <motion.div
      className="w-[1px] bg-green-400 absolute ml-[0.57rem]"
      initial={{ height: 0, opacity: 1 }}
      animate={{ height: "100%", opacity: 0 }}
      transition={{ duration: 5, ease: "linear", repeat: Infinity, repeatDelay: 5 }}
      onUpdate={(latest) => {
        if (latest.height === "100%") {
          // Reset instantly for a seamless restart
          latest.height = "0%";
        }
      }}
    />
  );
};

export default AnimatedBeam;
