// src/components/ColorInput/ColorPreview.jsx

import PropTypes from "prop-types";

/**
 * Component to display a preview of the current color.
 *
 * @param {string} props.color - The color to display in the preview.
 * @returns {JSX.Element} The rendered component.
 */
const ColorPreview = ({ color }) => {
  return (
    // A div element styled to display the selected color
    <div
      className="w-full h-24 lg:h-32 lg:w-full rounded-lg shadow-2xl"
      style={{ backgroundColor: color }} // Inline style to set the background color
    ></div>
  );
};

// Define the expected prop types for the component
ColorPreview.propTypes = {
  color: PropTypes.string.isRequired, // The 'color' prop is required and must be a string
};

export default ColorPreview;
