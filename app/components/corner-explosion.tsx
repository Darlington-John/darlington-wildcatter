"use client";
import { useMainContext } from "../context/context";

const CornerExplosion = () => {
  const { explodeColor, cornerExplode } = useMainContext();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={256}
      height={256}
      fill="none"
      className={`fixed top-0 right-[0%] z-[70]   origin-top-right duration-300 pointer-events-none  transition-opacity  duration-150  ${
        cornerExplode ? "corner-explode  " : "scale-0  "
      }`}
    >
      <path
        fill={explodeColor}
        d="M256 256c-5.623-215.261-11.032-216.21-99.644-20.119 78.817-200.237 74.524-203.386-81.377-54.86C223.505 25.12 220.356 20.827 20.119 99.644 216.217 11.039 215.26 5.624 0 0h256v256Z"
      />
    </svg>
  );
};

export default CornerExplosion;
