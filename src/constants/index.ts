// src/constants/index.js

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

export const ROUTES = {
  HOME: "/",
  SAVED_PALETTES: "/saved-palettes",
  EXTRACT_COLORS: "/extract-colors",
  ACCESSIBILITY: "/accessibility",
  ABOUT: "/about",
} as const;
