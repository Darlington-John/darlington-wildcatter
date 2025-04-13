"use client";
import Image from "next/image";
import don from "~/public/images/don.jpg";
import don2 from "~/public/images/don2.jpg";
import tim from "~/public/images/tim1.jpg";
import tim2 from "~/public/images/tim2.jpg";
import harris from "~/public/images/harris.jpg";
import harris2 from "~/public/images/harris2.jpg";
import jim from "~/public/images/jim.jpg";
import jim2 from "~/public/images/jim2.jpg";
import useToggle from "~/lib/utils/use-toggle";
import dynamites from "~/public/images/dynax.svg";
import explodeRed from "~/public/images/explode-corner-red.svg";
interface CrewProps {
  crewRef: React.RefObject<HTMLDivElement | null>;
}
const Crew = ({ crewRef }: CrewProps) => {
  const toggle = useToggle(1000);
  const crew = [
    {
      id: 1,
      name: "Don Gaby",
      role: "Founder & Ceo",
      image: don,
      image_hover: don2,
      peel_right: true,
      peel_left: false,
    },
    {
      id: 2,
      name: "Tim Mcardle",
      role: "Vp | premium originals",
      image: tim,
      image_hover: tim2,
      peel_right: false,
      peel_left: true,
    },
    {
      id: 3,
      name: "Harris sherman",
      role: "vp | digital & production",
      image: harris,
      image_hover: harris2,
      peel_right: true,
      peel_left: false,
    },
    {
      id: 4,
      name: "Jim makris",
      role: "creative director | branded divisions",
      image: jim,
      image_hover: jim2,
      peel_right: false,
      peel_left: true,
    },
  ];
  return (
    <section className={`flex flex-col gap-5  py-40 px-4   duration-300`}>
      <div className="flex items-center justify-between">
        <h1 className="uppercase thunder text-[16vw] text-black leading-[.75]">
          The crew
        </h1>
        <Image
          src={dynamites}
          className={`max-md:w-32 ${toggle && "fast-shake  "}`}
          alt="dynamites"
        />
      </div>
      <div
        className="grid grid-cols-2  items-center  gap-6  max-md:grid-cols-1"
        ref={crewRef}
      >
        {crew.map((data) => (
          <div className="flex flex-col gap-5 w-full" key={data.id}>
            <div className="relative image-container  overflow-hidden ">
              {data.peel_right ? (
                <Image
                  src={explodeRed}
                  className="w-[70%] peel absolute -top-[2px] -right-[2px] z-10   duration-300"
                  alt="explode"
                />
              ) : (
                <div className="w-[70%] peel-left absolute -top-[2px] -left-[2px] z-10   duration-300">
                  <Image
                    src={explodeRed}
                    className=" w-full  -scale-x-[1]"
                    alt="explode"
                  />
                </div>
              )}

              <Image
                src={data.image}
                className="w-full h-full image-front  image object-cover "
                alt=""
              />
              <Image
                src={data.image_hover}
                className="w-full h-full image-back   image object-cover "
                alt=""
              />
            </div>
            <div className="flex flex-col gap-0">
              <h1 className="uppercase text-[85px]  thunder text-black leading-none max-lg:text-5xl max-md:text-4xl ">
                {data.name}
              </h1>
              <h1 className="text-lg uppercase gt-black text-black   leading-none tracking-wide  max-md:text-base max-sm:text-sm  max-2xs:text-xs">
                {data.role}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Crew;
