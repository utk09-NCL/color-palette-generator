import { describe, expect, it } from "vitest";

import {
  calculateShadeStep,
  generateColorShades,
  generateExportData,
  generateRandomBackgroundColor,
} from "./colorUtils";

describe("calculateShadeStep", () => {
  it("should return 50 when index is 0", () => {
    const result = calculateShadeStep({ index: 0, totalShades: 11 });
    expect(result).toBe(50);
  });

  it("should return 950 when index is the last element", () => {
    const result = calculateShadeStep({ index: 10, totalShades: 11 });
    expect(result).toBe(950);
  });

  it("should return appropriate values for other indices", () => {
    expect(calculateShadeStep({ index: 1, totalShades: 11 })).toBe(100);
    expect(calculateShadeStep({ index: 5, totalShades: 11 })).toBe(500);
    expect(calculateShadeStep({ index: 8, totalShades: 11 })).toBe(800);
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

describe("generateRandomBackgroundColor", () => {
  it("should return one of the predefined background color arrays", () => {
    const backgroundOptions = {
      0: ["#1BB4E0", "#000850"],
      1: ["#FC456B", "#3F5EFB"],
      2: ["#4B6CB7", "#192848"],
      3: ["#D56639", "#DAAE51"],
      4: ["#00D2FF", "#3A47D5"],
    };

    const result = generateRandomBackgroundColor();
    const values = Object.values(backgroundOptions);

    expect(values).toContainEqual(result);
  });
});
