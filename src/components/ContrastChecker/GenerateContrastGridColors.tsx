// src/components/ContrastChecker/GenerateContrastGridColors.tsx

import { useState, useMemo, ReactElement } from "react";
import chroma, { type Color, scale } from "chroma-js";
import { toast } from "react-hot-toast";

import ExportColorsModal from "@components/ExportColors/ExportColorsModal";
import Button from "@components/Shared/Button";
import { TOTAL_SHADES } from "@constants/index";
import { copyToClipboard } from "@utils/copyToClipboard";

import ContrastCheckerModal from "./ContrastCheckerModal";

/**
 * Props for the GenerateContrastGridColors component.
 */
export type GenerateContrastGridColorsProps = {
  baseColor: string;
  colorName?: string;
};

/**
 * Component to display a grid of color shades and provide options to export or check contrast.
 *
 * @param {GenerateContrastGridColorsProps} props - The base color and color set name.
 * @returns {ReactElement} The rendered component.
 */
const GenerateContrastGridColors = ({
  baseColor,
  colorName = "primary",
}: GenerateContrastGridColorsProps): ReactElement => {
  // State to manage the visibility of the Export Colors modal.
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // State to manage the visibility of the Contrast Checker modal.
  const [isContrastModalOpen, setIsContrastModalOpen] = useState(false);

  /**
   * Memoized computation of color shades to avoid unnecessary recalculations.
   * Generates an array of chroma color objects representing the shades.
   */
  const shades: Color[] = useMemo(
    () =>
      scale([chroma(baseColor).brighten(1.5), chroma(baseColor).darken(2)]) // Create a scale from lighter to darker.
        .mode("lab") // Use Lab color space for perceptual uniformity.
        .colors(TOTAL_SHADES) // Generate the specified number of shades.
        .map((color) => chroma(color)), // Convert each color to a chroma object.
    [baseColor], // Recompute only when baseColor changes.
  );

  /**
   * Determines the appropriate text color (black or white) for readability against a given background color.
   *
   * @param {Color} bgColor - The background color as a chroma object.
   * @returns {string} The HEX code of the text color.
   */
  const getTextColor = (bgColor: Color): string => {
    const luminance = chroma(bgColor).luminance(); // Get the luminance of the background color.
    return luminance > 0.5 ? "#000000" : "#ffffff"; // Return black text for light backgrounds and white text for dark backgrounds.
  };

  const handleCopy = (dataToCopy: string): void => {
    copyToClipboard(dataToCopy).then(
      () => toast.success(`Copied ${dataToCopy} to clipboard!`),
      () => toast.error("Failed to copy code to clipboard."),
    );
  };

  return (
    <div data-testid={`generated-colors-${colorName}`}>
      {/* Action buttons */}
      <div className="mb-4 flex justify-end space-x-4">
        {/* Button to open the Export Colors modal */}
        <Button
          onClick={() => setIsExportModalOpen(true)}
          className="bg-white text-black hover:bg-gray-300"
        >
          Export Colors
        </Button>

        {/* Button to open the Contrast Checker modal */}
        <Button
          onClick={() => setIsContrastModalOpen(true)}
          className="bg-white text-black hover:bg-gray-300"
        >
          Check Colour Contrast
        </Button>
      </div>

      {/* Grid of color shades */}
      <div className="grid grid-cols-1 gap-0 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-11">
        {shades.map((shade, index) => {
          // Determine the shade step (e.g., 50, 100, ..., 950).
          const step = index === 0 ? 50 : index === TOTAL_SHADES - 1 ? 950 : index * 100;

          // Get the appropriate text color for the shade.
          const textColor = getTextColor(shade);

          // Use the provided color name or default to 'primary'.
          const name = colorName.trim() || "primary";

          return (
            // Individual shade block
            <Button
              key={shade.hex()} // Unique key for React rendering.
              className="p-2 text-center hover:cursor-pointer"
              style={{
                backgroundColor: shade.hex(), // Set background to the shade color.
                color: textColor, // Set text color for readability.
              }}
              onClick={() => handleCopy(shade.hex().toUpperCase())} // Copy Hex value to clipboard
            >
              {/* Display the shade step (e.g., 100, 200) */}
              <p className="font-light">{`${step}`}</p>

              {/* Display the HEX code of the shade */}
              <p className="font-medium">{shade.hex().toUpperCase()}</p>

              {/* Display the color name */}
              <p className="mt-2">{name}</p>
            </Button>
          );
        })}
      </div>

      {/* Contrast Checker Modal */}
      {isContrastModalOpen && (
        <ContrastCheckerModal
          isOpen={isContrastModalOpen}
          onClose={() => setIsContrastModalOpen(false)} // Close handler
          shades={shades} // Pass the generated shades
        />
      )}

      {/* Export Colors Modal */}
      {isExportModalOpen && (
        <ExportColorsModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)} // Close handler
          shades={{ [colorName]: shades }} // Pass the generated shades grouped by color name
        />
      )}
    </div>
  );
};

export default GenerateContrastGridColors;
