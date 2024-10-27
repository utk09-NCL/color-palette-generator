// src/constants/index.js

/**
 * Allowed color names for the color sets.
 */
export const ALLOWED_COLOR_NAMES: string[] = [
  "primary",
  "secondary",
  "tertiary",
  "accent",
  "info",
  "success",
  "warning",
  "error",
  "custom",
];

/**
 * Export format options for exporting colors.
 */
export const EXPORT_FORMATS = [
  { id: "tailwindHex", name: "Tailwind (HEX)" },
  { id: "tailwindHsl", name: "Tailwind (HSL)" },
  { id: "scssHex", name: "SCSS (HEX)" },
  { id: "cssHex", name: "CSS (HEX)" },
  { id: "cssHsl", name: "CSS (HSL)" },
  { id: "cssRgb", name: "CSS (RGB)" },
];

/**
 * Total number of shades to generate for the color palette.
 * We are generating 11 shades ranging from lighter to darker.
 */
export const TOTAL_SHADES = 11;
