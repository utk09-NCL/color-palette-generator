// src/components/Layout/ThreeColumnLayout.tsx

import clsx from "clsx";
import { type FC } from "react";
import { NavLink, Outlet } from "react-router-dom";

import ColorCard from "../ColorCard/ColorCard";

import { HEADER_BUTTONS } from "./layoutConstant";

/**
 * Three Column layout component, that serves as a wrapper for the home page.
 */
const ThreeColumnLayout: FC = () => {
  return (
    <div className="grid h-screen grid-cols-12">
      {/* Column 1 */}
      <aside
        className="col-span-3 flex flex-col items-center overflow-y-auto border-r border-slate-300 py-4"
        data-testid="column-1"
      >
        <h1 className="text-sm">
          <span className="rounded-l-sm border border-r-0 border-slate-900 bg-purple-200 px-2 py-1 font-bold">
            CC
          </span>
          <span className="rounded-r-sm border border-slate-900 px-2 py-1">Color Conjure</span>
        </h1>

        <div className="grid grid-cols-1 gap-4">
          <ColorCard />
        </div>
      </aside>
      {/* Column 2 */}
      <main className="col-span-6 flex flex-col" data-testid="column-2">
        <nav className="sticky top-0 z-50 flex justify-around bg-slate-100 p-4 shadow-sm">
          {HEADER_BUTTONS.map(({ name, route }) => (
            <NavLink
              key={name}
              to={route}
              className={({ isActive }) =>
                clsx(
                  "rounded-sm border border-slate-900 px-2 py-1 text-sm transition-colors",
                  isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-900 hover:bg-slate-700 hover:text-white",
                )
              }
            >
              {name}
            </NavLink>
          ))}
        </nav>

        <section className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </section>
      </main>
      {/* Column 3 */}
      <aside
        className="col-span-3 overflow-y-auto border-l border-slate-300 py-4 text-center"
        data-testid="column-3"
      >
        <h1 className="inline-block rounded-sm border border-slate-900 px-2 py-1 text-sm">
          UI Components
        </h1>

        <p className="my-10 text-sm text-slate-600">Components will be here...</p>
      </aside>
    </div>
  );
};

export default ThreeColumnLayout;
