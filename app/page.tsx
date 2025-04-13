"use client";
import InfiniteText from "./components/infinite-text";

export default function Home() {
  return (
    <div className="flex items-center justify-center pt-26 px-6 w-screen h-screen bg-red  ">
      <div className="relative  w-full h-full overflow-hidden  flex  ">
        <InfiniteText />
        <video
          className=" w-full h-full object-cover align-bottom"
          preload="auto"
          poster="/images/poster.png"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={"/videos/hero-vid.webm"} type="video/webm" />
          <source src={"/videos/hero-vid.mp4"} type="video/mp4" />
        </video>

        {/*  eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={"/images/red-mask.svg"}
          alt="mask"
          className="absolute top-0 right-0 h-full     align-top  max-md:hidden"
        />
      </div>
    </div>
  );
}
