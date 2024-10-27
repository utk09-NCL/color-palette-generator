import { useState, useEffect } from "react";
import { FaGithub, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const renderMobileNav = () => (
    <div
      data-testid="mobile-menu"
      className={`fixed top-0 left-0 h-full w-64 bg-headerBackground z-50 transition-transform duration-300 ease-in-out transform ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-between p-4 items-center border-b border-gray-200">
        <h1 className="text-[20px] font-bold text-headerBrand">Menu</h1>
        <button
          onClick={toggleMenu}
          className="text-gray-500 text-2xl"
          data-testid="close-menu-button"
        >
          <FaTimes />
        </button>
      </div>
      <div className="flex flex-col p-4 space-y-4">
        <Link
          to="/"
          onClick={toggleMenu}
          className="text-[16px] font-semibold"
          data-testid="mobile-home-link"
        >
          Home
        </Link>
        <a
          href="https://github.com/utk09-NCL/color-palette-generator/"
          onClick={toggleMenu}
          className="text-[16px] font-semibold cursor-pointer"
          target="_blank"
          rel="noreferrer"
          data-testid="mobile-github-link"
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
        <header className="bg-headerBackground fixed top-0 w-full z-50 p-4 lg:hidden">
          <div className="relative flex items-center justify-between w-full">
            <button
              onClick={toggleMenu}
              className="text-gray-500 text-2xl focus:outline-none"
              data-testid="hamburger-button"
            >
              <FaBars />
            </button>
            <h1 className="text-[20px] font-extrabold text-headerBrand whitespace-nowrap">
              Color Conjure
            </h1>
            <a
              href="https://github.com/utk09-NCL/color-palette-generator/"
              className="w-6 h-6 cursor-pointer"
              target="_blank"
              rel="noreferrer"
              data-testid="mobile-github-icon"
            >
              <FaGithub className="w-full h-full" />
            </a>
          </div>
        </header>
        {renderMobileNav()}
      </>

      <header
        className="bg-headerBackground transition-all duration-300 ease-in-out w-full hidden lg:block"
        style={headerStyle}
        data-testid="desktop-header"
      >
        <div className="relative flex items-center justify-between p-4 w-full">
          <h1 className="text-[20px] md:text-[24px] font-extrabold text-headerBrand whitespace-nowrap">
            Color Conjure
          </h1>

          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link
              to="/"
              className="text-[16px] md:text-[20px] font-semibold"
              data-testid="desktop-home-link"
            >
              Home
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/utk09-NCL/color-palette-generator/"
              className="w-6 h-6 md:w-8 md:h-8 cursor-pointer"
              target="_blank"
              rel="noreferrer"
              data-testid="desktop-github-link"
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
