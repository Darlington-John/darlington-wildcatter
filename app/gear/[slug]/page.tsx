"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useMainContext } from "~/app/context/context";
import { Gear } from "~/lib/data/gears/type";
import { addToCart } from "~/lib/utils/add-to-cart";
import useToggle from "~/lib/utils/use-toggle";
import dynax from "~/public/images/dynax.svg";
export default function GearPage() {
  const { toggleBag } = useMainContext();
  const [gear, setGear] = useState<Gear | null>(null);
  const [errorFetching, setErrorFetching] = useState(false);
  const [fetching, setFetching] = useState(true);
  const { slug } = useParams();
  const toggle = useToggle(1000);
  useEffect(() => {
    const fetchGear = async () => {
      try {
        const res = await fetch(`/api/gears/${slug}`);
        if (!res.ok) {
          setErrorFetching(true);
          return;
        }
        const data = await res.json();
        setGear(data.gear);
      } catch (error) {
        setErrorFetching(true);
        console.log(error);
      } finally {
        setFetching(false);
      }
    };
    (async () => {
      await fetchGear().catch((error) =>
        console.error("Error fetching", error)
      );
    })();
  }, [slug]);
  const [selectedSize, setSelectedSize] = useState("s");
  const sizes = ["s", "m", "l", "xl"];
  const cartItem = {
    ...gear,
    quantity: 1,
    size: selectedSize,
  };
  return (
    <div className=" text-4xl text-white min-h-screen  flex  items-center justify-center  max-lg:flex-col  max-lg:justify-normal max-lg:items-stretch">
      {fetching && (
        <div
          className={`absolute  z-20 max-lg:top-1/2   max-lg:transform max-lg:-translate-y-1/2  max-lg:left-[50%]  max-lg:-translate-x-1/2  ${
            toggle && "fast-shake"
          }`}
        >
          <Image src={dynax} alt="" className="w-40" />
        </div>
      )}
      {errorFetching && (
        <div className="absolute  z-20 flex flex-col  items-center text-red  max-lg:top-1/2   max-lg:transform max-lg:-translate-y-1/2  max-lg:left-[50%]  max-lg:-translate-x-1/2  ">
          <h1 className="text-[5.6vw] thunder uppercase   leading-none ">
            Error fetching
          </h1>
          <p className="text-3xl thunder">An unexpected error occured</p>
        </div>
      )}
      <div className="bg-mustard  w-[50%]  min-h-full flex  items-center justify-center  self-stretch max-lg:w-full ">
        {!fetching && !errorFetching && (
          /* eslint-disable-next-line @next/next/no-img-element  */
          <img
            src={gear?.image}
            alt={gear?.name}
            className="my-4 w-[80%]  object-contain max-lg:w-[45vh]"
          />
        )}
      </div>

      <div className="bg-black w-[50%]  min-h-full flex   items-center  justify-center self-stretch max-lg:w-full  max-lg:grow">
        {!fetching && !errorFetching && (
          <div className=" text-mustard w-[460px]  max-2xs:w-full max-2xs:px-4">
            <h1 className="text-[5.6vw] thunder uppercase   leading-none ">
              {gear?.name}
            </h1>

            <p className="text-2xl thunder">
              ₦{gear?.price.toLocaleString("en-US")}.00
            </p>
            {gear?.sizes && (
              <div className="flex gap-2  w-full  mt-3">
                {sizes.map((size) => (
                  <button
                    className={`  border-3 border-mustard  rounded-sm text-center py-1 gt-black  uppercase text-xl  w-full ${
                      selectedSize === size
                        ? " bg-mustard  text-black"
                        : " bg-black text-mustard"
                    }`}
                    key={size}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
            {!fetching && !errorFetching && (
              <button
                className="w-full  text-center py-4  gt-black  uppercase text-xl  bg-black text-mustard  border-mustard border-3 mt-4  duration-300 hover:bg-mustard hover:text-black"
                onClick={() => {
                  //@ts-expect-error: I no get time abeg
                  addToCart(cartItem);
                  toggleBag();
                }}
              >
                add to bag
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
