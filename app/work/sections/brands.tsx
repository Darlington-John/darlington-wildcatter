"use client";
import Image from "next/image";
import takis from "~/public/images/Takis.png";
import twitch from "~/public/images/twitch.png";
import explodeRed from "~/public/images/explode-corner-red.svg";
import youtube from "~/public/images/youtube.svg";
import stake from "~/public/images/stake.png";
import { useMainContext } from "~/app/context/context";
const Brands = () => {
  const { fillColor } = useMainContext();
  const brands = [
    {
      id: 1,
      brand_name: "Team takis",
      brand_logo: takis,
      brand_video: {
        src: "/videos/hero-vid.mp4",
        poster: "/images/poster.png",
      },
    },
    {
      id: 2,
      brand_name: "Debatelords",
      brand_logo: twitch,
      brand_video: {
        src: "/videos/hero-vid.mp4",
        poster: "/images/poster.png",
      },
    },
    {
      id: 3,
      brand_name: "Youtube features",
      brand_logo: youtube,
      brand_video: {
        src: "/videos/hero-vid.mp4",
        poster: "/images/poster.png",
      },
    },
    {
      id: 4,
      brand_name: "Goated",
      brand_logo: stake,
      brand_video: {
        src: "/videos/hero-vid.mp4",
        poster: "/images/poster.png",
      },
    },
    {
      id: 5,
      brand_name: "Youtube features",
      brand_logo: youtube,
      brand_video: {
        src: "/videos/hero-vid.mp4",
        poster: "/images/poster.png",
      },
    },
    {
      id: 6,
      brand_name: "Goated",
      brand_logo: stake,
      brand_video: {
        src: "/videos/hero-vid.mp4",
        poster: "/images/poster.png",
      },
    },
  ];
  return (
    <section className="flex flex-col  items-center px-5 py-20 max-lg:px-4">
      <div className="grid grid-cols-2 w-full  px-4 gap-6 max-lg:gap-3 max-lg:px-0  max-xs:flex  max-xs:flex-col">
        {brands.map((data) => (
          <div
            className="w-full h-[500px]   flex  flex-col gap-8   max-lg:h-[250px] max-lg:gap-4 max-xs:h-auto"
            key={data.id}
          >
            <div className="w-full  h-[400px] overflow-hidden shrink-0  brand-card  relative  max-lg:h-[200px] max-xs:h-auto">
              <div className=" absolute -bottom-[2px] -right-[2px] z-10   duration-300 w-[55%] brc-peel ">
                <Image
                  src={explodeRed}
                  className=" w-full  rotate-90"
                  alt="explode"
                />
              </div>
              <div className=" absolute bottom-[10px] right-[10px] z-12   w-[12%] brand-logo duration-100 ">
                <Image
                  src={data.brand_logo}
                  className=" w-full  "
                  alt="brand"
                />
              </div>
              {/* <Image src={test} alt="" className="w-full h-full object-cover"/> */}
              <video
                className=" w-full h-full object-cover   relative  z-2"
                preload="auto"
                poster={data.brand_video.poster}
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={data.brand_video.src} type="video/mp4" />
              </video>
            </div>
            <h1
              className="text-[5.5vw] thunder uppercase leading-[0.75] "
              style={{ color: fillColor }}
            >
              {data.brand_name}
            </h1>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Brands;
