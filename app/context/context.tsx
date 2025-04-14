"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import IntroLoader from "../components/intro-loader";
import { usePathname, useRouter } from "next/navigation";
import { usePopup } from "~/lib/utils/toggle-popups";

interface MainContextType {
  position: { x: number; y: number };
  setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  isHovered: boolean;

  onHover: () => void;
  onHoverEnd: () => void;
  toggleOverlay: () => void;
  containerStyle: React.CSSProperties;
  isOverlayOpen: boolean;
  setIsOverlayOpen: React.Dispatch<React.SetStateAction<boolean>>;
  explodeColor: string;
  setExplodeColor: React.Dispatch<React.SetStateAction<string>>;
  cornerExplode: boolean;
  setCornerExplode: React.Dispatch<React.SetStateAction<boolean>>;
  explodeCorner: (color: string) => void;
  displayLoader: boolean;
  setDisplayLoader: React.Dispatch<React.SetStateAction<boolean>>;
  selectedVideo: string;
  setSelectedVideo: React.Dispatch<React.SetStateAction<string>>;
  loadPage: (video: string, page: string) => void;
  fillColor: string;
  setFillColor: React.Dispatch<React.SetStateAction<string>>;
  bgColor: string;
  setBgColor: React.Dispatch<React.SetStateAction<string>>;
  prepUnload: boolean;
  setPrepUnload: React.Dispatch<React.SetStateAction<boolean>>;
  bag: boolean;
  bagRef: React.RefObject<HTMLDivElement | null>;
  isBagVisible: boolean;
  toggleBag: () => void;
  canStart: boolean;
  setCanStart: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MainContext = createContext<MainContextType | null>(null);

export const Provider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // useEffect(() => {
  //   const handleResize = () => {
  //     window.location.reload();
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);
  const initCart = () => {
    if (typeof window !== "undefined") {
      const existingCart = localStorage.getItem("cart");
      if (!existingCart) {
        localStorage.setItem("cart", JSON.stringify([]));
      }
    }
  };
  useEffect(() => {
    initCart();
  }, []);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", updatePosition);
    return () => document.removeEventListener("mousemove", updatePosition);
  }, []);

  const containerStyle = useMemo<React.CSSProperties>(
    () => ({
      top: `${position.y - 22}px`,
      left: `${position.x - 12}px`,
    }),
    [position]
  );

  const onHover = useCallback(() => {
    setIsHovered(true);
  }, []);

  const onHoverEnd = useCallback(() => {
    setIsHovered(false);
  }, []);
  const linkname = usePathname();
  const [isOverlayOpen, setIsOverlayOpen] = useState<boolean>(false);

  const [cornerExplode, setCornerExplode] = useState<boolean>(false);
  const [explodeColor, setExplodeColor] = useState<string>("#fff");

  const explodeCorner = useCallback((color: string) => {
    setCornerExplode(true);
    setExplodeColor(color);
    setTimeout(() => {
      setCornerExplode(false);
    }, 1000);
  }, []);
  const [fillColor, setFillColor] = useState<string>("#000");

  useEffect(() => {
    const colorMap: Record<string, string> = {
      "/": "#000",
      "/about": "#d12e24",
      "/work": "#000",
      "/sizzle": "#d12e24",
      "/gear": "#cc8a00",
      "/check-out": "#d12e24",
    };

    let newColor = colorMap[linkname];

    // Handle dynamic routes like /gear/something
    if (!newColor && /^\/gear\/.+/.test(linkname)) {
      newColor = "#d12e24";
    }

    setFillColor(newColor || "#000"); // fallback if no match
  }, [linkname]);

  const [bgColor, setBgColor] = useState<string>("#d12e24");
  useEffect(() => {
    const bgColorMap: Record<string, string> = {
      "/": "#d12e24",
      "/about": "#000",
      "/work": "#d12e24",
      "/sizzle": "#000",
      "/gear": "#000",
    };

    setBgColor(bgColorMap[linkname] || "#000");
  }, [linkname]);
  const previousFillColor = useRef<string | null>(null);

  const toggleOverlay = useCallback(() => {
    const overlayElement = document.getElementById("overlay");
    if (!overlayElement) return;

    if (overlayElement.style.width === "100%") {
      explodeCorner("#d12e24");
      setTimeout(() => {
        overlayElement.style.width = "0%";
        setIsOverlayOpen(false);
        if (previousFillColor.current !== null) {
          setFillColor(previousFillColor.current); // restore the old color
        }
      }, 500);
    } else {
      previousFillColor.current = fillColor; // store current color before changing it
      explodeCorner("#cc8a00");
      setFillColor("#000"); // or your overlay-specific color
      setTimeout(() => {
        overlayElement.style.width = "100%";
        setIsOverlayOpen(true);
      }, 500);
    }
  }, [explodeCorner, fillColor]);

  useEffect(() => {
    setIsOverlayOpen(false);
    const overlayElement = document.getElementById("overlay");
    if (!overlayElement) {
      return;
    }

    overlayElement.style.width = "0%";
  }, [linkname]);
  const [displayLoader, setDisplayLoader] = useState<boolean>(false);
  const [prepUnload, setPrepUnload] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string>("black");
  const router = useRouter();
  const loadPage = useCallback(
    (video: string, page: string) => {
      const overlayElement = document.getElementById("overlay");
      if (!overlayElement) {
        return;
      }
      setIsOverlayOpen(false);

      setSelectedVideo(video);
      setDisplayLoader(true);
      setTimeout(() => {
        router.push(page);
        overlayElement.style.width = "0%";
      }, 2500);
    },
    [router]
  );
  useEffect(() => {
    if (!linkname) return;
    const prepTimer = setTimeout(() => {
      setPrepUnload(true);
    }, 1000);

    const hideTimer = setTimeout(() => {
      setDisplayLoader(false);
      setPrepUnload(false);
    }, 2000);

    return () => {
      clearTimeout(prepTimer);
      clearTimeout(hideTimer);
    };
  }, [linkname]);
  const [canStart, setCanStart] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!canStart) {
      return;
    }
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, [canStart]);

  const {
    isVisible: isBagVisible,
    setIsVisible: setIsBagVisible,
    isActive: bag,
    ref: bagRef,
    togglePopup: toggleBag,
  } = usePopup();
  useEffect(() => setIsBagVisible(false), [linkname, setIsBagVisible]);
  const providerValue = useMemo(
    () => ({
      position,
      setPosition,
      isHovered,
      onHover,
      onHoverEnd,
      toggleOverlay,
      containerStyle,
      isOverlayOpen,
      setIsOverlayOpen,
      explodeColor,
      setExplodeColor,
      cornerExplode,
      setCornerExplode,
      explodeCorner,
      displayLoader,
      setDisplayLoader,
      selectedVideo,
      setSelectedVideo,
      loadPage,
      fillColor,
      setFillColor,
      bgColor,
      setBgColor,
      prepUnload,
      setPrepUnload,
      bag,
      bagRef,
      isBagVisible,
      toggleBag,
      canStart,
      setCanStart,
    }),
    [
      position,
      isHovered,
      onHover,
      onHoverEnd,
      containerStyle,
      toggleOverlay,
      isOverlayOpen,
      setIsOverlayOpen,
      explodeColor,
      setExplodeColor,
      cornerExplode,
      setCornerExplode,
      explodeCorner,
      displayLoader,
      setDisplayLoader,
      selectedVideo,
      setSelectedVideo,
      loadPage,
      fillColor,
      setFillColor,
      bgColor,
      setBgColor,
      prepUnload,
      setPrepUnload,
      bag,
      bagRef,
      isBagVisible,
      toggleBag,
      canStart,
      setCanStart,
    ]
  );

  return (
    <MainContext.Provider value={providerValue}>
      {loading && <IntroLoader />}

      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = (): MainContextType => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("useCursor must be used within a Provider");
  }
  return context;
};
