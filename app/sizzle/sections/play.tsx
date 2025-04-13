"use client";
import Image from "next/image";
import { useState } from "react";
import cat from "~/public/images/loadmore-hover.svg";
import catHover from "~/public/images/loadmore.svg";
import videoCat from "~/public/images/Wildcat_transparent.png";
import * as motion from "motion/react-client";
import { useScroll, useTransform } from "motion/react";
interface props {
  recalculateScroll: () => void;
}
const Play = ({ recalculateScroll }: props) => {
  const [playVideo, setPlayVideo] = useState(false);
  const [startVideo, setStartVideo] = useState(false);
  const toggleVideo = () => {
    setPlayVideo(true);
    setTimeout(() => {
      setStartVideo(true);
    }, 300);
    setTimeout(() => {
      recalculateScroll();
    }, 1500);
  };
  const { scrollYProgress } = useScroll(); // Get scroll progress (0 to 1)
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -100]);
  return (
    <section className="min-h-screen w-full  flex items-center   justify-center flex-col gap-0 py-20">
      <motion.h1
        className={`thunder  text-[21vw] text-red text-center uppercase leading-[.90]  ${
          startVideo && "hidden"
        }`}
        style={{ rotate }}
        transition={{
          type: "spring",
        }}
      >
        Sizzle
      </motion.h1>
      {startVideo && (
        <motion.div
          className={`w-[100%] relative `}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 100,
            damping: 10,
            // delay: 0.5,
          }}
        >
          <Image
            src={videoCat}
            className="w-full relative z-20 pointer-events-none"
            alt=""
          />
          <video
            className=" w-[57.5%]    absolute  top-[38.6%]  right-[22.8%] z-10  cursor-none"
            preload="auto"
            poster="/images/vlcsnap-2023-04-10-14h16m04s885.png"
            autoPlay
            controls={true}
            loop
            playsInline
          >
            <source src={"/videos/WE-ARE-WILDCATTER.mp4"} type="video/mp4" />
          </video>
        </motion.div>
      )}

      <div
        className={`flex items-center justify-center relative  play-container   w-[36vw] max-xs:w-[80%] ${
          playVideo && "shrink-scale"
        }  ${startVideo && "hidden"}`}
        onClick={toggleVideo}
      >
        <Image src={cat} alt="" className="  play-front  play w-full" />
        <Image src={catHover} alt="" className=" play-back  play  w-full" />
        <h1 className="text-[7vw] thunder text-red  uppercase absolute  leading-[.75]  bottom-[30%]  z-10 play-text max-xs:bottom-[35%]">
          play
        </h1>
      </div>
    </section>
  );
};

export default Play;
