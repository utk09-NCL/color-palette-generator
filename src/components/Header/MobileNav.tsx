// src/components/Header/MobileNav.tsx

import { type ReactElement } from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

export type MobileNavProps = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

/**
 *
 * @param {MobileNavProps} props
 * @returns {ReactElement} A React component that renders the mobile navigation menu
 */
const MobileNav = ({ isMenuOpen, toggleMenu }: MobileNavProps): ReactElement => (
  <div
    data-testid="mobile-menu"
    className={`fixed left-0 top-0 z-50 h-full w-64 transform bg-headerBackground transition-transform duration-300 ease-in-out ${
      isMenuOpen ? "translate-x-0" : "-translate-x-full"
    }`}
  >
    <div className="flex items-center justify-between border-b border-gray-200 p-4">
      <h1 className="text-[20px] font-bold text-headerBrand">Menu</h1>
      <button
        onClick={toggleMenu}
        className="text-2xl text-gray-500"
        data-testid="close-menu-button"
      >
        <FaTimes />
      </button>
    </div>
    <div className="flex flex-col space-y-4 p-4">
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
        className="cursor-pointer text-[16px] font-semibold"
        target="_blank"
        rel="noreferrer"
        data-testid="mobile-github-link"
      >
        GitHub
      </a>
    </div>
  </div>
);

export default MobileNav;
