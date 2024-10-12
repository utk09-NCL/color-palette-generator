// src/utils/colorUtils.js

import chroma, { scale } from "chroma-js";

export const calculateShadeStep = (index, totalShades) => {
  return index === 0 ? 50 : index === totalShades - 1 ? 950 : index * 100;
};

export const generateExportData = (generatedColors) => {
  return Object.values(generatedColors).reduce((acc, colorSet) => {
    acc[colorSet.colorName] = colorSet.shades.reduce(
      (shadeAcc, shade, index) => {
        const step = calculateShadeStep(index, colorSet.shades.length);
        shadeAcc[step] = shade;
        return shadeAcc;
      },
      {},
    );
    return acc;
  }, {});
};

export const generateColorShades = (baseColor, totalShades = 11) => {
  return scale([chroma(baseColor).brighten(1.5), chroma(baseColor).darken(2)])
    .mode("lab")
    .colors(totalShades)
    .map((shadeColor) => chroma(shadeColor).hex().toUpperCase());
};
