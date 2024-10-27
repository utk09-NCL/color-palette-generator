// src/components/Header/Header.tsx

import { useState, useEffect, type ReactElement, type CSSProperties } from "react";
import { FaGithub, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

import MobileNav from "./MobileNav";

const Header = (): ReactElement => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollPosition = window.scrollY;
      const maxScroll = 10;
      const progress = scrollPosition > maxScroll ? 1 : scrollPosition / maxScroll;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerStyle: CSSProperties = {
    width: `${100 - (1 - scrollProgress) * 20}%`,
    maxWidth: "1536px",
    transform: `scale(${0.9 + scrollProgress * 0.1})`,
    borderRadius: `${(1 - scrollProgress) * 0.75}rem`,
  };

  const toggleMenu = (): void => setIsMenuOpen((prev) => !prev);

  return (
    <div
      className={`${
        scrollProgress > 0 ? "pt-0" : "pt-4"
      } fixed top-0 z-50 flex w-full items-center justify-center transition-all duration-300 ease-in-out`}
    >
      <>
        <header className="fixed top-0 z-50 w-full bg-headerBackground p-4 lg:hidden">
          <div className="relative flex w-full items-center justify-between">
            <button
              onClick={toggleMenu}
              className="text-2xl text-gray-500 focus:outline-none"
              data-testid="hamburger-button"
            >
              <FaBars />
            </button>
            <h1 className="whitespace-nowrap text-[20px] font-extrabold text-headerBrand">
              Color Conjure
            </h1>
            <a
              href="https://github.com/utk09-NCL/color-palette-generator/"
              className="h-6 w-6 cursor-pointer"
              target="_blank"
              rel="noreferrer"
              data-testid="mobile-github-icon"
            >
              <FaGithub className="h-full w-full" />
            </a>
          </div>
        </header>
        {/* Use the MobileNav component */}
        <MobileNav isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </>

      <header
        className="hidden w-full bg-headerBackground transition-all duration-300 ease-in-out lg:block"
        style={headerStyle}
        data-testid="desktop-header"
      >
        <div className="relative flex w-full items-center justify-between p-4">
          <h1 className="whitespace-nowrap text-[20px] font-extrabold text-headerBrand md:text-[24px]">
            Color Conjure
          </h1>

          <div className="absolute left-1/2 -translate-x-1/2 transform">
            <Link
              to="/"
              className="text-[16px] font-semibold md:text-[20px]"
              data-testid="desktop-home-link"
            >
              Home
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/utk09-NCL/color-palette-generator/"
              className="h-6 w-6 cursor-pointer md:h-8 md:w-8"
              target="_blank"
              rel="noreferrer"
              data-testid="desktop-github-link"
            >
              <FaGithub className="h-full w-full" />
            </a>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
