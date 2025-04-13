"use client";
import { useMainContext } from "../context/context";

const Overlay = () => {
  const { isOverlayOpen, loadPage } = useMainContext();

  const links = [
    {
      id: 1,
      className: " flex gap-2 items-center p-2  -rotate-20  link-shake",
      href: "about",
      load_color: "black",
    },
    {
      id: 2,
      className: "flex gap-2 items-center p-2  rotate-[25deg]  link-shake",
      href: "work",
      load_color: "red",
    },
    {
      id: 3,
      className: "flex gap-2 items-center p-2  -rotate-[10deg]   link-shake",
      href: "sizzle",
      load_color: "black",
    },
    {
      id: 4,
      className:
        "flex gap-2 items-center p-2  -rotate-[12deg]  justify-end link-shake",
      href: "gear",
      load_color: "black",
    },
  ];
  return (
    <div
      className="    bg-mustard w-[0px] min-h-screen fixed top-0 left-0 z-[60]  duration-300  overflow-hidden"
      id="overlay"
    >
      <div className="w-full h-screen grid grid-cols-2 grid-rows-2  items-end  justify-between   max-md:items-center">
        {links.map((data, index) => (
          <div
            className={`${data?.className}  ${
              isOverlayOpen && "grow cursor-pointer"
            }`}
            key={data?.id}
            onClick={() => loadPage(data.load_color, `/${data?.href}`)}
          >
            <h1 className="thunder   text-3xl text-black">0{index + 1}</h1>
            <h1 className="text-[20vw]  thunder text-black uppercase leading-[0.75]  ">
              {data?.href}
            </h1>
          </div>
        ))}
        {/* <div
          className={` flex gap-2 items-center p-2  -rotate-20  link-shake ${
            isOverlayOpen && "grow"
          }`}
        >
          <h1 className="thunder   text-3xl text-black">01</h1>
          <h1 className="text-[258px]  thunder text-black uppercase leading-[0.75]  ">
            About
          </h1>
        </div>
        <div className=" flex gap-2 items-center p-2  rotate-[25deg]  link-shake">
          <h1 className="thunder   text-3xl text-black">02</h1>
          <h1 className="text-[258px]  thunder text-black uppercase leading-[0.75] text-center  ">
            Work
          </h1>
        </div>
        <div className=" flex gap-2 items-center p-2  -rotate-[10deg]  w-full link-shake">
          <h1 className="thunder   text-3xl text-black">03</h1>
          <h1 className="text-[258px]  thunder text-black uppercase leading-[0.75]  ">
            Sizzle
          </h1>
        </div>
        <div className=" flex gap-2 items-center p-2  -rotate-[12deg]  w-full justify-end link-shake">
          <h1 className="thunder   text-3xl text-black">03</h1>
          <h1 className="text-[258px]  thunder text-black uppercase leading-[0.75]  ">
            Gear
          </h1>
        </div> */}
      </div>
    </div>
  );
};

export default Overlay;
