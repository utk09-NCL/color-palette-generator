// src/services/exportService.ts
import type { ColorDataState } from "@/store/colorTypes";

export type ExportFormat =
  | "tailwindHex"
  | "tailwindHsl"
  | "scssHex"
  | "cssHex"
  | "cssHsl"
  | "cssRgb";

export interface ExportResult {
  format: ExportFormat;
  content: string;
  filename: string;
}

/**
 * Convert hex to HSL values for CSS
 */
function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Convert hex to RGB values
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

/**
 * Generate Tailwind CSS variables (HEX)
 */
function formatTailwindHex(palette: ColorDataState): string {
  const colorName = palette.name.replace(/\s+/g, "-").toLowerCase();

  if (!palette.generatedShades || palette.generatedShades.length === 0) {
    return `// No shades generated for ${palette.name}`;
  }

  const shades = palette.generatedShades
    .map((shade, index) => {
      const step = Math.round((index / (palette.generatedShades.length - 1)) * 900 + 50);
      return `        '${step}': '${shade}',`;
    })
    .join("\n");

  return `// Tailwind CSS Theme Extension
module.exports = {
  theme: {
    extend: {
      colors: {
        '${colorName}': {
${shades}
        }
      }
    }
  }
}`;
}

/**
 * Generate Tailwind CSS variables (HSL)
 */
function formatTailwindHsl(palette: ColorDataState): string {
  const colorName = palette.name.replace(/\s+/g, "-").toLowerCase();

  if (!palette.generatedShades || palette.generatedShades.length === 0) {
    return `// No shades generated for ${palette.name}`;
  }

  const shades = palette.generatedShades
    .map((shade, index) => {
      const step = Math.round((index / (palette.generatedShades.length - 1)) * 900 + 50);
      const hsl = hexToHsl(shade);
      return `        '${step}': 'hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)',`;
    })
    .join("\n");

  return `// Tailwind CSS Theme Extension (HSL)
module.exports = {
  theme: {
    extend: {
      colors: {
        '${colorName}': {
${shades}
        }
      }
    }
  }
}`;
}

/**
 * Generate SCSS variables (HEX)
 */
function formatScssHex(palette: ColorDataState): string {
  const colorName = palette.name.replace(/\s+/g, "-").toLowerCase();

  if (!palette.generatedShades || palette.generatedShades.length === 0) {
    return `// No shades generated for ${palette.name}`;
  }

  const shades = palette.generatedShades
    .map((shade, index) => {
      const step = Math.round((index / (palette.generatedShades.length - 1)) * 900 + 50);
      return `$${colorName}-${step}: ${shade};`;
    })
    .join("\n");

  return `// SCSS Variables
${shades}`;
}

/**
 * Generate CSS custom properties (HEX)
 */
function formatCssHex(palette: ColorDataState): string {
  const colorName = palette.name.replace(/\s+/g, "-").toLowerCase();

  if (!palette.generatedShades || palette.generatedShades.length === 0) {
    return `/* No shades generated for ${palette.name} */`;
  }

  const shades = palette.generatedShades
    .map((shade, index) => {
      const step = Math.round((index / (palette.generatedShades.length - 1)) * 900 + 50);
      return `  --${colorName}-${step}: ${shade};`;
    })
    .join("\n");

  return `:root {
${shades}
}`;
}

/**
 * Generate CSS custom properties (HSL)
 */
function formatCssHsl(palette: ColorDataState): string {
  const colorName = palette.name.replace(/\s+/g, "-").toLowerCase();

  if (!palette.generatedShades || palette.generatedShades.length === 0) {
    return `/* No shades generated for ${palette.name} */`;
  }

  const shades = palette.generatedShades
    .map((shade, index) => {
      const step = Math.round((index / (palette.generatedShades.length - 1)) * 900 + 50);
      const hsl = hexToHsl(shade);
      return `  --${colorName}-${step}: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%);`;
    })
    .join("\n");

  return `:root {
${shades}
}`;
}

/**
 * Generate CSS custom properties (RGB)
 */
function formatCssRgb(palette: ColorDataState): string {
  const colorName = palette.name.replace(/\s+/g, "-").toLowerCase();

  if (!palette.generatedShades || palette.generatedShades.length === 0) {
    return `/* No shades generated for ${palette.name} */`;
  }

  const shades = palette.generatedShades
    .map((shade, index) => {
      const step = Math.round((index / (palette.generatedShades.length - 1)) * 900 + 50);
      const rgb = hexToRgb(shade);
      return `  --${colorName}-${step}: rgb(${rgb.r}, ${rgb.g}, ${rgb.b});`;
    })
    .join("\n");

  return `:root {
${shades}
}`;
}

/**
 * Export color palette in specified format
 */
export function exportPalette(palette: ColorDataState, format: ExportFormat): ExportResult {
  const colorName = palette.name.replace(/\s+/g, "-").toLowerCase();

  let content: string;
  let extension: string;

  switch (format) {
    case "tailwindHex":
      content = formatTailwindHex(palette);
      extension = "js";
      break;
    case "tailwindHsl":
      content = formatTailwindHsl(palette);
      extension = "js";
      break;
    case "scssHex":
      content = formatScssHex(palette);
      extension = "scss";
      break;
    case "cssHex":
      content = formatCssHex(palette);
      extension = "css";
      break;
    case "cssHsl":
      content = formatCssHsl(palette);
      extension = "css";
      break;
    case "cssRgb":
      content = formatCssRgb(palette);
      extension = "css";
      break;
    default:
      throw new Error(`Unsupported export format: ${format}`);
  }

  return {
    format,
    content,
    filename: `${colorName}-${format}.${extension}`,
  };
}

/**
 * Download exported content as a file
 */
export function downloadExport(result: ExportResult): void {
  const blob = new Blob([result.content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = result.filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
