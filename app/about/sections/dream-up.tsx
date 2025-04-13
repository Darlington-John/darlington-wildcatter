"use client";
import * as motion from "motion/react-client";
import { useMainContext } from "~/app/context/context";
const DreamUp = () => {
  const { fillColor } = useMainContext();
  return (
    <section className="flex items-center justify-center  flex-col  pt-36  max-md:gap-5  px-5 h-auto  duration-300">
      <h1
        className="text-[20vw] thunder  uppercase text-center leading-[16vw]  "
        style={{ color: fillColor }}
      >
        <motion.span
          initial={{ opacity: 0, translateX: -200 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 100,
            damping: 10,
            delay: 0.5,
          }}
          className="inline-block"
        >
          dream
        </motion.span>{" "}
        <motion.span
          initial={{ opacity: 0, translateY: 200 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 100,
            damping: 10,
            delay: 0.7,
          }}
          className="inline-block"
        >
          up
        </motion.span>
        <br />{" "}
        <motion.span
          initial={{ opacity: 0, translateX: -200 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 100,
            damping: 10,
            delay: 0.9,
          }}
          className="inline-block"
        >
          drill
        </motion.span>{" "}
        <motion.span
          initial={{ opacity: 0, translateY: -200 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 100,
            damping: 10,
            delay: 1,
          }}
          className="inline-block"
        >
          down
        </motion.span>
      </h1>
      <motion.p
        className="text-lg uppercase gt-black   text-center leading-tight max-md:text-base max-sm:text-sm  max-2xs:text-xs"
        style={{ color: fillColor }}
        initial={{ opacity: 0, scale: 2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          type: "spring",
          stiffness: 100,
          damping: 10,
          delay: 1.2,
        }}
      >
        Wildcatter is a hybrid Creative Studio and Production Company
        <br className="max-md:hidden" /> inspired by the imaginative
        frontiersmen who detonated terrain,
        <br className="max-md:hidden" /> and convention, during America’s
        westward expansion.
      </motion.p>
    </section>
  );
};

export default DreamUp;
