"use client";
import Image from "next/image";
import { useMainContext } from "../context/context";
import x from "~/public/icons/close-mustard.svg";
import { CartItem } from "~/lib/data/cart";
import Link from "next/link";
import plus from "~/public/icons/plus.svg";
import minus from "~/public/icons/minus.svg";
import { useGearsContext } from "../context/gears-context";
const Bag = () => {
  const {
    bag,
    bagRef,
    isBagVisible,
    toggleBag,
    onHover,
    onHoverEnd,
    loadPage,
  } = useMainContext();
  const { cart, setCart } = useGearsContext();

  const updateCartItemQuantity = (
    id: number | undefined,
    size: string | null,
    newQuantity: number
  ) => {
    const existingCartRaw = localStorage.getItem("cart");
    if (!existingCartRaw) return;

    const existingCart: CartItem[] = JSON.parse(existingCartRaw);

    const updatedCart = existingCart.map((item) => {
      if (item.id === id && item.size === size) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart); // Update UI
  };

  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  const removeItem = (id: number | undefined, size: string | null) => {
    const existingCartRaw = localStorage.getItem("cart");
    if (!existingCartRaw) return;
    const existingCart: CartItem[] = JSON.parse(existingCartRaw);
    const updatedCart = existingCart.filter(
      (i) => !(i.id === id && i.size === size)
    );

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  return (
    bag && (
      <div
        className={`fixed top-0  w-full h-full left-0   z-[80] duration-[0.5s] ease    ${
          isBagVisible
            ? "  bag  max-2xs:backdrop-brightness-50"
            : "  bag-hidden"
        }`}
      >
        <div
          className={`h-full bg-black  w-[50vw]  right-0  z-[80]  fixed flex flex-col   top-0 gap-10 dxs:w-full  text-mustard   border-l-mustard border-l-2  p-5 justify-between max-lg:w-[90vw] max-md:gap-5 max-md:p-2  `}
          ref={bagRef}
        >
          <div className="flex flex-col gap-4  h-full overflow-auto  cart-list">
            <div className="flex items-center justify-between w-full  border-b-2  border-b-mustard  pb-5 max-md:pb-3">
              <h1 className=" text-2xl gt-black max-md:text-xl ">BAG</h1>

              <Image
                src={x}
                className="w-10  cursor-pointer max-md:w-5"
                alt=""
                onClick={toggleBag}
              />
            </div>
            <div className="  gap-2 flex flex-col divide-y">
              {cart.map((data, index) => (
                <div key={index} className="w-full flex  justify-between py-2">
                  <div className="flex gap-2">
                    <Link
                      onMouseEnter={onHover}
                      onMouseLeave={onHoverEnd}
                      className="w-full  bg-mustard max-w-[120px]  max-md:max-w-[80px]"
                      href={`/gear/${data.slug}`}
                    >
                      {/*    eslint-disable-next-line @next/next/no-img-element  */}
                      <img src={data.image} alt="" className="w-full " />
                    </Link>
                    <div className="flex flex-col  justify-between ">
                      <div className="flex gap-1 flex-col">
                        <h1 className="gt-black  uppercase text-xl line-clamp-1  max-md:text-sm max-2xs:text-xs ">
                          {data.name}
                        </h1>
                        {data?.sizes && (
                          <h1 className="gt-black  uppercase text-xl  max-md:text-sm max-2xs:text-xs ">
                            size: {data.size}
                          </h1>
                        )}
                      </div>
                      <div className="flex  gap-2.5  items-center  gt-black  uppercase text-xl  leading-none max-md:text-sm max-2xs:text-xs   max-md:gap-1.5">
                        <button
                          onClick={() =>
                            updateCartItemQuantity(
                              data.id,
                              data.size,
                              data.quantity > 1 ? data.quantity - 1 : 1
                            )
                          }
                        >
                          <Image
                            src={minus}
                            alt="minus"
                            className="w-6 max-md:w-3"
                          />
                        </button>
                        <h1>{data.quantity}</h1>
                        <button
                          onClick={() =>
                            updateCartItemQuantity(
                              data.id,
                              data.size,
                              data.quantity + 1
                            )
                          }
                        >
                          <Image
                            src={plus}
                            alt="plus"
                            className="w-6 max-md:w-3"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 justify-between">
                    <h1 className="gt-black  uppercase text-xl  max-md:text-sm max-2xs:text-xs ">
                      ₦{(data.price * data.quantity).toLocaleString("en-US")}.00
                    </h1>
                    <button
                      className="gt-black  uppercase text-xl  max-md:text-sm max-2xs:text-xs "
                      onClick={() => removeItem(data.id, data.size)}
                    >
                      delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {cart.length > 0 && (
            <div className="flex flex-col w-full shrink-0">
              <div className="w-full items-center justify-between flex ">
                <h1 className="gt-black  uppercase text-xl  max-md:text-sm max-2xs:text-xs ">
                  Total:
                </h1>
                <h1 className="thunder  uppercase text-[5.6vw] leading-none">
                  ₦{totalPrice.toLocaleString("en-US")}
                </h1>
              </div>
              <div
                onClick={() => loadPage("black", `/check-out`)}
                className="w-full  text-center py-4  gt-black  uppercase text-xl  bg-black text-mustard  border-mustard border-3 mt-4  duration-300 hover:bg-mustard hover:text-black max-md:text-sm max-2xs:text-xs "
              >
                complete order
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default Bag;
