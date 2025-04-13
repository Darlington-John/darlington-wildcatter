"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const InfiniteText = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!wrapperRef.current || !textRef.current) return;

    const wrapper = wrapperRef.current;
    const text = textRef.current;

    // Duplicate text to create smooth infinite scrolling
    const clonedText = text.cloneNode(true) as HTMLDivElement;
    wrapper.appendChild(clonedText);

    const width = text.offsetWidth;

    const startRolling = () => {
      if (tweenRef.current) tweenRef.current.kill(); // Kill old animation

      tweenRef.current = gsap.to(wrapper, {
        x: -width,
        duration: 120, // Adjust speed by changing duration
        ease: "linear",
        repeat: -1,
      });
    };

    startRolling();

    const resizeHandler = () => {
      const progress = tweenRef.current?.progress() || 0;
      tweenRef.current?.kill();
      startRolling();
      tweenRef.current?.progress(progress);
    };

    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);
  const texts = Array.from(
    { length: 10 },
    () => ` CREATIVE STUDIO & PRODUCTION COMPANY ✦ onuohadarlington38@gmail.com ✦
          973.951.6023 ✦ `
  );
  return (
    <div className="overflow-hidden whitespace-nowrap w-full bg-red  text-black  fixed bottom-0 z-[50] left-0 py-3">
      <div ref={wrapperRef} className="flex items-center">
        <div ref={textRef} className="text-xl gt-black  px-10 uppercase ">
          {texts}
        </div>
      </div>
    </div>
  );
};

export default InfiniteText;
