"use client";
import { useEffect, useState } from "react";
import { useGearsContext } from "../context/gears-context";
import Form from "./form/form";
import statesData from "~/lib/data/states-data";
import dynamic from "next/dynamic";
import { usePopup } from "~/lib/utils/toggle-popups";
import { apiRequest } from "~/lib/utils/api-request";
import Success from "./success-popup";
import { clearCart } from "~/lib/utils/clear-cart";
import { useRouter } from "next/navigation";
const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  {
    ssr: false,
  }
);
const Checkout = () => {
  const { cart } = useGearsContext();
  const router = useRouter();

  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [places, setPlaces] = useState<string[]>([]);
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = e.target.value;
    setSelectedState(country);
    setPlaces(statesData[country] || []);
  };
  const {
    isVisible: successPopupVisible,
    isActive: successPopup,
    togglePopup: toggleSucessPopup,
    ref: sucessPopupRef,
  } = usePopup();
  const [successfulPayment, setSuccessulPayment] = useState(false);
  useEffect(() => {
    if (cart.length < 1 && !successfulPayment) {
      router.push("/gear");
    }
  }, [router, cart, successfulPayment]);
  const formProps = {
    email,
    setEmail,
    selectedState,
    city,
    setCity,
    setAddress,
    setError,
    setName,
    setPhone,
    places,
    phone,
    error,
    handleCountryChange,
    name,
    address,
    successfulPayment,
  };
  const allFilled =
    email && selectedState && city && places && phone && name && address;
  const completeOrder = () => {
    setError("");
    if (!allFilled) {
      setError("All fields are required");
    }
  };
  const [sendingReciept, setSendingReciept] = useState(false);
  const [recieptError, setRecieptError] = useState("");
  const [recieptSucessful, setRecieptSucessful] = useState(false);
  console.log("carrrrt", cart);
  const handleSendReciept = async () => {
    if (sendingReciept && !successPopup) return;
    if (!email) {
      setRecieptError("Email not found");
      return;
    }
    setSendingReciept(true);
    setRecieptError("");

    await apiRequest({
      url: "/api/send-reciept",
      method: "POST",
      body: {
        email,
        name,
        phone,
        address,
        city,
        state: selectedState,
        totalPrice,
        products: cart,
      },
      onSuccess: () => {
        setRecieptSucessful(true);
      },
      onError: (error) => {
        setRecieptSucessful(false);
        setRecieptError(error);
      },
      onFinally: () => {
        setSendingReciept(false);
      },
    });
  };

  const successProps = {
    successPopupVisible,
    successPopup,
    sucessPopupRef,
    successfulPayment,
    totalPrice,
    recieptError,
    email,
    recieptSucessful,
  };

  return (
    <main className="flex  min-h-screen w-full  overflow-auto">
      <section className="min-h-screen   w-[50%] bg-mustard  py-20 flex flex-col  text-black">
        <div className="flex  flex-col ">
          <h1 className="gt-black  uppercase text-xl  p-5 border-b border-b-2  border-b-black">
            DELIVERY DETAILS
          </h1>
          <Form {...formProps} />
        </div>
      </section>
      <section className="min-h-screen   w-[50%] bg-black  text-mustard py-20  ">
        <div className="flex  flex-col  justify-between  gap-8  min-h-full">
          <div className="flex flex-col gap-4  h-full overflow-auto  cart-list min-h-[300px]">
            <h1 className="gt-black  uppercase text-xl  p-5 border-b border-b-2  border-b-mustard">
              Summary
            </h1>
            <div className="  gap-2 flex flex-col divide-y divide-y-2  p-5 ">
              {cart.map((data, index) => (
                <div key={index} className="w-full flex  justify-between py-2">
                  <div className="flex gap-2">
                    <div className="w-full  bg-mustard max-w-[120px]  ">
                      {/*    eslint-disable-next-line @next/next/no-img-element  */}
                      <img src={data.image} alt="" className="w-full " />
                    </div>
                    <div className="flex flex-col  justify-between ">
                      <div className="flex gap-1 flex-col">
                        <h1 className="gt-black  uppercase text-xl line-clamp-1 ">
                          {data.name}
                        </h1>
                        {data?.sizes && (
                          <h1 className="gt-black  uppercase text-xl ">
                            size: {data.size}
                          </h1>
                        )}
                      </div>

                      <h1 className="gt-black  uppercase text-xl  leading-none">
                        Qty: {data.quantity}
                      </h1>
                    </div>
                  </div>
                  <h1 className="gt-black  uppercase text-xl ">
                    ₦{(data.price * data.quantity).toLocaleString("en-US")}.00
                  </h1>
                </div>
              ))}
            </div>
          </div>
          <div className="shrink-0  flex flex-col w-full shrink-0 p-5">
            {!successfulPayment && (
              <div className="w-full items-center justify-between flex ">
                <h1 className="gt-black  uppercase text-xl ">Total:</h1>
                <h1 className="thunder  uppercase text-[5.6vw] leading-none">
                  ₦{totalPrice.toLocaleString("en-US")}
                </h1>
              </div>
            )}

            <div className="flex flex-col gap-2 ">
              {error === "All fields are required" && (
                <span className="gt-black  uppercase text-sm text-center text-red  leading-none ">
                  All delivery details are required
                </span>
              )}
              {successfulPayment ? (
                <button className="w-full  text-center py-4  gt-black  uppercase text-xl  bg-mustard  text-black  border-black  border-3">
                  Order successful
                </button>
              ) : allFilled ? (
                <PaystackButton
                  email={email}
                  onSuccess={() => {
                    setSuccessulPayment(true);
                    toggleSucessPopup();
                    handleSendReciept();
                    clearCart();
                  }}
                  amount={totalPrice * 100}
                  publicKey={
                    process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string
                  }
                  className={`w-full  text-center py-4  gt-black  uppercase text-xl  bg-black text-mustard  border-mustard border-3  duration-300   ${
                    allFilled
                      ? "hover:bg-mustard hover:text-black "
                      : "opacity-60"
                  }`}
                  disabled={!allFilled}
                >
                  Pay
                </PaystackButton>
              ) : (
                <button
                  className="w-full  text-center py-4  gt-black  uppercase text-xl  bg-black text-mustard  border-mustard border-3  duration-300 hover:bg-mustard hover:text-black"
                  onClick={completeOrder}
                >
                  complete order
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
      <Success {...successProps} />
    </main>
  );
};

export default Checkout;
