import { useState, useEffect } from "react";
import { FaGithub, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // To control the mobile slider

  // Detect if the device is mobile using a media query hook

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

  // Toggle menu open/close
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Mobile slider navigation
  const renderMobileNav = () => (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-headerBackground z-50 transition-transform duration-300 ease-in-out transform ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-between p-4 items-center border-b border-gray-200">
        <h1 className="text-[20px] font-bold text-headerBrand">Menu</h1>
        <button onClick={toggleMenu} className="text-gray-500 text-2xl">
          <FaTimes />
        </button>
      </div>
      <div className="flex flex-col p-4 space-y-4">
        <Link to="/" onClick={toggleMenu} className="text-[16px] font-semibold">
          Home
        </Link>
        <a
          href="https://github.com/utk09-NCL/color-palette-generator/"
          onClick={toggleMenu}
          className="text-[16px] font-semibold cursor-pointer"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </div>
    </div>
  );

  return (
    <div
      className={`${
        scrollProgress > 0 ? "pt-0" : "pt-4"
      } fixed top-0 z-50 w-full flex justify-center items-center transition-all duration-300 ease-in-out`}
    >
      <>
        {/* Mobile View */}
        <header className="bg-headerBackground fixed top-0 w-full z-50 p-4 lg:hidden">
          <div className="relative flex items-center justify-between w-full">
            {/* Hamburger Icon */}
            <button
              onClick={toggleMenu}
              className="text-gray-500 text-2xl focus:outline-none"
            >
              <FaBars />
            </button>
            {/* Logo */}
            <h1 className="text-[20px] font-extrabold text-headerBrand whitespace-nowrap">
              Color Conjure
            </h1>
            {/* GitHub Link */}
            <a
              href="https://github.com/utk09-NCL/color-palette-generator/"
              className="w-6 h-6 cursor-pointer"
            >
              <FaGithub className="w-full h-full" />
            </a>
          </div>
        </header>
        {/* Render Mobile Nav Slider */}
        {renderMobileNav()}
      </>

      <header
        className="bg-headerBackground transition-all duration-300 ease-in-out w-full hidden lg:block"
        style={headerStyle}
      >
        <div className="relative flex items-center justify-between p-4 w-full">
          {/* Logo */}
          <h1 className="text-[20px] md:text-[24px] font-extrabold text-headerBrand whitespace-nowrap">
            Color Conjure
          </h1>

          {/* Navigation Link - Centered */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link to="/" className="text-[16px] md:text-[20px] font-semibold">
              Home
            </Link>
          </div>

          {/* GitHub Link - Right Side */}
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/utk09-NCL/color-palette-generator/"
              className="w-6 h-6 md:w-8 md:h-8 cursor-pointer"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub className="w-full h-full" />
            </a>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
