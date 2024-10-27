// src/pages/NotFound.tsx

import { useMemo, useState, type ReactElement } from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

import Button from "@components/Shared/Button";
import { generateRandomBackgroundColor, type RandomBackgroundColor } from "@utils/colorUtils";

/**
 * The NotFound component displays a 404 page with a randomly generated background gradient.
 *
 * @returns {ReactElement} The NotFound component.
 */
const NotFound = (): ReactElement => {
  // State to store the random background colors for the gradient.
  const [backgroundColors, setBackgroundColors] = useState<RandomBackgroundColor>(
    generateRandomBackgroundColor(),
  );

  // Generate random background colors for the gradient. This will only run once when the component is mounted.
  useMemo(() => {
    setBackgroundColors(generateRandomBackgroundColor());
  }, []);

  return (
    <div
      id="not-found"
      className="flex h-screen justify-center pt-52"
      style={{
        background: `linear-gradient(to right, ${backgroundColors[0]} 35%, ${backgroundColors[1]})`,
      }}
    >
      <div
        className="mx-auto h-3/6 w-1/2 rounded-xl border-2 border-gray-200 p-4 text-center"
        style={{
          background: "rgba(0, 0, 0, 0.21)",
          backdropFilter: "blur(6.7px)",
          WebkitBackdropFilter: "blur(6.7px)",
        }}
      >
        <p className="mt-4 text-base font-semibold text-slate-50">404</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-50">Page not found</h1>
        <p className="mt-6 text-base leading-7 text-slate-200">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Button className="mt-10 w-80 border-none bg-slate-900 align-middle text-slate-50 hover:bg-slate-800">
          <Link to="/">
            Go back to Color Conjure <FaArrowRightLong className="inline" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
