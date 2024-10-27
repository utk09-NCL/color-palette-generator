// src/components/ColorInput/RGBColorInput.jsx

import PropTypes from "prop-types";

import CustomSlider from "./CustomSlider/CustomSlider";

/**
 * Component for inputting and adjusting RGB color values.
 *
 * @param {Array<number>} props.rgb - The current RGB values as an array [R, G, B].
 * @param {function} props.onRgbChange - Callback function to handle changes to RGB values.
 * @returns {JSX.Element} The rendered RGB color input component.
 */
const RGBColorInput = ({ rgb, onRgbChange }) => {
  // Destructure and round the RGB values for display
  const [r, g, b] = rgb.map((val) => Math.round(val));

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
          onChange={(e) => onRgbChange(0, parseInt(e.target.value) || 0)}
          className="w-full rounded-lg border px-2 py-1"
          placeholder="R"
        />
        {/* Green component input */}
        <input
          type="number"
          min="0"
          max="255"
          value={g}
          onChange={(e) => onRgbChange(1, parseInt(e.target.value) || 0)}
          className="w-full rounded-lg border px-2 py-1"
          placeholder="G"
        />
        {/* Blue component input */}
        <input
          type="number"
          min="0"
          max="255"
          value={b}
          onChange={(e) => onRgbChange(2, parseInt(e.target.value) || 0)}
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
          onChange={(e) => onRgbChange(0, parseInt(e.target.value) || 0)}
          gradient="linear-gradient(to right, #000000, #ff0000)" // Gradient from black to red
        />
        {/* Green component slider */}
        <CustomSlider
          min={0}
          max={255}
          value={g}
          onChange={(e) => onRgbChange(1, parseInt(e.target.value) || 0)}
          gradient="linear-gradient(to right, #000000, #00ff00)" // Gradient from black to green
        />
        {/* Blue component slider */}
        <CustomSlider
          min={0}
          max={255}
          value={b}
          onChange={(e) => onRgbChange(2, parseInt(e.target.value) || 0)}
          gradient="linear-gradient(to right, #000000, #0000ff)" // Gradient from black to blue
        />
      </div>
    </div>
  );
};

RGBColorInput.propTypes = {
  rgb: PropTypes.arrayOf(PropTypes.number).isRequired, // Array of RGB values [R, G, B]
  onRgbChange: PropTypes.func.isRequired, // Function to handle RGB value changes
};

export default RGBColorInput;
