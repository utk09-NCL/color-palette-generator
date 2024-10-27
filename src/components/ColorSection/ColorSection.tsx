// src/components/ColorSection/ColorSection.tsx

import { useState, useCallback, type ReactElement } from "react";
import { toast } from "react-hot-toast";
import chroma, { valid } from "chroma-js";
import clsx from "clsx";

import ColorInput from "@components/ColorInput/ColorInput";
import GenerateContrastGridColors from "@components/ContrastChecker/GenerateContrastGridColors";
import Button from "@components/Shared/Button";
import { ALLOWED_COLOR_NAMES } from "@constants/index";
import { generateColorShades } from "@utils/colorUtils";

/**
 * Type for the color data structure passed to onColorsGenerated.
 */
export type ColorData = {
  colorName: string;
  baseColor: string;
  shades: string[];
};

/**
 * Props for the ColorSection component.
 */
export type ColorSectionProps = {
  initialColorName?: string;
  onDelete: () => void;
  onColorsGenerated: (_colorData: ColorData) => void;
};

/**
 * Component representing a section for inputting a color and generating its shades.
 *
 * @param {string} initialColorName - The initial name for the color. Default 'primary'
 * @param {function} onDelete - Function to call when the section is deleted.
 * @param {function} onColorsGenerated - Function to call when colors are generated.
 * @returns {ReactElement} The rendered component.
 */
function ColorSection({
  initialColorName = "primary",
  onDelete,
  onColorsGenerated,
}: ColorSectionProps): ReactElement {
  // State to hold the base color input by the user.
  const [color, setColor] = useState<string>("#bc560a");

  // State to hold the generated color after validation.
  const [generatedColor, setGeneratedColor] = useState<string | null>(null);

  // State to hold the name of the color set, defaulting to 'primary' if not provided.
  const [colorName, setColorName] = useState<string>(
    initialColorName || "primary",
  );

  // State to hold a validated color name to pass to GenerateContrastGridColors
  const [validatedColorName, setValidatedColorName] = useState<string | null>(
    ALLOWED_COLOR_NAMES.includes(initialColorName) ? initialColorName : null,
  );

  /**
   * Handler function to generate color shades based on the base color.
   * Validates the color name and base color, generates shades, and calls the callback.
   */
  const handleGenerateColors = useCallback(() => {
    // Trim and convert the color name to lowercase for validation.
    const trimmedColorName = colorName.trim().toLowerCase();

    // If the color name is empty, default to 'primary'.
    if (trimmedColorName === "") {
      setColorName("primary");
      setValidatedColorName("primary");
    }
    // If the color name is not in the allowed list, show an error toast.
    else if (!ALLOWED_COLOR_NAMES.includes(trimmedColorName)) {
      toast.error(
        `Invalid color name. Use one of the following: ${ALLOWED_COLOR_NAMES.join(", ")}`,
      );
      setValidatedColorName(null); // Reset validated name if invalid
      return;
    } else {
      // Set the validated color name if it is valid
      setValidatedColorName(trimmedColorName);
    }

    // Validate the base color using chroma.js.
    if (valid(color)) {
      setGeneratedColor(color);
      const shades = generateColorShades(color);
      onColorsGenerated({
        colorName: trimmedColorName,
        baseColor: color.toUpperCase(),
        shades,
      });
    } else {
      toast.error("Invalid color input");
    }
  }, [color, colorName, onColorsGenerated]);

  // Luminance is a method in chroma.js that calculates the brightness of 'color' and returns a value between 0 and 1
  const luminance = chroma(color).luminance();

  return (
    <section
      className="mt-10 rounded-xl border-2 border-gray-200 p-4"
      data-testid={`color-section-${initialColorName}`} // Test ID for testing
    >
      {/* Button to remove the color section */}
      <div className="flex justify-end pb-2 md:pb-0">
        <Button
          onClick={onDelete}
          className="font-bold text-red-500 hover:bg-red-500 hover:text-white"
        >
          Remove
        </Button>
      </div>

      {/* Input field for the color name */}
      <input
        data-testid="color-name-input" // Test ID for testing
        type="text"
        value={colorName}
        onChange={(e) => setColorName(e.target.value)}
        placeholder="Color Name: primary, secondary..."
        className="mb-4 w-full rounded-lg border px-2 py-1 text-center md:w-64"
      />

      {/* Component for inputting and previewing the base color */}
      <ColorInput colorValue={color} onChangeColor={setColor} />

      {/* Button to generate color shades */}
      <div className="mt-6 text-center">
        <Button
          dataTestid="generate-colors" // Test ID for testing
          onClick={handleGenerateColors}
          className={clsx({
            "font-bold text-black": luminance > 0.5, // if luminance is greater than 0.5, make the button text black and bold
            "font-bold text-white": luminance <= 0.5, // if luminance is less than or equal to 0.5, make the button text white and bold
          })}
          style={{ backgroundColor: color }}
        >
          Generate Colors
        </Button>
      </div>

      {/* Display the generated color shades if available and name is valid */}
      {generatedColor && validatedColorName && (
        <div className="my-6">
          <GenerateContrastGridColors
            baseColor={generatedColor}
            colorName={validatedColorName}
          />
        </div>
      )}
    </section>
  );
}

export default ColorSection;
