"use client";
import { useRef, useEffect, useState } from "react";

import { useInView } from "motion/react";
import { useMainContext } from "../context/context";

import Footer from "../components/footer";
import HandDynamite from "../about/sections/hand-dynamite";
import Gears from "./sections/gears";

const Gear = () => {
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

  const footerRef = useRef<HTMLDivElement | null>(null);

  const footerInView = useInView(footerRef, { once: false });

  useEffect(() => {
    if (footerInView) {
      setFillColor("#000");
      setBgColor("#cc8a00");
      setCountdownActive(true);
    } else {
      setFillColor("#cc8a00");
      setBgColor("#000");
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [footerInView]);

  return (
    <main
      className="duration-300  box-border overflow-x-hidden"
      style={{ backgroundColor: bgColor }}
      ref={scrollRef}
    >
      <Gears />
      <HandDynamite />
      <Footer footerRef={footerRef} countdownActive={countdownActive} />
    </main>
  );
};

export default Gear;
