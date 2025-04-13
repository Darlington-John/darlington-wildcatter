"use client";
import Image from "next/image";
import logo from "~/public/images/logo.svg";
import bag from "~/public/icons/bag.svg";
import logoRed from "~/public/images/logo-red.svg";
import bagRed from "~/public/icons/bag-red.svg";
import { useMainContext } from "../context/context";
import { Sling as Hamburger } from "hamburger-react";
import logoYellow from "~/public/images/logo-yellow.svg";
import bagYellow from "~/public/icons/bag-yellow.svg";
const Header = () => {
  const {
    toggleOverlay,
    isOverlayOpen,
    onHover,
    onHoverEnd,
    loadPage,
    fillColor,
    toggleBag,
  } = useMainContext();
  return (
    <header className="flex items-center justify-between w-full fixed px-4  top-6 z-[80] max-lg:top-4">
      <Image
        src={
          fillColor === "#000"
            ? logo
            : fillColor === "#cc8a00"
            ? logoYellow
            : logoRed
        }
        alt="logo"
        className="w-[200px] max-lg:w-[160px]"
        onMouseEnter={onHover}
        onMouseLeave={onHoverEnd}
        onClick={() => loadPage("red", `/`)}
      />
      <div className="flex gap-3 max-lg:gap-2  max-xs:gap-1">
        <div
          onClick={toggleOverlay}
          className={`relative z-[120]   flex items-center jusify-center   cursor-none  max-lg:scale-[0.8]  `}
          onMouseEnter={onHover}
          onMouseLeave={onHoverEnd}
        >
          <Hamburger
            toggled={isOverlayOpen}
            duration={0.6}
            color={fillColor}
            size={40}
          />
        </div>

        <Image
          src={
            fillColor === "#d12e24"
              ? bagRed
              : fillColor === "#cc8a00"
              ? bagYellow
              : bag
          }
          alt=""
          className="w-10 max-lg:w-8"
          onMouseEnter={onHover}
          onMouseLeave={onHoverEnd}
          onClick={toggleBag}
        />
      </div>
    </header>
  );
};

export default Header;
