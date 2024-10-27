// src/components/ColorInput/ColorInput.tsx

import { useState, useEffect, type ReactElement } from "react";
import chroma, { type Color, valid } from "chroma-js";
import { toast } from "react-hot-toast";

import useDebounce from "@hooks/useDebounce";

import HEXColorInput from "./HEXColorInput";
import RGBColorInput, { type RGB } from "./RGBColorInput";
import HSLColorInput, { type HSL } from "./HSLColorInput";
import ColorPreview from "./ColorPreview";

/**
 * Props for the ColorInput component.
 */
export type ColorInputProps = {
  /** The initial color value in HEX format. */
  colorValue: string;
  /** Callback function to notify parent of color changes. */
  onChangeColor: (_color: string) => void;
};

/**
 * Centralized function to handle error messages for color validation.
 *
 * @param {string} message - The error message to display.
 */
const showValidationError = (message: string): void => {
  toast.error(message);
};

/**
 * Component for inputting and manipulating colors in various formats (HEX, RGB, HSL).
 * Synchronizes the color across different formats and updates the parent component when changes occur.
 *
 * @param {ColorInputProps} props - The initial color value and the change handler callback.
 * @returns {ReactElement} The rendered component.
 */
const ColorInput = ({ colorValue, onChangeColor }: ColorInputProps): ReactElement => {
  // Initialize chromaColor state with the initial color value using chroma.js.
  const [chromaColor, setChromaColor] = useState<Color>(chroma(colorValue));

  // State for the HEX input field.
  const [hexInput, setHexInput] = useState<string>(colorValue);

  // Debounced HEX input to prevent rapid state updates.
  const debouncedHexInput = useDebounce(hexInput, 500);

  // State for HSL and RGB values derived from the chromaColor.
  const [hslValues, setHslValues] = useState<HSL>(chromaColor.hsl());
  const [rgbValues, setRgbValues] = useState<RGB>(chromaColor.rgb());

  /**
   * Handler for changes in the HEX input field.
   * Validates the HEX input and updates the state accordingly.
   *
   * @param {string} newHex - The new HEX value input by the user.
   */
  const handleHexChange = (newHex: string): void => {
    const validHex = /^#?[0-9A-Fa-f]*$/;
    if (validHex.test(newHex)) {
      setHexInput(newHex);
    } else {
      showValidationError("Invalid HEX format"); // Show an error message for invalid HEX format
    }
  };

  /**
   * Handler for changes in the RGB input fields.
   * Updates the RGB values and synchronizes other color formats.
   *
   * @param {number} index - Index of the RGB component (0 for R, 1 for G, 2 for B).
   * @param {number} value - The new value for the RGB component.
   */
  const handleRgbChange = (index: number, value: number): void => {
    const newRgb = [...rgbValues] as RGB;
    newRgb[index] = value; // Update the specific RGB component
    setRgbValues(newRgb);

    const newColor = chroma(newRgb, "rgb");
    setChromaColor(newColor); // Update the chromaColor state with the new color
    setHexInput(newColor.hex()); // Synchronize the HEX input
    setHslValues(newColor.hsl()); // Synchronize the HSL values

    onChangeColor(newColor.hex()); // Notify the parent component of the color change
  };

  /**
   * Handler for changes in the HSL input fields.
   * Updates the HSL values and synchronizes other color formats.
   *
   * @param {number} index - Index of the HSL component (0 for H, 1 for S, 2 for L).
   * @param {number} value - The new value for the HSL component.
   */
  const handleHslChange = (index: number, value: number): void => {
    const newHsl = [...hslValues] as HSL;
    newHsl[index] = value; // Update the specific HSL component
    setHslValues(newHsl);

    const newColor = chroma(newHsl, "hsl");
    setChromaColor(newColor); // Update the chromaColor state with the new color
    setHexInput(newColor.hex()); // Synchronize the HEX input
    setRgbValues(newColor.rgb()); // Synchronize the RGB values

    onChangeColor(newColor.hex()); // Notify the parent component of the color change
  };

  /**
   * Effect hook to synchronize the component state when the colorValue prop changes.
   * Updates chromaColor, hexInput, hslValues, and rgbValues based on the new colorValue.
   */
  useEffect(() => {
    if (valid(colorValue)) {
      const newColor = chroma(colorValue);
      setChromaColor(newColor);
      setHexInput(colorValue);
      setHslValues(newColor.hsl());
      setRgbValues(newColor.rgb());
    }
  }, [colorValue]);

  /**
   * Effect hook to handle debounced changes in the HEX input.
   * Validates the HEX value and updates the color states.
   */
  useEffect(() => {
    if (debouncedHexInput === "") return;

    if (valid(debouncedHexInput)) {
      const newColor = chroma(debouncedHexInput);
      setChromaColor(newColor); // Update chromaColor
      setHslValues(newColor.hsl()); // Synchronize HSL values
      setRgbValues(newColor.rgb()); // Synchronize RGB values

      onChangeColor(debouncedHexInput); // Notify parent of change
    } else {
      showValidationError(`Invalid HEX value - ${debouncedHexInput}`); // Show error for invalid HEX
    }

    return () => {
      toast.dismiss(); // Clear toast notifications on cleanup
    };
  }, [debouncedHexInput, onChangeColor]);

  return (
    <div className="grid grid-cols-1 gap-4 px-0 py-2 md:grid-cols-2 md:px-2 lg:grid-cols-4">
      {/* Color preview section */}
      <div className="flex items-center justify-center lg:col-span-1">
        <ColorPreview color={chromaColor.css()} />
      </div>

      {/* Input for HEX color format */}
      <HEXColorInput hex={hexInput} onHexChange={handleHexChange} />

      {/* Input for RGB color format */}
      <RGBColorInput rgb={rgbValues} onRgbChange={handleRgbChange} />

      {/* Input for HSL color format */}
      <HSLColorInput hsl={hslValues} onHslChange={handleHslChange} />
    </div>
  );
};

export default ColorInput;
