import React from 'react';
import { FaGithub } from 'react-icons/fa'; 

const Footer = () => {
  return (
    <footer className="bg-blue-100 p-4 flex justify-between items-center fixed bottom-0 w-full">
      {/* NAme*/}
      <div className="text-lg font-bold text-gray-700">
        Color Conjure
      </div>

      {/* Disclaimer */}
      <div className="text-center text-sm text-gray-600">
        <p>
          This website uses{' '}
          <a
            href="https://seline.so/" // Replace with actual link
            className="text-orange-500 underline hover:text-orange-600"
          >
            Seline </a>for tracking, but it is privacy friendly and does not use cookies. More details can be found on their website.
        </p>
      </div>

      {/* Right Section: GitHub Icon */}
      <div>
        <a href="https://github.com/utk09-NCL/color-palette-generator" target="_blank" rel="noopener noreferrer">
          <FaGithub size={24} className="text-gray-700 hover:text-gray-900" />
        </a>
      </div>

      {/* Bottom Section: Copyright */}
      <div className="absolute bottom-[-20px] text-xs text-gray-500 w-full text-center">
        Copyright ©️ 2024. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
