// src/components/ColorInput/CustomSlider/CustomSlider.jsx

import PropTypes from "prop-types";
import "./CustomSlider.css";

/**
 * Custom slider component with a gradient background.
 *
 * @param {number} props.min - Minimum value for the slider.
 * @param {number} props.max - Maximum value for the slider.
 * @param {number|string} props.value - Current value of the slider.
 * @param {function} props.onChange - Callback function to handle value changes.
 * @param {string} props.gradient - CSS gradient string for the slider background.
 * @returns {JSX.Element} The rendered custom slider component.
 */
const CustomSlider = ({
  min,
  max,
  value,
  onChange,
  gradient = "linear-gradient(to right, #000000, #ffffff)",
}) => {
  return (
    <div className="slider-container">
      {/* Range input acting as a slider */}
      <input
        type="range"
        min={min} // Minimum slider value
        max={max} // Maximum slider value
        value={value} // Current slider value
        onChange={onChange} // Handle value changes
        className="slider"
        style={{
          background: gradient, // Set the background gradient
        }}
      />
    </div>
  );
};

CustomSlider.propTypes = {
  min: PropTypes.number.isRequired, // Minimum value (required)
  max: PropTypes.number.isRequired, // Maximum value (required)
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired, // Current value (number or string)
  onChange: PropTypes.func.isRequired, // Function to handle changes (required)
  gradient: PropTypes.string.isRequired, // CSS gradient string (required)
};

export default CustomSlider;
