"use client";
import { useMainContext } from "../context/context";

const NewPageLoader = () => {
  const { displayLoader, selectedVideo, prepUnload } = useMainContext();
  return (
    displayLoader && (
      <div
        className={`fixed top-0 left-0 w-screen h-screen z-[500]   pointer-events-none  ${
          prepUnload && "new-page-loader "
        }`}
      >
        {selectedVideo === "black" && (
          <video
            className=" w-full h-full object-cover align-bottom"
            preload="auto"
            autoPlay
            muted
            playsInline
          >
            <source src="/videos/loaderblack.webm" type="video/webm" />
            <source src="/videos/loaderblack.mp4" type="video/mp4" />
          </video>
        )}
        {selectedVideo === "red" && (
          <video
            className=" w-full h-full object-cover align-bottom"
            preload="auto"
            autoPlay
            muted
            playsInline
          >
            <source src="/videos/loaderred.webm" type="video/webm" />
          </video>
        )}
      </div>
    )
  );
};

export default NewPageLoader;
