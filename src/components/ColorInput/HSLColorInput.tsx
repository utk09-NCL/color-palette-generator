// src/components/ColorInput/HSLColorInput.tsx

import { type ChangeEvent, type ReactElement } from "react";
import { toast } from "react-hot-toast";

import CustomSlider from "./CustomSlider/CustomSlider";

/**
 * Props for the HSLColorInput component.
 */
export type HSLColorInputProps = {
  hsl: [number, number, number];
  onHslChange: (_index: number, _value: number) => void;
};

/**
 * Component for inputting and adjusting HSL (Hue, Saturation, Lightness) color values.
 *
 * @param {HSLColorInputProps} props - The HSL values and onChange handler.
 * @returns {ReactElement} The rendered HSL color input component.
 */
const HSLColorInput = ({
  hsl,
  onHslChange,
}: HSLColorInputProps): ReactElement => {
  // Destructure the HSL array into individual components
  const [h, s, l] = hsl;

  /**
   * Handler function for input changes in HSL values.
   *
   * @param {number} index - Index of the HSL component (0 for H, 1 for S, 2 for L).
   * @param {number} value - The new value for the HSL component.
   */
  const handleHslInputChange = (index: number, value: number): void => {
    let min, max;

    // Set the valid range for each HSL component
    if (index === 0) {
      // Hue ranges from 0 to 360 degrees
      min = 0;
      max = 360;
    } else {
      // Saturation and Lightness range from 0 to 1 (as fractions)
      min = 0;
      max = 1;
    }

    // Check if the new value is within the valid range
    if (value < min || value > max) {
      toast.error("Value out of range"); // Display an error notification
      return;
    }

    // Call the parent callback function with the updated value
    onHslChange(index, value);
  };

  return (
    <div className="w-full">
      {/* Section title */}
      <h3 className="text-lg font-bold">HSL</h3>

      {/* Input fields for H, S, and L */}
      <div className="flex space-x-2">
        {/* Hue input */}
        <input
          type="number"
          min="0"
          max="360"
          value={isNaN(h) ? 0 : Math.round(h)} // Show rounded value or empty if NaN
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleHslInputChange(0, parseFloat(e.target.value) || 0)
          } // Update hue value
          className="w-full rounded-lg border px-2 py-1"
          placeholder="H" // Placeholder text
        />

        {/* Saturation input */}
        <input
          type="number"
          min="0"
          max="100"
          value={isNaN(s) ? 0 : Math.round(s * 100)} // Convert fraction to percentage
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleHslInputChange(1, parseFloat(e.target.value) / 100 || 0)
          } // Update saturation value
          className="w-full rounded-lg border px-2 py-1"
          placeholder="S"
        />

        {/* Lightness input */}
        <input
          type="number"
          min="0"
          max="100"
          value={isNaN(l) ? 0 : Math.round(l * 100)} // Convert fraction to percentage
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleHslInputChange(2, parseFloat(e.target.value) / 100 || 0)
          } // Update lightness value
          className="w-full rounded-lg border px-2 py-1"
          placeholder="L"
        />
      </div>

      {/* Sliders for H, S, and L */}
      <div className="mt-4 space-y-2">
        {/* Hue slider */}
        <CustomSlider
          min={0}
          max={360}
          value={isNaN(h) ? 0 : h} // Default to 0 if NaN
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleHslInputChange(0, parseFloat(e.target.value) || 0)
          } // Update hue value
          gradient="linear-gradient(to right, red, yellow, lime, cyan, blue, magenta, red)" // Hue gradient
        />

        {/* Saturation slider */}
        <CustomSlider
          min={0}
          max={100}
          value={isNaN(s) ? 0 : s * 100} // Convert fraction to percentage
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleHslInputChange(1, parseFloat(e.target.value) / 100 || 0)
          } // Update saturation value
          gradient={`linear-gradient(to right, hsl(${h},0%,${l * 100}%),
              hsl(${h},100%,${l * 100}%))`} // Gradient from gray to full saturation
        />

        {/* Lightness slider */}
        <CustomSlider
          min={0}
          max={100}
          value={isNaN(l) ? 0 : l * 100} // Convert fraction to percentage
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleHslInputChange(2, parseFloat(e.target.value) / 100 || 0)
          } // Update lightness value
          gradient={`linear-gradient(to right, hsl(${h},${s * 100}%,0%),
              hsl(${h},${s * 100}%,50%), hsl(${h},${s * 100}%,100%))`} // Gradient from black to color to white
        />
      </div>
    </div>
  );
};

export default HSLColorInput;
