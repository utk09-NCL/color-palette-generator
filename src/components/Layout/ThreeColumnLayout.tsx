// src/components/Layout/ThreeColumnLayout.tsx

import chroma from "chroma-js";
import { FC, useEffect } from "react";
import toast from "react-hot-toast";

import { usePaletteStore } from "@/store";
import { createInitialColorCardState } from "@/store/colorTypes";

import ColorCard from "../ColorCard/ColorCard";
import UIComponentsPanel from "../FakeComponents/UIComponentsPanel";
import NavBar from "../NavBar/NavBar";

/**
 * Three Column layout component, the home page of the app.
 * It consists of:
 * - Column 1: Color Cards
 * - Column 2: Main content area with NavBar and color shade previews
 * - Column 3: UI Components Panel
 */
const ThreeColumnLayout: FC = () => {
  const palettes = usePaletteStore((state) => state.palettes);
  const addPalette = usePaletteStore((state) => state.addPalette);
  const loadPalettes = usePaletteStore((state) => state.loadPalettes);

  // Helper to create and persist a new palette
  const handleAddPalette = (): void => {
    const id = Date.now().toString();
    const newPalette = createInitialColorCardState(id);
    addPalette(newPalette).catch((err) => console.error(err));
  };

  useEffect(() => {
    loadPalettes();
  }, [loadPalettes]);

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
          onClick={handleAddPalette}
          title="Add Color Card"
        >
          Add Color Card
        </button>

        <div className="grid w-full grid-cols-1 gap-4 overflow-y-auto px-2">
          {palettes.length > 0 ? (
            palettes.map((card) => <ColorCard key={card.id} cardId={card.id} />)
          ) : (
            <div className="my-2 text-center text-blue-400">
              Click on <strong>Add Color Card</strong> to add a new one
            </div>
          )}
        </div>
      </aside>
      {/* Column 2 */}
      <main className="col-span-6 flex flex-col" data-testid="column-2">
        <NavBar />
        <section className="flex-1 overflow-y-auto p-4">
          {palettes.map((card) =>
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
