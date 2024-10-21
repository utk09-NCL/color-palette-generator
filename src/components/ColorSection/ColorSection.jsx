// src/components/ColorSection/ColorSection.jsx

import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";
import chroma, { valid } from "chroma-js";
import clsx from "clsx";

import ColorInput from "../ColorInput/ColorInput";
import GenerateContrastGridColors from "../ContrastChecker/GenerateContrastGridColors";
import { ALLOWED_COLOR_NAMES } from "../../constants";
import Button from "../Shared/Button";
import { generateColorShades } from "../../utils/colorUtils";

/**
 * Component representing a section for inputting a color and generating its shades.
 *
 * @param {string} props.initialColorName - The initial name for the color. Default 'primary'
 * @param {function} props.onDelete - Function to call when the section is deleted.
 * @param {function} props.onColorsGenerated - Function to call when colors are generated.
 * @returns {JSX.Element} The rendered component.
 */
function ColorSection({
  initialColorName = "primary",
  onDelete,
  onColorsGenerated,
}) {
  // State to hold the base color input by the user.
  const [color, setColor] = useState("#bc560a");

  // State to hold the generated color after validation.
  const [generatedColor, setGeneratedColor] = useState(null);

  // State to hold the name of the color set, defaulting to 'primary' if not provided.
  const [colorName, setColorName] = useState(initialColorName || "primary");

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
    }
    // If the color name is not in the allowed list, show an error toast.
    else if (!ALLOWED_COLOR_NAMES.includes(trimmedColorName)) {
      toast.error(
        `Invalid color name. Use one of the following: ${ALLOWED_COLOR_NAMES.join(", ")}`,
      );
      return;
    }

    // Validate the base color using chroma.js.
    if (valid(color)) {
      setGeneratedColor(color);
      const shades = generateColorShades(color);
      onColorsGenerated({
        colorName: colorName.trim(),
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
      className="p-4 border-2 border-gray-200 rounded-xl mt-10"
      data-testid={`color-section-${initialColorName}`} // Test ID for testing
    >
      {/* Button to remove the color section */}
      <div className="flex justify-end pb-2 md:pb-0">
        <Button
          onClick={onDelete}
          className="text-red-500 font-bold hover:bg-red-500 hover:text-white"
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
        className="border px-2 py-1 rounded-lg w-full md:w-64 mb-4 text-center"
      />

      {/* Component for inputting and previewing the base color */}
      <ColorInput colorValue={color} onChangeColor={setColor} />

      {/* Button to generate color shades */}
      <div className="text-center mt-6">
        <Button
          dataTestid="generate-colors" // Test ID for testing
          onClick={handleGenerateColors}
          className={clsx({
            "text-black font-bold": luminance > 0.5, // if luminance is greater than 0.5, make the button text black and bold
            "text-white font-bold": luminance <= 0.5, // if luminance is less than or equal to 0.5, make the button text white and bold
          })}
          style={{ backgroundColor: color }}
        >
          Generate Colors
        </Button>
      </div>

      {/* Display the generated color shades if available */}
      {generatedColor && (
        <div className="my-6">
          <GenerateContrastGridColors
            baseColor={generatedColor}
            colorName={colorName || "primary"}
          />
        </div>
      )}
    </section>
  );
}

// Define the expected prop types for the component.
ColorSection.propTypes = {
  initialColorName: PropTypes.string,
  onDelete: PropTypes.func,
  onColorsGenerated: PropTypes.func,
};

export default ColorSection;
