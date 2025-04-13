import Image from "next/image";
import loadingIcon from "~/public/icons/gear.svg";
import Link from "next/link";
import sucessIcon from "~/public/icons/success.svg";
interface successProps {
  successPopupVisible: boolean;
  successPopup: boolean;
  sucessPopupRef: React.RefObject<HTMLDivElement | null>;
  successfulPayment: boolean;
  totalPrice: number;
  recieptError: string;
  email: string;
  recieptSucessful: boolean;
}
const Success = ({
  successPopupVisible,
  successPopup,
  sucessPopupRef,
  successfulPayment,
  recieptError,
  email,
  recieptSucessful,
}: successProps) => {
  return (
    successPopup && (
      <div className="fixed bottom-[0px]  h-full w-full  z-50 left-0 flex  justify-center  items-center        backdrop-brightness-50  px-8     xs:px-0">
        <div
          className={`w-[350px]     mid-popup   duration-300 ease-in-out flex flex-col py-6 px-6  gap-4   rounded-lg bg-mustard   items-center   text-black    ${
            successPopupVisible ? "" : "mid-popup-hidden"
          }  `}
          ref={sucessPopupRef}
        >
          <div className="flex flex-col gap-5  w-full">
            <div className="flex flex-col gap-3 items-center w-full">
              <Image src={sucessIcon} alt="" className="w-24" />

              <div className="flex flex-col gap-2 w-full">
                <h1 className="text-4xl thunder  text-center uppercase">
                  Payment Successful!
                </h1>

                {successfulPayment && (
                  <p className="text-sm  gt-reg  text-center">
                    Your payment has been processed successfully.
                  </p>
                )}
                {recieptSucessful ? (
                  <div className="w-full ">
                    <h1 className="text-sm   text-black text-center ">
                      A reciept has been sent to your email ({email}).
                    </h1>
                  </div>
                ) : recieptError ? (
                  <div className="flex flex-col gap-2 items-center justify-center ">
                    <h1 className="text-xs  uppercase text-black text-center ">
                      {recieptError}
                    </h1>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 items-center justify-center ">
                    <Image src={loadingIcon} alt="" className="w-12 mx-auto" />
                    <h1 className="text-xs  uppercase text-black text-center ">
                      Sending reciept...
                    </h1>
                  </div>
                )}
              </div>
            </div>
            <Link
              href="/gear"
              className="bg-black    text-mustard px-4 py-4  rounded-md  hover:ring-[2px] hover:ring-offset-1  ring-black    duration-300  gap-1   text-xs w-full text-center gt-black outline-none"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      </div>
    )
  );
};

export default Success;
