"use client";
import Image from "next/image";
import handbox from "~/public/images/hand-box.svg";
import explode from "~/public/images/explode-red.svg";
import { useEffect, useState } from "react";
import useToggle from "~/lib/utils/use-toggle";
import * as motion from "motion/react-client";
import { useMainContext } from "../context/context";

interface FooterProps {
  footerRef: React.RefObject<HTMLDivElement | null>;
  countdownActive: boolean;
}
const Footer = ({ footerRef, countdownActive }: FooterProps) => {
  const { bgColor } = useMainContext();
  const toggle = useToggle(1000);
  const [time, setTime] = useState(3);
  const [ended, setEnded] = useState(false);
  const [fade, setFade] = useState(false);
  useEffect(() => {
    if (!countdownActive || time === 0) return;

    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdownActive, time]);

  useEffect(() => {
    if (time === 0) {
      const startDelay = setTimeout(() => setEnded(true), 500);
      return () => clearTimeout(startDelay);
    }
  }, [time]);

  useEffect(() => {
    if (time === 0) {
      const fadeDelay = setTimeout(() => setFade(true), 1300);
      return () => clearTimeout(fadeDelay);
    }
  }, [time]);
  return (
    <section
      className="h-screen w-full  duration-300  p-20 flex items-center  justify-center flex-col relative  overflow-hidden "
      ref={footerRef}
      style={{ backgroundColor: bgColor }}
    >
      {fade ? (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 100,
            damping: 10,
            delay: 0,
          }}
          className="flex items-center gap-2 justify-center flex-col text-black leading-none relative"
        >
          <h1 className="thunder text-[12vw] uppercase">
            info@wildcatterla.com
          </h1>
          <h1 className="thunder text-[12vw]">973.951.6023</h1>
          <h1 className="gt-black uppercase  text-lg text-center tracking-wide  max-md:text-base">
            get in touch and start
            <br /> your project now
          </h1>
        </motion.div>
      ) : (
        <div className="flex flex-col gap-10  items-center  justify-center">
          <div
            className={`relative  w-82 ${toggle && "fast-shake"} max-md:w-60`}
          >
            <Image
              src={handbox}
              alt="box  "
              className="  w-full  relative  z-20 "
            />

            <p className="  absolute top-1/2  left-1/2  transform -translate-y-1/2  -translate-x-1/2 z-30  text-5xl gt-black  text-nowrap  tracking-tighter text-black leading-[0] max-md:text-4xl ">
              00 : {time.toString().padStart(2, "0")}
            </p>
          </div>
          <h1
            className={` thunder text-[16vw]   text-black  leading-[13vw] text-center      text-nowrap   `}
          >
            LETS BLOW
            <br />
            SHIT UP!
          </h1>
        </div>
      )}
      <Image
        src={explode}
        alt="explode"
        className={`w-20 absolute  top-1/2  left-1/2  transform -translate-y-1/2  -translate-x-1/2    pointer-events-none   duration-300    ${
          ended ? "explode-footer" : " hidden"
        }  ${fade ? "opacity-0" : "opacity-100"}`}
      />
      {fade && (
        <motion.div
          initial={{ opacity: 0, translateY: 200 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 100,
            damping: 10,
            delay: 1,
          }}
          className="absolute p-5 items-center justify-between flex  w-full bottom-2 text-black "
        >
          <h1 className="gt-black uppercase  text-lg text-center tracking-wide max-md:text-sm">
            2025@WILDCATTER
          </h1>
          <h1 className="gt-black uppercase  text-lg text-center tracking-wide max-md:text-sm">
            LEGAL TERMS
          </h1>
        </motion.div>
      )}
    </section>
  );
};

export default Footer;
