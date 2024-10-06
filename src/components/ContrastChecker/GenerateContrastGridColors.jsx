import { useMemo } from "react";
import PropTypes from "prop-types";
import chroma from "chroma-js";

const TOTAL_SHADES = 11;

const GenerateContrastGridColors = ({ baseColor }) => {
  const shades = useMemo(
    () =>
      chroma
        .scale([chroma(baseColor).brighten(1.5), chroma(baseColor).darken(2)])
        .mode("lab")
        .colors(TOTAL_SHADES)
        .map((color) => chroma(color)),
    [baseColor]
  );

  const getTextColor = (bgColor) => {
    const luminance = chroma(bgColor).luminance();
    return luminance > 0.5 ? "#000000" : "#ffffff";
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-11">
      {shades.map((shade, index) => {
        const step =
          index === 0 ? 50 : index === TOTAL_SHADES - 1 ? 950 : index * 100;

        const textColor = getTextColor(shade);

        return (
          <div
            key={step}
            className="p-2 text-center"
            style={{
              backgroundColor: shade.hex(),
              color: textColor,
            }}
          >
            <p className="font-light">{step}</p>
            <p>{shade.hex().toUpperCase()}</p>
          </div>
        );
      })}
    </div>
  );
};

GenerateContrastGridColors.propTypes = {
  baseColor: PropTypes.string.isRequired,
};

export default GenerateContrastGridColors;
