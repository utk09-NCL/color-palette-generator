import { useState } from "react";
import HEXColorInput from "./HEXColorInput";
import HSLColorInput from "./HSLColorInput";
import RGBColorInput from "./RGBColorInput";

const ColorInput = () => {
  const [hexInput, setHexInput] = useState("#4512ab");
  const [rgbValues, setRgbValues] = useState([212, 122, 211]);
  const [hslValues, setHslValues] = useState([289, 55, 11]);

  const handleRgbChange = (index, value) => {
    const newRgb = [...rgbValues];
    newRgb[index] = value;
    setRgbValues(newRgb);
  };

  const handleHslChange = (index, value) => {
    const newHsl = [...hslValues];
    newHsl[index] = value;
    setHslValues(newHsl);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4 lg:gap-y-0">
      <p>Title Here</p>
      <HEXColorInput hex={hexInput} onHexChange={setHexInput} />
      <RGBColorInput rgb={rgbValues} onRgbChange={handleRgbChange} />
      <HSLColorInput hsl={hslValues} onHslChange={handleHslChange} />
    </div>
  );
};

export default ColorInput;
