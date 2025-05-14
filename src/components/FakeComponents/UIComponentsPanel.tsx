import { type FC, useState } from "react";

const UIComponentsPanel: FC = () => {
  const [primaryColor, setPrimaryColor] = useState("#101010");
  const [secondaryColor, setSecondaryColor] = useState("#f0f0f0");

  return (
    <div className="p-2">
      <div className="mb-4 flex flex-col gap-4">
        <div className="grid grid-cols-4 items-center gap-1">
          <label htmlFor="primaryColor" className="col-span-1 block text-left text-sm font-bold">
            Primary Color
          </label>
          <input
            type="text"
            id="primaryColor"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="col-span-2 mt-1 w-full rounded border border-slate-300 p-2"
            placeholder="Enter primary color"
          />
          <div
            className="h-10 w-10 rounded-sm border border-slate-900"
            style={{ backgroundColor: primaryColor }}
          ></div>
        </div>
        <div className="grid grid-cols-4 items-center gap-1">
          <label htmlFor="secondaryColor" className="col-span-1 block text-left text-sm font-bold">
            Secondary Color
          </label>
          <input
            type="text"
            id="secondaryColor"
            value={secondaryColor}
            onChange={(e) => setSecondaryColor(e.target.value)}
            className="col-span-2 mt-1 w-full rounded border border-slate-300 p-2"
            placeholder="Enter primary color"
          />
          <div
            className="h-10 w-10 rounded-sm border border-slate-900"
            style={{ backgroundColor: secondaryColor }}
          ></div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Fill Button */}
        <button
          style={{ backgroundColor: primaryColor, color: secondaryColor }}
          className="rounded px-4 py-2 text-sm"
        >
          Button
        </button>

        {/* Outline button */}
        <button
          style={{ borderColor: primaryColor, color: primaryColor }}
          className="rounded border px-4 py-2 text-sm"
        >
          Outline Button
        </button>

        {/* Card with Image */}
        <div
          className="rounded border p-4"
          style={{ backgroundColor: secondaryColor, color: primaryColor }}
        >
          <img
            src="https://picsum.photos/200"
            alt="Placeholder"
            className="my-2 h-48 w-full rounded"
            style={{ backgroundColor: secondaryColor }}
          />
          <h2 className="text-left text-xl font-bold">Card Title</h2>
          <p className="text-left text-sm font-light">Subtitle {new Date().toLocaleDateString()}</p>
          <p className="mt-2 text-justify text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book.
          </p>
          <button
            style={{ backgroundColor: primaryColor, color: secondaryColor }}
            className="float-right mt-2 rounded px-4 py-2 text-sm"
            onClick={() => {
              alert("Button clicked!");
            }}
          >
            Click Me
          </button>
        </div>
      </div>
    </div>
  );
};

export default UIComponentsPanel;
