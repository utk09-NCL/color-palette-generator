// src/components/ColorInput/CustomSlider/CustomSlider.tsx

import type { ChangeEventHandler, ReactElement } from "react";

import "./CustomSlider.css";

export type CustomSliderProps = {
  min: number;
  max: number;
  value: number | string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  gradient?: string;
};

/**
 * Custom slider component with a gradient background.
 *
 * @param {number} props.min - Minimum value for the slider.
 * @param {number} props.max - Maximum value for the slider.
 * @param {number|string} props.value - Current value of the slider.
 * @param {ChangeEventHandler<HTMLInputElement>} props.onChange - Callback function to handle value changes.
 * @param {string} [props.gradient] - CSS gradient string for the slider background.
 * @returns {ReactElement} The rendered custom slider component.
 */
const CustomSlider = ({
  min,
  max,
  value,
  onChange,
  gradient = "linear-gradient(to right, #000000, #ffffff)",
}: CustomSliderProps): ReactElement => {
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

export default CustomSlider;
