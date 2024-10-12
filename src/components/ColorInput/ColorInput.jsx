// src/components/ColorInput/ColorInput.jsx

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import chroma, { valid } from "chroma-js";
import { toast } from "react-hot-toast";

import useDebounce from "../../hooks/useDebounce";

import HEXColorInput from "./HEXColorInput";
import RGBColorInput from "./RGBColorInput";
import HSLColorInput from "./HSLColorInput";
import ColorPreview from "./ColorPreview";

/**
 * Component for inputting and manipulating colors in various formats (HEX, RGB, HSL).
 * Synchronizes the color across different formats and updates the parent component when changes occur.
 *
 * @param {string} props.colorValue - The initial color value in HEX format.
 * @param {function} props.onChangeColor - Callback function to notify parent of color changes.
 * @returns {JSX.Element} The rendered component.
 */
const ColorInput = ({ colorValue, onChangeColor }) => {
  // Initialize chromaColor state with the initial color value using chroma.js.
  const [chromaColor, setChromaColor] = useState(chroma(colorValue));

  // State for the HEX input field.
  const [hexInput, setHexInput] = useState(colorValue);

  // Debounced HEX input to prevent rapid state updates.
  const debouncedHexInput = useDebounce(hexInput, 500);

  // State for HSL and RGB values derived from the chromaColor.
  const [hslValues, setHslValues] = useState(chromaColor.hsl());
  const [rgbValues, setRgbValues] = useState(chromaColor.rgb());

  /**
   * Handler for changes in the HEX input field.
   * Validates the HEX input and updates the state accordingly.
   *
   * @param {string} newHex - The new HEX value input by the user.
   */
  const handleHexChange = (newHex) => {
    const validHex = /^#?[0-9A-Fa-f]*$/; // Regular expression to validate HEX input.
    if (validHex.test(newHex)) {
      setHexInput(newHex);
    }
  };

  /**
   * Handler for changes in the RGB input fields.
   * Updates the RGB values and synchronizes other color formats.
   *
   * @param {number} index - Index of the RGB component (0 for R, 1 for G, 2 for B).
   * @param {number} value - The new value for the RGB component.
   */
  const handleRgbChange = (index, value) => {
    const newRgb = [...rgbValues];
    newRgb[index] = value; // Update the specific RGB component.
    setRgbValues(newRgb);

    // Create a new color using the updated RGB values.
    const newColor = chroma(newRgb, "rgb");
    setChromaColor(newColor);
    setHexInput(newColor.hex()); // Update HEX input.
    setHslValues(newColor.hsl()); // Update HSL values.

    // Notify the parent component of the color change.
    onChangeColor(newColor.hex());
  };

  /**
   * Handler for changes in the HSL input fields.
   * Updates the HSL values and synchronizes other color formats.
   *
   * @param {number} index - Index of the HSL component (0 for H, 1 for S, 2 for L).
   * @param {number} value - The new value for the HSL component.
   */
  const handleHslChange = (index, value) => {
    const newHsl = [...hslValues];
    newHsl[index] = value; // Update the specific HSL component.
    setHslValues(newHsl);

    // Create a new color using the updated HSL values.
    const newColor = chroma(newHsl, "hsl");
    setChromaColor(newColor);
    setHexInput(newColor.hex()); // Update HEX input.
    setRgbValues(newColor.rgb()); // Update RGB values.

    // Notify the parent component of the color change.
    onChangeColor(newColor.hex());
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
    if (debouncedHexInput === "") return; // Do nothing if input is empty.

    if (valid(debouncedHexInput)) {
      const newColor = chroma(debouncedHexInput);
      setChromaColor(newColor);
      setHslValues(newColor.hsl()); // Update HSL values.
      setRgbValues(newColor.rgb()); // Update RGB values.

      // Notify the parent component of the color change.
      onChangeColor(debouncedHexInput);
    } else {
      // Show an error toast if the HEX value is invalid.
      toast.error(`Invalid HEX value - ${debouncedHexInput}`);
    }

    // Cleanup function to dismiss any toasts when the component unmounts or updates.
    return () => {
      toast.dismiss();
    };
  }, [debouncedHexInput, onChangeColor]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-2">
      {/* Color preview section */}
      <div className="lg:col-span-1 flex items-center justify-center">
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

ColorInput.propTypes = {
  colorValue: PropTypes.string.isRequired, // The initial color value in HEX format.
  onChangeColor: PropTypes.func.isRequired, // Callback function for when the color changes.
};

export default ColorInput;
