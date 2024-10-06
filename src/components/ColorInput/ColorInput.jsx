import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import chroma from "chroma-js";
import { toast } from "react-hot-toast";
import HEXColorInput from "./HEXColorInput";
import HSLColorInput from "./HSLColorInput";
import RGBColorInput from "./RGBColorInput";
import ColorPreview from "./ColorPreview";
import useDebounce from "../../hooks/useDebounce";

const ColorInput = ({ colorValue, onChangeColor }) => {
  const [chromaColor, setChromaColor] = useState(chroma(colorValue));

  const [hexInput, setHexInput] = useState(colorValue);

  const debouncedHexInput = useDebounce(hexInput, 500);

  const [rgbValues, setRgbValues] = useState(chromaColor.rgb());
  const [hslValues, setHslValues] = useState(chromaColor.hsl());

  const handleHexChange = (newHex) => {
    const validHex = /^#?[0-9A-Fa-f]*$/;
    if (validHex.test(newHex)) {
      setHexInput(newHex);
    }
  };

  const handleRgbChange = (index, value) => {
    const newRgb = [...rgbValues];
    newRgb[index] = value;
    setRgbValues(newRgb);

    const newColor = chroma(newRgb, "rgb");
    setChromaColor(newColor);
    setHexInput(newColor.hex());
    setHslValues(newColor.hsl());

    onChangeColor(newColor.hex());
  };

  const handleHslChange = (index, value) => {
    const newHsl = [...hslValues];
    newHsl[index] = value;
    setHslValues(newHsl);

    const newColor = chroma(newHsl, "hsl");
    setChromaColor(newColor);
    setHexInput(newColor.hex());
    setRgbValues(newColor.rgb());

    onChangeColor(newColor.hex());
  };

  useEffect(() => {
    if (chroma.valid(colorValue)) {
      const newColor = chroma(colorValue);
      setChromaColor(newColor);
      setHexInput(colorValue);
      setHslValues(newColor.hsl());
      setRgbValues(newColor.rgb());
    }
  }, [colorValue]);

  useEffect(() => {
    if (debouncedHexInput === "") return;

    if (chroma.valid(debouncedHexInput)) {
      const newColor = chroma(debouncedHexInput);
      setChromaColor(newColor);
      setHslValues(newColor.hsl());
      setRgbValues(newColor.rgb());

      onChangeColor(debouncedHexInput);
    } else {
      toast.error(`Invalid HEX value - ${debouncedHexInput}`);
    }

    return () => {
      toast.dismiss();
    };
  }, [debouncedHexInput, onChangeColor]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4 lg:gap-y-0">
      <ColorPreview color={chromaColor.css()} />
      <HEXColorInput hex={hexInput} onHexChange={handleHexChange} />
      <RGBColorInput rgb={rgbValues} onRgbChange={handleRgbChange} />
      <HSLColorInput hsl={hslValues} onHslChange={handleHslChange} />
    </div>
  );
};

ColorInput.propTypes = {
  colorValue: PropTypes.string.isRequired,
  onChangeColor: PropTypes.func.isRequired,
};

export default ColorInput;
