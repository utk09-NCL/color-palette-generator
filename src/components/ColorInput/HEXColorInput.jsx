// src/components/ColorInput/HEXColorInput.jsx

import PropTypes from "prop-types"; // Import PropTypes for type checking of props

/**
 * Component for inputting a color in HEX format.
 *
 * @param {string} props.hex - The current HEX color value.
 * @param {function} props.onHexChange - Callback function to handle changes to the HEX value.
 * @returns {JSX.Element} The rendered HEX color input component.
 */
const HEXColorInput = ({ hex, onHexChange }) => {
  return (
    <div className="w-full">
      {/* Label for the HEX input */}
      <h3 className="text-lg font-bold">HEX</h3>

      {/* Input field for HEX color */}
      <input
        type="text"
        value={hex} // The current value of the input field
        onChange={(e) => onHexChange(e.target.value)} // Update parent component on change
        className="border px-2 py-1 rounded-lg w-full"
        placeholder="HEX" // Placeholder text when the input is empty
      />
    </div>
  );
};

HEXColorInput.propTypes = {
  hex: PropTypes.string.isRequired, // The current HEX color value (required)
  onHexChange: PropTypes.func.isRequired, // Function to handle changes to the HEX value (required)
};

export default HEXColorInput;
