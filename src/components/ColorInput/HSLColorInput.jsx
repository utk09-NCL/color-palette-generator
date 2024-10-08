import PropTypes from "prop-types";
import CustomSlider from "./CustomSlider/CustomSlider";

const HSLColorInput = ({ hsl, onHslChange }) => {
  const [h, s, l] = hsl;

  const handleHslInputChange = (index, value) => {
    let min, max;

    if (index === 0) {
      // Hue range from 0  to 260
      min = 0;
      max = 360;
    } else {
      // Saturation, Lightness range from 0 to 1 (as fractions)
      min = 0;
      max = 1;
    }

    if (value < min || value > max) {
      return;
    }

    onHslChange(index, value); // call the parent back with updated values
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-bold pl-2">HSL</h3>
      <div className="flex space-x-2">
        <input
          type="number"
          min={0}
          max={360}
          value={isNaN(h) ? "" : Math.round(h)}
          onChange={(e) =>
            handleHslInputChange(0, parseFloat(e.target.value) || 0)
          }
          placeholder="H"
          aria-label="H"
          className="border-2 border-slate-300 rounded-lg w-full px-2 py-1"
        />
        <input
          type="number"
          min={0}
          max={100}
          value={isNaN(s) ? "" : Math.round(s * 100)}
          onChange={(e) =>
            handleHslInputChange(1, parseFloat(e.target.value) / 100 || 0)
          }
          placeholder="S"
          aria-label="S"
          className="border-2 border-slate-300 rounded-lg w-full px-2 py-1"
        />
        <input
          type="number"
          min={0}
          max={100}
          value={isNaN(l) ? "" : Math.round(l * 100)}
          onChange={(e) =>
            handleHslInputChange(2, parseFloat(e.target.value) / 100 || 0)
          }
          placeholder="L"
          aria-label="L"
          className="border-2 border-slate-300 rounded-lg w-full px-2 py-1"
        />
      </div>
      <div className="mt-4 space-y-2">
        <CustomSlider
          min={0}
          max={360}
          value={isNaN(h) ? 0 : h}
          onChange={(e) =>
            handleHslInputChange(0, parseFloat(e.target.value) || 0)
          }
          gradient="linear-gradient(to right, red, red, yellow, lime, cyan, blue, magenta, red)"
        />

        <CustomSlider
          min={0}
          max={100}
          value={isNaN(s) ? 0 : s * 100}
          onChange={(event) =>
            handleHslInputChange(1, parseFloat(event.target.value) / 100 || 0)
          }
          gradient={`linear-gradient(to right,
            hsl(${h},0%,${l * 100}%),
            hsl(${h},100%,${l * 100}%))`}
        />

        <CustomSlider
          min={0}
          max={100}
          value={isNaN(l) ? 0 : l * 100}
          onChange={(e) =>
            handleHslInputChange(2, parseFloat(e.target.value) / 100 || 0)
          }
          gradient={`linear-gradient(to right,
            hsl(${h}, ${s * 100}%, 0%),
            hsl(${h}, ${s * 100}%, 50%),
            hsl(${h}, ${s * 100}%, 100%))`}
        />
      </div>
    </div>
  );
};

HSLColorInput.propTypes = {
  hsl: PropTypes.arrayOf(PropTypes.number).isRequired,
  onHslChange: PropTypes.func.isRequired,
};

export default HSLColorInput;
