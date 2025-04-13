"use client";
import { useRef, useEffect, useState } from "react";

import { useInView } from "motion/react";
import { useMainContext } from "../context/context";

import Footer from "../components/footer";
import BrandedContent from "./sections/branded-content";
import Brands from "./sections/brands";
import PremiumOriginals from "./sections/premium-originals";

const Work = () => {
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

  const premiumRef = useRef<HTMLDivElement | null>(null);

  const premiumInView = useInView(premiumRef, { once: false });

  const footerRef = useRef<HTMLDivElement | null>(null);

  const footerInView = useInView(footerRef, { once: false, amount: 0.2 });

  useEffect(() => {
    if (footerInView) {
      setFillColor("#000");
      setBgColor("#cc8a00");
      setCountdownActive(true);
    } else if (premiumInView) {
      setFillColor("#d12e24");
      setBgColor("#000");
    } else {
      setFillColor("#000");
      setBgColor("#d12e24");
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [premiumInView, footerInView]);

  return (
    <main
      className="duration-300  box-border overflow-x-hidden min-h-screen"
      style={{ backgroundColor: bgColor }}
      ref={scrollRef}
    >
      <BrandedContent />
      <Brands />
      <PremiumOriginals premiumRef={premiumRef} />
      <Footer footerRef={footerRef} countdownActive={countdownActive} />
    </main>
  );
};

export default Work;
