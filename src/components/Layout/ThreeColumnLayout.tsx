// src/components/Layout/ThreeColumnLayout.tsx

import chroma from "chroma-js";
import clsx from "clsx";
import { type FC } from "react";
import toast from "react-hot-toast";
import { NavLink, Outlet } from "react-router-dom";

import { useColorStore } from "@/store/colorStore";

import ColorCard from "../ColorCard/ColorCard";
import UIComponentsPanel from "../FakeComponents/UIComponentsPanel";

import { HEADER_BUTTONS } from "./layoutConstant";

/**
 * Three Column layout component, that serves as a wrapper for the home page.
 */
const ThreeColumnLayout: FC = () => {
  const colorCards = useColorStore((state) => state.colorCards);
  const addColorCard = useColorStore((state) => state.addColorCard);

  return (
    <div className="grid h-screen grid-cols-12">
      {/* Column 1 */}
      <aside
        className="col-span-3 flex flex-col items-center overflow-y-auto border-r border-slate-300 py-4"
        data-testid="column-1"
      >
        <h1 className="mb-4 text-sm">
          <span className="rounded-l-sm border border-r-0 border-slate-900 bg-purple-200 px-2 py-1 font-bold">
            CC
          </span>
          <span className="rounded-r-sm border border-slate-900 px-2 py-1">Color Conjure</span>
        </h1>

        <button
          className="cursor-pointer place-content-center rounded-sm border border-slate-900 bg-blue-700 px-2 py-1 text-sm text-blue-50 transition-colors hover:bg-slate-700 hover:text-slate-50"
          onClick={() => addColorCard()}
          title="Add Color Card"
        >
          Add Color Card
        </button>

        <div className="grid w-full grid-cols-1 gap-4 overflow-y-auto px-2">
          {colorCards.length > 0 ? (
            colorCards.map((card) => <ColorCard key={card.id} cardId={card.id} />)
          ) : (
            <div className="my-2 text-center text-blue-400">
              Click on <strong>Add Color Card</strong> to add a new one
            </div>
          )}
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

          {colorCards.map((card) =>
            card.generatedShades && card.generatedShades.length > 0 ? (
              <div key={card.id} className="my-4">
                <h2 className="mb-2 text-sm font-bold">{card.name} shade</h2>
                <div className="flex flex-wrap gap-0.5">
                  {card.generatedShades.map((shade, index) => (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(shade);
                        toast.success(`Copied ${shade} to clipboard`, {
                          duration: 2000,
                          position: "top-center",
                          style: {
                            backgroundColor: shade,
                            color: chroma(shade).luminance() > 0.5 ? "#000" : "#fff",
                          },
                          iconTheme: {
                            primary: chroma(shade).luminance() > 0.5 ? "#000" : "#fff",
                            secondary: shade,
                          },
                        });
                      }}
                      key={index}
                    >
                      <div
                        key={index}
                        className="h-10 w-10 rounded-sm border border-slate-900"
                        style={{ backgroundColor: shade }}
                        title={shade}
                      ></div>
                    </button>
                  ))}
                </div>
              </div>
            ) : null,
          )}
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

        <UIComponentsPanel />
      </aside>
    </div>
  );
};

export default ThreeColumnLayout;
