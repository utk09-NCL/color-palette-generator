// src/utils/exportUtils.ts

import { type Color } from "chroma-js";

export type ExportFormat =
  | "tailwindHex"
  | "tailwindHsl"
  | "scssHex"
  | "cssHex"
  | "cssHsl"
  | "cssRgb";

/**
 * Generates a structured export of color shades based on the selected format.
 *
 * @param colors - The colors grouped by name (e.g., primary, secondary).
 * @param format - The format in which to export the colors.
 * @returns The formatted string for the selected export type.
 */
export const generateExportCode = (
  colors: Record<string, Color[]>,
  format: ExportFormat,
): string => {
  const colorSteps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

  const formatShade = (shade: Color, step: number): string => {
    switch (format) {
      case "tailwindHex":
        return `'${step}': '${shade.hex().toUpperCase()}',`;
      case "tailwindHsl": {
        const [h, s, l] = shade.hsl();
        return `'${step}': 'hsl(${isNaN(h) ? 0 : Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)',`;
      }
      case "scssHex":
        return `$${step}: ${shade.hex().toUpperCase()};`;
      case "cssHex":
        return `--${step}: ${shade.hex().toUpperCase()};`;
      case "cssHsl": {
        const [h, s, l] = shade.hsl();
        return `--${step}: hsl(${isNaN(h) ? 0 : Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%);`;
      }
      case "cssRgb": {
        const [r, g, b] = shade.rgb();
        return `--${step}: rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)});`;
      }
      default:
        return "";
    }
  };

  switch (format) {
    case "tailwindHex":
    case "tailwindHsl":
      return Object.entries(colors)
        .map(
          ([name, shades]) =>
            `'${name}': {\n${shades
              .map((shade, index) => `  ${formatShade(shade, colorSteps[index])}`)
              .join("\n")}\n}`,
        )
        .join(",\n");

    case "scssHex":
      return Object.entries(colors)
        .map(
          ([name, shades]) =>
            `${shades
              .map((shade, index) => `$${name}-${colorSteps[index]}: ${shade.hex().toUpperCase()};`)
              .join("\n")}`,
        )
        .join("\n");

    case "cssHex":
    case "cssHsl":
    case "cssRgb":
      return `:root {\n${Object.entries(colors)
        .map(
          ([name, shades]) =>
            `${shades
              .map(
                (shade, index) =>
                  `  --${name}-${colorSteps[index]}: ${formatShade(shade, colorSteps[index]).replace(/^--[0-9]+:\s*/, "")}`,
              )
              .join("\n")}`,
        )
        .join("\n")}\n}`;

    default:
      return "";
  }
};
