import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "./context/context";
import CustomCursor from "./components/custom-cursor";
import localFont from "next/font/local";
import Header from "./components/header";
import Overlay from "./components/overlay";
import CornerExplosion from "./components/corner-explosion";
import NewPageLoader from "./components/new-page-loader";
import { GearsProvider } from "./context/gears-context";
import Bag from "./components/bag";

const GTBold = localFont({
  src: "./fonts/GT-Ultra-Standard-Bold-Trial.otf",
  variable: "--font-gt-bold",
});

const GTBlack = localFont({
  src: "./fonts/GT-Ultra-Standard-Black-Trial.otf",
  variable: "--font-gt-black",
});

const GTReg = localFont({
  src: "./fonts/GT-Ultra-Standard-Regular-Trial.otf",
  variable: "--font-gt-reg",
});
const GTLight = localFont({
  src: "./fonts/GT-Ultra-Standard-Light-Trial.otf",
  variable: "--font-gt-light",
});
const GTComp = localFont({
  src: "./fonts/GT-America-Compressed-Black-Trial.otf",
  variable: "--font-gt-comp",
});
const ThunderBold = localFont({
  src: "./fonts/Thunder-Bold.ttf",
  variable: "--font-thunder-bold",
});
export const metadata: Metadata = {
  title: "WILDCATTER- Let's blow shit up",
  description: "By Darlington",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GTBlack.variable}  ${GTBold.variable}  ${GTLight.variable} ${GTReg.variable}   ${GTComp.variable} ${ThunderBold.variable}  antialiased`}
      >
        <Provider>
          <GearsProvider>
            <CustomCursor />
            <Header />
            <Bag />
            <CornerExplosion />
            <NewPageLoader />
            <Overlay />
            {children}
          </GearsProvider>
        </Provider>
      </body>
    </html>
  );
}
