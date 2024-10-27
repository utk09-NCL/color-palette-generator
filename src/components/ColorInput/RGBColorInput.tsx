// src/components/ColorInput/RGBColorInput.tsx

import { type ChangeEvent, type ReactElement } from "react";
import { toast } from "react-hot-toast";

import CustomSlider from "./CustomSlider/CustomSlider";

export type RGB = [number, number, number];

/**
 * Props for the RGBColorInput component.
 */
export type RGBColorInputProps = {
  rgb: RGB;
  onRgbChange: (_index: number, _value: number) => void;
};

/**
 * Component for inputting and adjusting RGB color values.
 *
 * @param {RGBColorInputProps} props - The RGB values and onChange handler.
 * @returns {ReactElement} The rendered RGB color input component.
 */
const RGBColorInput = ({ rgb, onRgbChange }: RGBColorInputProps): ReactElement => {
  // Destructure and round the RGB values for display
  const [r, g, b] = rgb.map((val) => Math.round(val));

  const handleRgbInputChange = (index: number, value: number): void => {
    if (isNaN(value) || value < 0 || value > 255) {
      toast.error("Value out of range. Please enter a number between 0 and 255."); // Display an error notification
      return;
    }

    onRgbChange(index, value);
  };

  return (
    <div className="w-full">
      {/* Label for the RGB input section */}
      <h3 className="text-lg font-bold">RGB</h3>

      {/* Input fields for R, G, B values */}
      <div className="flex space-x-2">
        {/* Red component input */}
        <input
          type="number"
          min="0"
          max="255"
          value={r}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleRgbInputChange(0, parseInt(e.target.value) || 0)
          }
          className="w-full rounded-lg border px-2 py-1"
          placeholder="R"
        />
        {/* Green component input */}
        <input
          type="number"
          min="0"
          max="255"
          value={g}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleRgbInputChange(1, parseInt(e.target.value) || 0)
          }
          className="w-full rounded-lg border px-2 py-1"
          placeholder="G"
        />
        {/* Blue component input */}
        <input
          type="number"
          min="0"
          max="255"
          value={b}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleRgbInputChange(2, parseInt(e.target.value) || 0)
          }
          className="w-full rounded-lg border px-2 py-1"
          placeholder="B"
        />
      </div>

      {/* Sliders for R, G, B values */}
      <div className="mt-4 space-y-2">
        {/* Red component slider */}
        <CustomSlider
          min={0}
          max={255}
          value={r}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleRgbInputChange(0, parseInt(e.target.value) || 0)
          }
          gradient="linear-gradient(to right, #000000, #ff0000)" // Gradient from black to red
        />
        {/* Green component slider */}
        <CustomSlider
          min={0}
          max={255}
          value={g}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleRgbInputChange(1, parseInt(e.target.value) || 0)
          }
          gradient="linear-gradient(to right, #000000, #00ff00)" // Gradient from black to green
        />
        {/* Blue component slider */}
        <CustomSlider
          min={0}
          max={255}
          value={b}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleRgbInputChange(2, parseInt(e.target.value) || 0)
          }
          gradient="linear-gradient(to right, #000000, #0000ff)" // Gradient from black to blue
        />
      </div>
    </div>
  );
};

export default RGBColorInput;
