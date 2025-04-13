"use client";
import { useRef, useEffect, useState } from "react";

import { useInView } from "motion/react";
import { useMainContext } from "../context/context";

import Footer from "../components/footer";
import Play from "./sections/play";
import HandDynamite from "../about/sections/hand-dynamite";

const Sizzle = () => {
  const { setFillColor, bgColor, setBgColor } = useMainContext();
  const [countdownActive, setCountdownActive] = useState(false);
  const scrollRef = useRef(null);
  const [locomotiveInstance, setLocomotiveInstance] =
    useState<LocomotiveScroll | null>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    import("locomotive-scroll").then((module) => {
      const Scroll = module.default;

      const instance = new Scroll({
        el: scrollRef.current!,
        smooth: true,
        lerp: 0.1,
      });

      setLocomotiveInstance(instance);
    });

    return () => {
      locomotiveInstance?.destroy();
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const crewRef = useRef<HTMLDivElement | null>(null);

  const crewInView = useInView(crewRef, { once: false });

  const footerRef = useRef<HTMLDivElement | null>(null);

  const footerInView = useInView(footerRef, { once: false });

  const recalculateScroll = () => {
    if (locomotiveInstance) {
      locomotiveInstance.update(); // Refresh Locomotive Scroll
      console.log("Locomotive Scroll recalculated!");
    }
  };

  useEffect(() => {
    if (footerInView) {
      setFillColor("#000");
      setBgColor("#cc8a00");
      setCountdownActive(true);
    } else if (crewInView) {
      setFillColor("#000");
      setBgColor("#d12e24");
    } else {
      setFillColor("#d12e24");
      setBgColor("#000");
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crewInView, footerInView]);

  return (
    <main
      className="duration-300  box-border overflow-x-hidden"
      style={{ backgroundColor: bgColor }}
      ref={scrollRef}
    >
      <Play recalculateScroll={recalculateScroll} />
      <HandDynamite />
      <Footer footerRef={footerRef} countdownActive={countdownActive} />
    </main>
  );
};

export default Sizzle;
