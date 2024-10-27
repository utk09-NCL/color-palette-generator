// src/utils/colorUtils.ts

import chroma, { scale } from "chroma-js";

export type CalculateShadeStepType = {
  index: number;
  totalShades: number;
};

export type ColorShade = string;
export type ColorSet = {
  colorName: string;
  shades: ColorShade[];
};

export type GeneratedColors = {
  [key: string]: ColorSet;
};

export type ExportData = {
  [colorName: string]: {
    [shade: number]: string;
  };
};

export type BaseColor = string;

// Function to calculate the shade step
export const calculateShadeStep = ({
  index,
  totalShades,
}: CalculateShadeStepType): number => {
  return index === 0 ? 50 : index === totalShades - 1 ? 950 : index * 100;
};

// Function to generate export data from generated colors
export const generateExportData = (
  generatedColors: GeneratedColors,
): ExportData => {
  return Object.values(generatedColors).reduce((acc, colorSet) => {
    acc[colorSet.colorName] = colorSet.shades.reduce(
      (shadeAcc: { [key: number]: string }, shade: string, index: number) => {
        const step = calculateShadeStep({
          index,
          totalShades: colorSet.shades.length,
        });
        shadeAcc[step] = shade;
        return shadeAcc;
      },
      {},
    );
    return acc;
  }, {} as ExportData);
};

// Function to generate shades of a color
export const generateColorShades = (
  baseColor: BaseColor,
  totalShades: number = 11,
): string[] => {
  return scale([chroma(baseColor).brighten(1.5), chroma(baseColor).darken(2)])
    .mode("lab")
    .colors(totalShades)
    .map((shadeColor) => chroma(shadeColor).hex().toUpperCase());
};

export type BackgroundOptions = {
  [key: number]: [string, string];
};
export type RandomBackgroundColor = [string, string];

// Function to generate a random background color
export const generateRandomBackgroundColor = (): RandomBackgroundColor => {
  const backgroundOptions: BackgroundOptions = {
    0: ["#1BB4E0", "#000850"],
    1: ["#FC456B", "#3F5EFB"],
    2: ["#4B6CB7", "#192848"],
    3: ["#D56639", "#DAAE51"],
    4: ["#00D2FF", "#3A47D5"],
  };

  const randomIndex = Math.floor(
    Math.random() * Object.keys(backgroundOptions).length,
  );
  return backgroundOptions[randomIndex];
};
