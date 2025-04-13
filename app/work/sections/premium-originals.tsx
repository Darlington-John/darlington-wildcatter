import { useMainContext } from "~/app/context/context";
import * as motion from "motion/react-client";
import { useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import dynamite from "~/public/images/dynamitehand2.svg";
import Image from "next/image";
import useToggle from "~/lib/utils/use-toggle";
import jan from "~/public/images/JAN6 (1).jpg";
import lastCircus from "~/public/images/TheLastCircusInTown_Final-2_page-0001 (1).jpg";
import talking from "~/public/images/TALKINGOUTLOUD (1).jpg";
import trifecta from "~/public/images/Trifecta (1).jpg";
import depth from "~/public/images/DepthOfField (1).jpg";
import adhq from "~/public/images/ADHQ (1).jpg";

interface premiumProps {
  premiumRef: React.RefObject<HTMLDivElement | null>;
}
const PremiumOriginals = ({ premiumRef }: premiumProps) => {
  const { fillColor, bgColor } = useMainContext();
  const containerRef = useRef(null);
  const toggle = useToggle(1000);
  const isInView = useInView(containerRef, { once: false, amount: 0.8 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const rotateRange = isInView ? [0, -150] : [0, -150];
  const rotateDownRange = isInView ? [0, 150] : [0, 150];

  const rotate = useTransform(scrollYProgress, [0, 1], rotateRange);
  const rotateDown = useTransform(scrollYProgress, [0, 1], rotateDownRange);
  const experience = [
    {
      id: 1,
      image: jan,
    },
    {
      id: 2,
      image: lastCircus,
    },
    {
      id: 3,
      image: talking,
    },
    {
      id: 4,
      image: trifecta,
    },
    {
      id: 5,
      image: depth,
    },
    {
      id: 6,
      image: adhq,
    },
  ];

  return (
    <section
      className="flex flex-col gap-8 py-10 duration-300"
      ref={premiumRef}
    >
      <div className="flex flex-col gap-8 ">
        <div
          className="min-h-screen flex items-end justify-end flex-col gap-16  text-[20vw] text-black duration-300 thunder uppercase leading-[0.75] max-xl:min-h-auto max-lg:gap-4"
          style={{ backgroundColor: bgColor, color: fillColor }}
          ref={containerRef}
        >
          <motion.h1
            className="w-full  text-end inline duration-150"
            style={{ translateX: rotate, backgroundColor: "transparent" }}
            transition={{
              type: "spring",
            }}
          >
            premium
          </motion.h1>
          <motion.h1
            className="w-full inline duration-150"
            style={{ translateX: rotateDown }}
            transition={{
              type: "spring",
            }}
          >
            originals
          </motion.h1>
        </div>
        <p
          className="text-lg uppercase gt-black   text-center leading-tight text-center w-[500px] max-md:text-base max-sm:text-sm  max-2xs:text-xs max-xs:w-auto text-black mx-auto  duration-300 px-4"
          style={{ color: fillColor }}
        >
          WE DREAM OFF THE BEATEN PATH, PROSPECTING CULTURE FOR CAPTIVATING
          STORIES THAT NEED TO BE SHARED WITH THE WORLD.
        </p>
        <Image
          src={dynamite}
          alt=""
          className={`w-72 self-end  rotate-270 max-xl:w-40  ${
            toggle && "fast-shake"
          }`}
        />
      </div>
      <div className="grid grid-cols-2 w-full gap-6  py-10 px-4  max-xs:grid-cols-1 max-xs:gap-3">
        {experience.map((exp) => (
          <div className="w-full " key={exp.id}>
            <Image className="w-full h-full" alt="" src={exp.image} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PremiumOriginals;
