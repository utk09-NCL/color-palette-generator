// src/utils/exportUtils.test.ts

import { Color } from "chroma-js";
import { describe, expect, it } from "vitest";

import { generateExportCode, ExportFormat } from "./exportUtils";

const mockColor = (
  hex: string,
  hsl: [number, number, number],
  rgb: [number, number, number],
): Color => {
  return {
    hex: () => hex,
    hsl: () =>
      hsl.map((value, index) => (index === 0 ? value : value / 100)) as [
        number,
        number,
        number,
      ],
    rgb: () => rgb,
  } as Color;
};

describe("generateExportCode", () => {
  const colors = {
    primary: [
      mockColor("#AEAAFF", [260, 100, 82], [174, 170, 255]),
      mockColor("#A19AF5", [256, 83, 77], [161, 154, 245]),
    ],
    secondary: [
      mockColor("#FFFFC7", [60, 100, 87], [255, 255, 199]),
      mockColor("#F4F1B6", [56, 82, 85], [244, 241, 182]),
    ],
  };

  it("generates Tailwind HEX format", () => {
    const format: ExportFormat = "tailwindHex";
    const result = generateExportCode(colors, format);
    const expected = `'primary': {
  '50': '#AEAAFF',
  '100': '#A19AF5',
},
'secondary': {
  '50': '#FFFFC7',
  '100': '#F4F1B6',
}`;
    expect(result).toBe(expected);
  });

  it("generates Tailwind HSL format", () => {
    const format: ExportFormat = "tailwindHsl";
    const result = generateExportCode(colors, format);
    const expected = `'primary': {
  '50': 'hsl(260, 100%, 82%)',
  '100': 'hsl(256, 83%, 77%)',
},
'secondary': {
  '50': 'hsl(60, 100%, 87%)',
  '100': 'hsl(56, 82%, 85%)',
}`;
    expect(result).toBe(expected);
  });

  it("generates SCSS HEX format", () => {
    const format: ExportFormat = "scssHex";
    const result = generateExportCode(colors, format);
    const expected = `$primary-50: #AEAAFF;
$primary-100: #A19AF5;
$secondary-50: #FFFFC7;
$secondary-100: #F4F1B6;`;
    expect(result).toBe(expected);
  });

  it("generates CSS HEX format", () => {
    const format: ExportFormat = "cssHex";
    const result = generateExportCode(colors, format);
    const expected = `:root {
  --primary-50: #AEAAFF;
  --primary-100: #A19AF5;
  --secondary-50: #FFFFC7;
  --secondary-100: #F4F1B6;
}`;
    expect(result).toBe(expected);
  });

  it("generates CSS HSL format", () => {
    const format: ExportFormat = "cssHsl";
    const result = generateExportCode(colors, format);
    const expected = `:root {
  --primary-50: hsl(260, 100%, 82%);
  --primary-100: hsl(256, 83%, 77%);
  --secondary-50: hsl(60, 100%, 87%);
  --secondary-100: hsl(56, 82%, 85%);
}`;
    expect(result).toBe(expected);
  });

  it("generates CSS RGB format", () => {
    const format: ExportFormat = "cssRgb";
    const result = generateExportCode(colors, format);
    const expected = `:root {
  --primary-50: rgb(174, 170, 255);
  --primary-100: rgb(161, 154, 245);
  --secondary-50: rgb(255, 255, 199);
  --secondary-100: rgb(244, 241, 182);
}`;
    expect(result).toBe(expected);
  });

  it("returns an empty string for an unsupported format", () => {
    const format = "unsupported" as ExportFormat;
    const result = generateExportCode(colors, format);
    expect(result).toBe("");
  });
});
