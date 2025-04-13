import { useMainContext } from "~/app/context/context";
import * as motion from "motion/react-client";
import { useScroll, useTransform } from "motion/react";
const BrandedContent = () => {
  const { fillColor, bgColor } = useMainContext();
  const { scrollYProgress } = useScroll(); // Get scroll progress (0 to 1)
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -100], {
    clamp: true,
  });
  const rotateDown = useTransform(scrollYProgress, [0, 1], [0, 100], {
    clamp: true,
  });
  return (
    <section className="flex flex-col gap-8 ">
      <div
        className="min-h-screen flex items-end justify-end flex-col gap-16  text-[20vw] text-black duration-300 thunder uppercase leading-[0.75]  max-lg:min-h-auto max-lg:pt-40 max-lg:gap-4"
        style={{ backgroundColor: bgColor, color: fillColor }}
      >
        <motion.h1
          className="w-full  text-end inline-block duration-150"
          style={{ rotate }}
          transition={{
            type: "spring",
          }}
        >
          branded
        </motion.h1>
        <motion.h1
          className="w-full inline-block duration-150"
          style={{ rotate: rotateDown }}
          transition={{
            type: "spring",
          }}
        >
          content
        </motion.h1>
      </div>
      <p className="text-lg uppercase gt-black   text-center leading-tight text-center w-[800px] max-md:text-base max-sm:text-sm  max-2xs:text-xs max-lg:w-auto text-black mx-auto px-4">
        OUR COLLECTIVE AD AGENCY AND PRODUCTION EXPERIENCE HAS MADE THE BRANDED
        CONTENT SPACE FERTILE GROUND FOR WILDCATTER. WE DIG DEEP, BREAKING
        THROUGH THE SURFACE LAYER TO CONNECT AND ENTERTAIN CONSUMERS WITH WHAT
        OUR PARTNER BRANDS BELIEVE IN AND STAND FOR.
      </p>
    </section>
  );
};

export default BrandedContent;
