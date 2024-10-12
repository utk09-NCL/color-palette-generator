// src/components/ColorSection/ColorSection.jsx

import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";
import chroma from "chroma-js";
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
    if (chroma.valid(color)) {
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

  return (
    <section className="p-4 border-2 border-gray-200 rounded-xl mt-10">
      {/* Button to remove the color section */}
      <div className="flex justify-end">
        <Button
          onClick={onDelete}
          className="text-red-500 font-bold hover:bg-red-500 hover:text-white"
        >
          Remove
        </Button>
      </div>

      {/* Input field for the color name */}
      <input
        type="text"
        value={colorName}
        onChange={(e) => setColorName(e.target.value)}
        placeholder="Color Name: primary, secondary..."
        className="border px-2 py-1 rounded-lg w-64 mb-4 text-center"
      />

      {/* Component for inputting and previewing the base color */}
      <ColorInput colorValue={color} onChangeColor={setColor} />

      {/* Button to generate color shades */}
      <div className="text-center mt-6">
        <Button
          onClick={handleGenerateColors}
          className={clsx({
            "bg-white text-black": color === "#ffffff",
            "text-white": color !== "#ffffff",
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
