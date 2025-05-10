import { type ReactElement } from "react";

/**
 * ColorCard component is the parent component for the color card.
 * It has dropdown for color name selection.
 * It has input boxes for different color types & values (HEX, RGBA, HSL, CMYK, LCH), number of shades to generate.
 * It has a color preview box.
 * It has icon buttons for eyedropper, save, add, delete.
 * @returns {ReactElement} The rendered ColorCard component.
 */
const ColorCard = (): ReactElement => {
  return (
    <div className="flex w-full bg-white p-4 shadow-sm">
      {/* Row 1 */}
      <div className="flex w-full flex-row items-center space-x-4">
        <select className="rounded-sm border border-slate-900 px-2 py-2 text-sm">
          <option value="primary">Primary</option>
          <option value="primary">Secondary</option>
          <option value="primary">Tertiary</option>
        </select>
        <div className="flex w-full flex-row items-center space-x-2">
          <div className="h-10 w-10 rounded-sm border border-slate-900 bg-blue-400"></div>
          <button className="h-10 w-10 cursor-pointer rounded-sm border border-slate-900 px-2 py-1 text-sm hover:bg-slate-700 hover:text-white">
            E
          </button>
          <button className="h-10 w-10 cursor-pointer rounded-sm border border-slate-900 px-2 py-1 text-sm hover:bg-slate-700 hover:text-white">
            S
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorCard;
