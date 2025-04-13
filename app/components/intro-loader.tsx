"use client";

import { useEffect, useState } from "react";
import * as motion from "motion/react-client";
import Image from "next/image";
import hand from "~/public/images/hand.svg";
import box from "~/public/images/timer-square.svg";
import explode from "~/public/images/explode.svg";
import { usePathname } from "next/navigation";
const IntroLoader = () => {
  const [waiting, setWaiting] = useState(true);
  const [hasShown, setHasShown] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setWaiting(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const [boxWaiting, setBoxWaiting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBoxWaiting(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const [time, setTime] = useState(3); // Start from 3
  const [started, setStarted] = useState(false);
  const [countdownActive, setCountdownActive] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => setCountdownActive(true), 4000);

    return () => clearTimeout(delayTimer);
  }, []);

  // Countdown logic
  useEffect(() => {
    if (!countdownActive || time === 0) return;

    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdownActive, time]);

  // Set started to true 1 second after countdown finishes
  useEffect(() => {
    if (time === 0) {
      const startDelay = setTimeout(() => setStarted(true), 1000);
      const shownDelay = setTimeout(() => setHasShown(true), 2000);
      return () => {
        clearTimeout(startDelay);
        clearTimeout(shownDelay);
      };
    }
  }, [time]);

  const linkname = usePathname();

  return (
    linkname === "/" &&
    !hasShown && (
      <div
        className={`  h-screen w-screen  overflow-hidden p-5 pt-20  flex  items-center justify-center duration-300 z-[2000] fixed top-0 left-0     ${
          boxWaiting ? "bg-mustard" : "bg-red"
        } ${started && "fade"} `}
      >
        <video autoPlay muted playsInline className=" w-full " preload="auto">
          <source src={"/videos/intro.webm"} type="video/webm" />
          <source src={"/videos/intro.mp4"} type="video/mp4" />
        </video>
        {!waiting && (
          <motion.div
            className=" mx-auto  p-4 absolute  top-[60%]  "
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
          >
            <div
              className={`flex items-center  justify-center    ${
                countdownActive && "shake"
              }`}
            >
              <Image
                src={hand}
                alt="left-hand"
                className=" w-28  max-xl:w-20 max-sm:w-16 max-3xs:w-12"
              />
              <div
                className={` gt-black text-[80px]  text-black  leading-none border-y border-y-2  tracking-tighter  shlrink  overflow-hidden text-nowrap  py-6 max-xl:text-5xl max-sm:text-2xl  max-3xs:text-lg max-3xs:py-4.5   ${
                  !boxWaiting && "hidden"
                }`}
              >
                LETS BLOW SHIT UP
              </div>
              {!boxWaiting && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    scale: { type: "spring", visualDuration: 0.4, bounce: 0.3 },
                  }}
                  className="relative  w-72 max-xl:w-52  max-sm:w-40"
                >
                  <Image
                    src={box}
                    alt="box  "
                    className="  w-full  relative  z-20 bg-red"
                  />
                  <Image
                    src={explode}
                    alt="explode"
                    className="w-20 absolute  top-1/2  left-1/2  transform -translate-y-1/2  -translate-x-1/2  z-10    explode"
                  />
                  <p className="  absolute top-1/2  left-1/2  transform -translate-y-1/2  -translate-x-1/2 z-30  text-5xl gt-black  text-nowrap  tracking-tighter text-black max-xl:text-3xl max-sm:text-xl max-2xs:text-lg">
                    00 : {time.toString().padStart(2, "0")}
                  </p>
                </motion.div>
              )}

              <Image
                src={hand}
                alt="left-hand"
                className=" w-28 scale-x-[-1]  max-xl:w-20  max-sm:w-16 max-3xs:w-12"
              />
            </div>
          </motion.div>
        )}
      </div>
    )
  );
};

export default IntroLoader;
