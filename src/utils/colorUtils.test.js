import { describe, it, expect } from "vitest";

import {
  calculateShadeStep,
  generateColorShades,
  generateExportData,
} from "./colorUtils";

describe("calculateShadeStep", () => {
  it("should return 50 when index is 0", () => {
    const result = calculateShadeStep(0, 11);
    expect(result).toBe(50);
  });

  it("should return 950 when index is the last element", () => {
    const result = calculateShadeStep(10, 11);
    expect(result).toBe(950);
  });

  it("should return appropriate values for other indices", () => {
    expect(calculateShadeStep(1, 11)).toBe(100);
    expect(calculateShadeStep(5, 11)).toBe(500);
    expect(calculateShadeStep(8, 11)).toBe(800);
  });
});

describe("generateExportData", () => {
  it("should return empty object when no generatedColors are provided", () => {
    const result = generateExportData({});
    expect(result).toEqual({});
  });

  it("should generate export data with correct shades", () => {
    const generatedColors = {
      primary: {
        colorName: "primary",
        shades: ["#000000", "#111111", "#222222"],
      },
    };

    const result = generateExportData(generatedColors);

    expect(result).toEqual({
      primary: {
        50: "#000000",
        100: "#111111",
        950: "#222222",
      },
    });
  });
});

describe("generateColorShades", () => {
  it("should generate an array of shades from a base color", () => {
    const baseColor = "#ff0000"; // Red
    const totalShades = 11;
    const result = generateColorShades(baseColor, totalShades);

    expect(result).toHaveLength(11);
    expect(result[0]).toBe("#FF774D".toUpperCase());
  });

  it("should return two shades when totalShades is zero", () => {
    const baseColor = "#ff0000";
    const result = generateColorShades(baseColor, 0);

    expect(result).toHaveLength(2);
  });
});
