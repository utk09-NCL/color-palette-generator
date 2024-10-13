// src/components/ContrastChecker/GenerateContrastGridColors.jsx

import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import chroma, { scale } from "chroma-js";

import ExportColorsModal from "../ExportColors/ExportColorsModal";
import Button from "../Shared/Button";
import { TOTAL_SHADES } from "../../constants";

import ContrastCheckerModal from "./ContrastCheckerModal";

/**
 * Component to display a grid of color shades and provide options to export or check contrast.
 *
 * @param {string} props.baseColor - The base color from which shades are generated.
 * @param {string} props.colorName - The name of the color set. Default "primary"
 * @returns {JSX.Element} The rendered component.
 */
const GenerateContrastGridColors = ({ baseColor, colorName = "primary" }) => {
  // State to manage the visibility of the Export Colors modal.
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // State to manage the visibility of the Contrast Checker modal.
  const [isContrastModalOpen, setIsContrastModalOpen] = useState(false);

  /**
   * Memoized computation of color shades to avoid unnecessary recalculations.
   * Generates an array of chroma color objects representing the shades.
   */
  const shades = useMemo(
    () =>
      scale(
        [chroma(baseColor).brighten(1.5), chroma(baseColor).darken(2)], // Create a scale from lighter to darker.
      )
        .mode("lab") // Use Lab color space for perceptual uniformity.
        .colors(TOTAL_SHADES) // Generate the specified number of shades.
        .map((color) => chroma(color)), // Convert each color to a chroma object.
    [baseColor], // Recompute only when baseColor changes.
  );

  /**
   * Determines the appropriate text color (black or white) for readability against a given background color.
   *
   * @param {chroma} bgColor - The background color as a chroma object.
   * @returns {string} The HEX code of the text color.
   */
  const getTextColor = (bgColor) => {
    const luminance = chroma(bgColor).luminance(); // Get the luminance of the background color.
    return luminance > 0.5 ? "#000000" : "#ffffff"; // Return black text for light backgrounds and white text for dark backgrounds.
  };

  return (
    <div data-testid={`generated-colors-${colorName}`}>
      {/* Action buttons */}
      <div className="flex justify-end mb-4 space-x-4">
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
          const step =
            index === 0 ? 50 : index === TOTAL_SHADES - 1 ? 950 : index * 100;

          // Get the appropriate text color for the shade.
          const textColor = getTextColor(shade);

          // Use the provided color name or default to 'primary'.
          const name = colorName.trim() || "primary";

          return (
            // Individual shade block
            <div
              key={shade.hex()} // Unique key for React rendering.
              className="p-2 text-center"
              style={{
                backgroundColor: shade.hex(), // Set background to the shade color.
                color: textColor, // Set text color for readability.
              }}
            >
              {/* Display the shade step (e.g., 100, 200) */}
              <p className="font-light">{`${step}`}</p>

              {/* Display the HEX code of the shade */}
              <p className="font-medium">{shade.hex().toUpperCase()}</p>

              {/* Display the color name */}
              <p className="mt-2">{name}</p>
            </div>
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
          shades={shades} // Pass the generated shades
          colorName={colorName} // Pass the color name
        />
      )}
    </div>
  );
};

// Define prop types for type checking and documentation.
GenerateContrastGridColors.propTypes = {
  baseColor: PropTypes.string.isRequired, // The base color in HEX or named format.
  colorName: PropTypes.string, // Optional color name.
};

export default GenerateContrastGridColors;
