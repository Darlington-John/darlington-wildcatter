"use client";
import { useScroll, useTransform } from "motion/react";
import * as motion from "motion/react-client";
import { useMainContext } from "~/app/context/context";
import { useGearsContext } from "~/app/context/gears-context";
// import { apiRequest } from "~/lib/utils/api-request";
const Gears = () => {
  const { gears } = useGearsContext();
  const { scrollYProgress } = useScroll(); // Get scroll progress (0 to 1)
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -100], {
    clamp: true,
  });
  const { fillColor, loadPage } = useMainContext();
  // const seedDatabase = async () => {
  //   await apiRequest({
  //     url: "/api/seed",
  //     method: "POST",
  //     onSuccess: (res) => console.log("Created:", res),
  //     onFinally: () => console.log("Done"),
  //   });
  // };
  return (
    <section className="flex flex-col gap-6 py-20 items-center justify-center min-h-screen duration-300 ">
      <motion.h1
        className="thunder  text-[21vw] text-red text-center uppercase leading-[.90]"
        style={{ rotate, color: fillColor }}
        transition={{
          type: "spring",
        }}
        // onClick={seedDatabase}
      >
        Gear
      </motion.h1>
      <div className="grid  grid-cols-2  gap-8 px-8 max-2xl:px-0 max-md:grid-cols-1  w-full">
        {gears?.map((data) => (
          <div
            key={data.id}
            onClick={() => loadPage("red", `/gear/${data.slug}`)}
            className="flex items-center flex-col"
          >
            <div className="relative max-w-[660px] w-full  product_image   max-md:max-w-full ">
              {/* eslint-disable-next-line @next/next/no-img-element  */}
              <img
                src={data.image}
                className="w-full   absolute top-0 left-0 w-full h-full  object-contain"
                alt=""
              />
            </div>
            <h1
              className="text-[5.6vw] thunder uppercase   text-center  leading-none"
              style={{ color: fillColor }}
            >
              {data.name}
            </h1>
            <span
              className="text-xl text-center  gt-black"
              style={{ color: fillColor }}
            >
              ₦{data.price.toLocaleString("en-US")}.00
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gears;
