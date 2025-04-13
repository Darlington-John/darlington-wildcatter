"use client";
import { CartItem } from "~/lib/data/cart";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { gearsDummy } from "~/lib/data/gears/gears";
import { Gear } from "~/lib/data/gears/type";

interface GearsContextType {
  gears: Gear[];
  setGears: React.Dispatch<React.SetStateAction<Gear[]>>;
  loadingGears: boolean;
  setLoadingGears: React.Dispatch<React.SetStateAction<boolean>>;
  errorFetchingGears: boolean;
  setErrorFetchingGears: React.Dispatch<React.SetStateAction<boolean>>;
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}
export const GearsContext = createContext<GearsContextType | null>(null);

export const GearsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [gears, setGears] = useState<Gear[]>(gearsDummy);
  const [loadingGears, setLoadingGears] = useState(true);
  const [errorFetchingGears, setErrorFetchingGears] = useState(false);
  useEffect(() => {
    const fetchGears = async () => {
      setLoadingGears(true);
      try {
        const res = await fetch("/api/gears/fetch-gears", {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setGears(data.gears);
          console.log("Gears", data.gears);

          setErrorFetchingGears(false);
        } else {
          setErrorFetchingGears(true);
        }
      } catch (err) {
        console.error("Error fetching Gears:", err);
        setErrorFetchingGears(true);
      } finally {
        setLoadingGears(false);
      }
    };

    fetchGears().catch((error) => console.error("Error", error));
    const interval = setInterval(fetchGears, 5 * 60 * 1000);

    const handleCustomDispatch = () => {
      fetchGears().catch((error) =>
        console.error("Error fetching gears during custom dispatch:", error)
      );
    };

    window.addEventListener("customGearsUpdate", handleCustomDispatch);

    return () => {
      clearInterval(interval);
      window.removeEventListener("customGearsUpdate", handleCustomDispatch);
    };
  }, []);

  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const updateCart = () => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    };

    // Initial load
    updateCart();

    // Listen for updates
    window.addEventListener("bagUpdated", updateCart);

    // Cleanup
    return () => {
      window.removeEventListener("bagUpdated", updateCart);
    };
  }, []);
  const providerValue = useMemo(
    () => ({
      gears,
      setGears,
      loadingGears,
      setLoadingGears,
      errorFetchingGears,
      setErrorFetchingGears,
      cart,
      setCart,
    }),
    [
      gears,
      setGears,
      loadingGears,
      setLoadingGears,
      errorFetchingGears,
      setErrorFetchingGears,
      cart,
      setCart,
    ]
  );

  return (
    <GearsContext.Provider value={providerValue}>
      {children}
    </GearsContext.Provider>
  );
};

export const useGearsContext = (): GearsContextType => {
  const context = useContext(GearsContext);
  if (!context) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
};
