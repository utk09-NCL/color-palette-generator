import { useState, useEffect, memo } from "react";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = 10;
      const progress =
        scrollPosition > maxScroll ? 1 : scrollPosition / maxScroll;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerStyle = {
    width: `${100 - (1 - scrollProgress) * 20}%`,
    maxWidth: "1536px",
    transform: `scale(${0.9 + scrollProgress * 0.1})`,
    borderRadius: `${(1 - scrollProgress) * 0.75}rem`,
  };

  return (
    <div
      className={`${scrollProgress > 0 ? "pt-0" : "pt-4"} sticky z-[9999] top-0 w-full flex justify-center items-center transition-all duration-300 ease-in-out`}
    >
      <header
        className="bg-headerBackground transition-all duration-300 ease-in-out w-full"
        style={headerStyle}
      >
        <div className="relative flex items-center justify-between p-4 w-full">
          <h1 className="text-[24px] font-extrabold text-headerBrand whitespace-nowrap">
            Color Conjure
          </h1>

          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link to={"/"} className="text-[20px] font-semibold">
              Home
            </Link>
          </div>

          <div>
            <Link to={"https://github.com/utk09-NCL/color-palette-generator/"}>
              <FaGithub className="w-8 h-8" />
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default memo(Header);
