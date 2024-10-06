import PropTypes from "prop-types";

const RGBColorInput = ({ rgb, onRgbChange }) => {
  const [r, g, b] = rgb.map((val) => val);

  return (
    <div className="w-full">
      <h3 className="text-lg font-bold pl-2">RGB</h3>
      <div className="flex space-x-2">
        <input
          type="number"
          min={0}
          max={255}
          value={r}
          onChange={(e) => onRgbChange(0, parseInt(e.target.value) || 0)}
          placeholder="R"
          aria-label="R"
          className="border-2 border-slate-300 rounded-lg w-full px-2 py-1"
        />
        <input
          type="number"
          min={0}
          max={255}
          value={g}
          onChange={(e) => onRgbChange(1, parseInt(e.target.value) || 0)}
          placeholder="G"
          aria-label="G"
          className="border-2 border-slate-300 rounded-lg w-full px-2 py-1"
        />
        <input
          type="number"
          min={0}
          max={255}
          value={b}
          onChange={(e) => onRgbChange(2, parseInt(e.target.value) || 0)}
          placeholder="B"
          aria-label="B"
          className="border-2 border-slate-300 rounded-lg w-full px-2 py-1"
        />
      </div>
    </div>
  );
};

RGBColorInput.propTypes = {
  rgb: PropTypes.arrayOf(PropTypes.number).isRequired,
  onRgbChange: PropTypes.func.isRequired,
};

export default RGBColorInput;
