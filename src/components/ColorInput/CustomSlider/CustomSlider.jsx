import PropTypes from "prop-types";
import "./CustomSlider.css";

const CustomSlider = ({ min, max, value, onChange, gradient }) => {
  return (
    <div className="slider-container">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        className="slider"
        style={{
          background: gradient,
        }}
      />
    </div>
  );
};

CustomSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onChange: PropTypes.func.isRequired,
  gradient: PropTypes.string.isRequired,
};

export default CustomSlider;
