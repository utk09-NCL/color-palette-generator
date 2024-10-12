// src/hooks/useContrastData.js

import { useMemo } from "react";
import chroma from "chroma-js";
import { calculateShadeStep } from "../utils/colorUtils";

/**
 * Custom hook to generate contrast data between shades and text colors.
 *
 * @param {Array} shades - Array of chroma color objects representing shades.
 * @returns {Array} The generated contrast data.
 */
const useContrastData = (shades) => {
  const data = useMemo(() => {
    const getWCAGRating = (contrast) => ({
      aa: contrast >= 4.5 ? "Pass" : "Fail",
      aaa: contrast >= 7 ? "Pass" : "Fail",
    });

    const getShadeStep = (shade) => {
      const index = shades.findIndex((s) => s.hex() === shade.hex());
      return calculateShadeStep(index, shades.length);
    };

    const combos = [];
    const textColors = [chroma("black"), chroma("white")];

    // Compare each shade with black and white text
    shades.forEach((bgShade) => {
      textColors.forEach((fgShade) => {
        const contrastRatio = chroma.contrast(bgShade, fgShade);
        const ratings = getWCAGRating(contrastRatio);
        combos.push({
          bgShade: bgShade.hex().toUpperCase(),
          fgShade: fgShade.hex().toUpperCase(),
          bgLabel: bgShade.hex().toUpperCase(),
          fgLabel: fgShade.hex().toUpperCase(),
          contrastRatio: parseFloat(contrastRatio.toFixed(2)),
          aa: ratings.aa,
          aaa: ratings.aaa,
        });
      });
    });

    // Compare each shade with every other shade
    shades.forEach((bgShade) => {
      shades.forEach((fgShade) => {
        const contrastRatio = chroma.contrast(bgShade, fgShade);
        const ratings = getWCAGRating(contrastRatio);
        const bgStep = getShadeStep(bgShade);
        const fgStep = getShadeStep(fgShade);
        combos.push({
          bgShade: bgShade.hex().toUpperCase(),
          fgShade: fgShade.hex().toUpperCase(),
          bgLabel: `${bgShade.hex().toUpperCase()} (${bgStep})`,
          fgLabel: `${fgShade.hex().toUpperCase()} (${fgStep})`,
          contrastRatio: parseFloat(contrastRatio.toFixed(2)),
          aa: ratings.aa,
          aaa: ratings.aaa,
        });
      });
    });

    return combos;
  }, [shades]);

  return data;
};

export default useContrastData;
