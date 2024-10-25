import React from "react";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100  p-6 mt-8 flex flex-col sm:flex-row justify-between items-center ">
      {/* Left section: Brand name */}
      <div className="flex items-center">
        <h1 className="text-lg font-bold">Color Conjure</h1>
      </div>

      {/* Center section: Text with link */}
      <div className="text-center text-sm text-gray-600 mt-4 sm:mt-0">
        <p>
          This website uses{" "}
          <a
            href="https://seline.so/"
            target="_blank"
            className="text-blue-500 underline"
            rel="noopener noreferrer"
          >
            Seline
          </a>{" "}
          for tracking, but it is privacy friendly and does not use cookies.
          More details can be found on their website.
        </p>
        <p className="mt-2">&copy; 2024. All rights reserved.</p>
      </div>

      {/* Right section: GitHub icon */}
      <div className="mt-4 sm:mt-0">
        <a
          href="https://github.com/utk09-NCL/color-palette-generator"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-black"
        >
          <FaGithub size={30} />
        </a>
      </div>
    </footer>
  );
}

