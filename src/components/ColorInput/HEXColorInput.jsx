import PropTypes from "prop-types";

const HEXColorInput = ({ hex, onHexChange }) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-bold pl-2">HEX</h3>
      <input
        type="text"
        value={hex}
        onChange={(e) => onHexChange(e.target.value)}
        placeholder="HEX Input"
        className="border-2 border-slate-300 rounded-lg w-full px-2 py-1"
      />
    </div>
  );
};

export default HEXColorInput;

HEXColorInput.propTypes = {
  hex: PropTypes.string.isRequired,
  onHexChange: PropTypes.func.isRequired,
};
