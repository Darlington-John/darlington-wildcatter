"use client";
import { useScroll, useTransform } from "motion/react";
import * as motion from "motion/react-client";
import Image from "next/image";
import { useMainContext } from "~/app/context/context";
import catHead from "~/public/images/cat-head.svg";
import team from "~/public/images/wildcatterteam.jpg";
const OurStory = () => {
  const { fillColor } = useMainContext();
  const { scrollYProgress } = useScroll(); // Get scroll progress (0 to 1)
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -100], {
    clamp: true,
  });
  // const translateY = useTransform(scrollYProgress, [0, 1], [0, -800], {
  //   clamp: true,
  // });
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 180], {
    clamp: true,
  });
  return (
    <section className="flex flex-col gap-24 items-center justify-center py-20 px-5">
      <div className="relative ">
        <Image src={team} alt="" className="w-[60vw]  max-md:w-full" />
        <motion.h1
          className="text-[16vw]  uppercase thunder  absolute  bottom-0 leading-[.75] left-[-25%] inline-block duration-150  max-md:left-0 "
          style={{ rotate, color: fillColor }}
          transition={{
            type: "spring",
          }}
        >
          our story
        </motion.h1>
        <motion.div
          style={{ rotateY }}
          className="absolute right-[-10%] bottom-0 duration-300 rotate-[20deg]  "
        >
          <Image
            src={catHead}
            alt=""
            className="w-60  max-lg:w-40  max-xs:w-20  "
          />
        </motion.div>
      </div>
      <p
        className="text-lg uppercase gt-black   text-center leading-tight text-center w-[800px] max-md:text-base max-sm:text-sm  max-2xs:text-xs max-lg:w-auto"
        style={{ color: fillColor }}
      >
        Like them, we dream where others don’t. This exploratory nature pushes
        us into uncharted creative territory that moves the needle and hits
        paydirt for our clients. We’re a lean, mean collective designed to add
        content marketing firepower to brands, networks, agencies and
        celebrities. Our merged capabilities allow us to react faster, reach
        wider, think bolder and stretch budgets further.
      </p>
    </section>
  );
};

export default OurStory;
