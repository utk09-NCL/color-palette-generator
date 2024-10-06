import PropTypes from "prop-types";

const ColorPreview = ({ color }) => {
  return (
    <div
      className="w-full h-24 lg:h-32 rounded-md shadow-2xl"
      style={{ backgroundColor: color }}
    ></div>
  );
};

ColorPreview.propTypes = {
  color: PropTypes.string.isRequired,
};

export default ColorPreview;
