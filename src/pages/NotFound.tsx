// src/pages/NotFound.tsx

import { type FC } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

/**
 * The NotFound component displays a 404 page with a randomly generated background gradient.
 *
 */
const NotFound: FC = () => {
  return (
    <Link to="/">
      <div
        id="not-found"
        className="flex h-screen cursor-pointer justify-center pt-52"
        style={{
          background: `linear-gradient(to right, #81b9ff 35%, #03527a)`,
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
          <button className="mt-10 w-80 rounded-lg border-none bg-slate-900 p-2 align-middle text-slate-50 hover:bg-slate-800">
            Go back to Color Conjure <FaArrowRightLong className="inline" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default NotFound;
