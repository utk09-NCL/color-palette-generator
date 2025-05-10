// src/components/Layout/ThreeColumnLayout.tsx

import { type ReactElement } from "react";
import { Outlet } from "react-router-dom";

import ColorCard from "../ColorCard/ColorCard";

import { HEADER_BUTTONS } from "./layoutConstant";

/**
 * Three Column layout component, that serves as a wrapper for the home page.
 *
 * @returns {ReactElement} The rendered layout component.
 */
const ThreeColumnLayout = (): ReactElement => {
  return (
    <div className="grid grid-cols-12 gap-0">
      {/* Column 1 */}
      <div
        className="col-span-3 flex w-full flex-col items-center justify-around border-r border-slate-300 py-4"
        data-testid="column-1"
      >
        <div className="flex flex-row items-center justify-center">
          <h1 className="text-sm">
            <span className="rounded-l-sm border-t border-b border-l border-slate-900 bg-purple-200 px-2 py-1 text-sm font-bold">
              CC
            </span>
            <span className="rounded-r-sm border border-slate-900 px-2 py-1 text-sm">
              Color Conjure
            </span>
          </h1>
        </div>
        <div className="flex flex-row items-center justify-center py-2">
          <ColorCard />
        </div>
      </div>
      {/* Column 2 */}
      <div className="col-span-6 bg-white" data-testid="column-2">
        <header className="sticky top-0 z-50 flex w-full items-center justify-around bg-slate-100 p-4 shadow-sm">
          {HEADER_BUTTONS.map((eachButton) => (
            <button
              key={eachButton.name}
              className="cursor-pointer rounded-sm border border-slate-900 px-2 py-1 text-sm hover:bg-slate-700 hover:text-white"
            >
              {eachButton.name}
            </button>
          ))}
        </header>
      </div>
      {/* Column 3 */}
      <div
        className="col-span-3 flex w-full items-center justify-around border-l border-slate-300"
        data-testid="column-3"
      >
        <h1 className="rounded-sm border border-slate-900 px-2 py-1 text-sm">UI Components</h1>
      </div>
      <Outlet />
    </div>
  );
};

export default ThreeColumnLayout;
