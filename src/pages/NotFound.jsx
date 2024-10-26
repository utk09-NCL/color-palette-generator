import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

import Button from "../components/Shared/Button";
import { generateRandomBackgroundColor } from "../utils/colorUtils";

const NotFound = () => {
  const [backgroundColors, setBackgroundColors] = useState([]);

  useMemo(() => {
    setBackgroundColors(generateRandomBackgroundColor());
  }, []);

  return (
    <div
      id="not-found"
      className="h-screen flex pt-52 justify-center"
      style={{
        background: `linear-gradient(to right, ${backgroundColors[0]} 35%, ${backgroundColors[1]})`,
      }}
    >
      <div
        className="p-4 border-2 h-3/6 w-1/2 border-gray-200 rounded-xl mx-auto text-center"
        style={{
          background: "rgba(0, 0, 0, 0.21)",
          backdropFilter: "blur(6.7px)",
          WebkitBackdropFilter: "blur(6.7px)",
        }}
      >
        <p className=" mt-4 text-base font-semibold text-slate-50">404</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-50">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-slate-200">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Button className="mt-10 text-slate-50 w-80 bg-slate-900 border-none align-middle  hover:bg-slate-800">
          <Link to="/">
            Go back to Color Conjure <FaArrowRightLong className="inline" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
