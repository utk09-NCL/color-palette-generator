// src/components/ColorSection/ColorSection.tsx

import chroma, { valid } from "chroma-js";
import clsx from "clsx";
import { type ReactElement, useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import ColorInput from "@components/ColorInput/ColorInput";
import GenerateContrastGridColors from "@components/ContrastChecker/GenerateContrastGridColors";
import Button from "@components/Shared/Button";
import Select, { type SelectOption } from "@components/Shared/Select";
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
  colorName: string;
  onColorNameChange: (_newColorName: string) => void;
  onDelete: () => void;
  onColorsGenerated: (_colorData: ColorData) => void;
  usedColorNames: string[];
};

/**
 * Component representing a section for inputting a color and generating its shades.
 *
 * @param {ColorSectionProps} props - The props for the component.
 * @returns {ReactElement} The rendered component.
 */
function ColorSection({
  colorName,
  onColorNameChange,
  onDelete,
  onColorsGenerated,
  usedColorNames,
}: ColorSectionProps): ReactElement {
  // State to hold the base color input by the user.
  const [color, setColor] = useState<string>("#bc560a");

  // State to hold the generated color after validation.
  const [generatedColor, setGeneratedColor] = useState<string | null>(null);

  // Prepare options for the Select component
  const colorNameOptions: SelectOption[] = ALLOWED_COLOR_NAMES.map((name) => ({
    label: name.charAt(0).toUpperCase() + name.slice(1),
    value: name,
  }));

  // Filter out used color names (except the current one)
  const availableColorNameOptions = colorNameOptions.filter(
    (option) => option.value === colorName || !usedColorNames.includes(option.value),
  );

  /**
   * Handler function to generate color shades based on the base color.
   * Validates the base color, generates shades, and calls the callback.
   */
  const handleGenerateColors = useCallback(() => {
    // Validate the base color using chroma.js.
    if (valid(color)) {
      setGeneratedColor(color);
      const shades = generateColorShades(color);
      onColorsGenerated({
        colorName: colorName,
        baseColor: color.toUpperCase(),
        shades,
      });
    } else {
      toast.error("Invalid color input");
    }
  }, [color, colorName, onColorsGenerated]);

  // Calculate luminance to determine text color for the generate button.
  const luminance = chroma(color).luminance();

  return (
    <section
      className="mt-10 rounded-xl border-2 border-gray-200 p-4"
      data-testid={`color-section-${colorName}`} // Test ID for testing
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

      {/* Select dropdown for the color name */}
      <Select
        label="Color Name"
        dataTestid="color-name-select" // Test ID for testing
        value={colorName}
        onChange={onColorNameChange}
        options={availableColorNameOptions}
        className="mb-4 w-full md:w-64"
      />

      {/* Component for inputting and previewing the base color */}
      <ColorInput colorValue={color} onChangeColor={setColor} />

      {/* Button to generate color shades */}
      <div className="mt-6 text-center">
        <Button
          dataTestid="generate-colors" // Test ID for testing
          onClick={handleGenerateColors}
          className={clsx({
            "font-bold text-black": luminance > 0.5, // If luminance > 0.5, use black text
            "font-bold text-white": luminance <= 0.5, // If luminance <= 0.5, use white text
          })}
          style={{ backgroundColor: color }}
        >
          Generate Colors
        </Button>
      </div>

      {/* Display the generated color shades if available */}
      {generatedColor && (
        <div className="my-6">
          <GenerateContrastGridColors baseColor={generatedColor} colorName={colorName} />
        </div>
      )}
    </section>
  );
}

export default ColorSection;
