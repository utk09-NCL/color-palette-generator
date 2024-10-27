// src/hooks/useContrastData.ts

import { useMemo } from "react";
import chroma, { type Color, contrast } from "chroma-js";

import { calculateShadeStep } from "../utils/colorUtils";

/**
 * Type for individual contrast data entry.
 */
export type ContrastData = {
  bgShade: string;
  fgShade: string;
  bgLabel: string;
  fgLabel: string;
  contrastRatio: number;
  aa: "Pass" | "Fail";
  aaa: "Pass" | "Fail";
};

/**
 * Custom hook to generate contrast data between shades and text colors.
 *
 * @param {Color[]} shades - Array of chroma color objects representing shades.
 * @returns {ContrastData[]} The generated contrast data.
 */
const useContrastData = (shades: Color[]): ContrastData[] => {
  const data = useMemo(() => {
    const getWCAGRating = (
      contrastRatio: number,
    ): { aa: "Pass" | "Fail"; aaa: "Pass" | "Fail" } => ({
      aa: contrastRatio >= 4.5 ? "Pass" : "Fail",
      aaa: contrastRatio >= 7 ? "Pass" : "Fail",
    });

    const getShadeStep = (shade: Color): number => {
      const index = shades.findIndex((s) => s.hex() === shade.hex());
      return calculateShadeStep({ index, totalShades: shades.length });
    };

    const combos: ContrastData[] = [];
    const textColors: Color[] = [chroma("black"), chroma("white")];

    // Compare each shade with black and white text
    shades.forEach((bgShade) => {
      textColors.forEach((fgShade) => {
        const contrastRatio = contrast(bgShade, fgShade);
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
        const contrastRatio = contrast(bgShade, fgShade);
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
