"use client";

import Image from "next/image";
import { useMainContext } from "../context/context";
import hover from "~/public/images/hover.svg";
import clicked from "~/public/images/hover-click.svg";
import { useEffect, useState } from "react";

const CustomCursor = () => {
  const { containerStyle, isHovered } = useMainContext();
  const [cursorImg, setCursorImg] = useState(hover);
  const [isHolding, setIsHolding] = useState(false);

  useEffect(() => {
    const handleMouseDown = () => {
      setCursorImg(clicked);
      setIsHolding(true);
    };

    const handleMouseUp = () => {
      setCursorImg(hover);
      setIsHolding(false);
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);
  return (
    <div className="pointer-events-none relative cursor max-lg:hidden">
      <Image
        src={cursorImg}
        style={containerStyle}
        className={`w-32 z-[90] fixed pointer-events-none transition-transform duration-150 ease-out ${
          isHovered ? "scale-75" : "scale-100"
        }  ${isHolding && "holding"}`}
        alt="cursor"
      />
    </div>
  );
};

export default CustomCursor;
