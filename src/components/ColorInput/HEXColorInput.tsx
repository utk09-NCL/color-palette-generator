// src/components/ColorInput/HEXColorInput.tsx

import { type ChangeEvent, type ReactElement } from "react";

/**
 * Props for the HEXColorInput component.
 */
export type HEXColorInputProps = {
  hex: string;
  onHexChange: (_value: string) => void;
};

/**
 * Component for inputting a color in HEX format.
 *
 * @param {string} hex - The current HEX color value.
 * @param {function} onHexChange - Callback function to handle changes to the HEX value.
 * @returns {ReactElement} The rendered HEX color input component.
 */
const HEXColorInput = ({ hex, onHexChange }: HEXColorInputProps): ReactElement => {
  return (
    <div className="w-full">
      {/* Label for the HEX input */}
      <h3 className="text-lg font-bold">HEX</h3>

      {/* Input field for HEX color */}
      <input
        data-testid="hex-input" // Test ID for testing
        type="text"
        value={hex} // The current value of the input field
        onChange={(e: ChangeEvent<HTMLInputElement>) => onHexChange(e.target.value)} // Update parent component on change
        className="w-full rounded-lg border px-2 py-1"
        placeholder="HEX" // Placeholder text when the input is empty
      />
    </div>
  );
};

export default HEXColorInput;
