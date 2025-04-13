import { useState, useEffect } from "react";

const useToggle = (int: number) => {
  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setToggle((prev) => !prev);
    }, int);

    return () => clearInterval(interval);
  }, [int]);

  return toggle;
};

export default useToggle;
