import { useState, useEffect } from "react";

const useIsDesktop = () => {
  const desktopWidth = 1024;
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > desktopWidth);
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > desktopWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return [isDesktop, setIsDesktop];
};
export default useIsDesktop;
