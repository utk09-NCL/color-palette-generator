// Home.tsx

import { useState, type ReactElement } from "react";
import { toast } from "react-hot-toast";

import { ALLOWED_COLOR_NAMES } from "@constants/index";
import {
  generateExportData,
  type ExportData,
  type GeneratedColors,
} from "@utils/colorUtils";
import Button from "@components/Shared/Button";
import ColorSection from "@components/ColorSection/ColorSection";
import { type ColorData } from "@components/ColorSection/ColorSection";

/**
 * Type for each color section in the app.
 */
export type ColorSectionType = {
  id: number;
  initialColorName: string;
};

/**
 * The main Home component that renders the application.
 * This component manages the state of color sections and generated colors.
 * It also provides functions to add, remove, and export colors.
 *
 * @returns {ReactElement} The Home component.
 */
const Home = (): ReactElement => {
  // State to keep track of color sections added by the user.
  const [sections, setSections] = useState<ColorSectionType[]>([
    { id: Date.now(), initialColorName: "primary" },
  ]);

  // State to store all generated colors from the color sections.
  const [generatedColors, setGeneratedColors] = useState<GeneratedColors>({});

  /**
   * Adds a new color section to the app.
   * Suggests a default color name based on ALLOWED_COLOR_NAMES.
   */
  const addSection = (): void => {
    // Get the names of existing color sections.
    const existingNames = sections.map((s) => s.initialColorName);

    // Filter out names that are already used.
    const availableNames = ALLOWED_COLOR_NAMES.filter(
      (name) => !existingNames.includes(name),
    );

    // Use the next available name or create a custom one if none are left.
    const nextName = availableNames[0] || `custom-${Date.now()}`;

    // Add the new section to the sections state.
    setSections((prevSections) => [
      ...prevSections,
      { id: Date.now(), initialColorName: nextName },
    ]);

    // setSections triggers a re-render of the component, so adding a slight delay ensures the toast doesn't disappear prematurely.
    setTimeout(() => toast.success("Color set added!"), 50);
  };

  /**
   * Removes a color section by its unique ID.
   *
   * @param {number} id - The unique identifier of the section to remove.
   */
  const removeSection = (id: number): void => {
    // Update the sections state to exclude the removed section.
    setSections((prevSections) => prevSections.filter((s) => s.id !== id));

    // Remove the associated generated colors from the state.
    setGeneratedColors((prevColors) => {
      const newColors = { ...prevColors };
      delete newColors[id];
      return newColors;
    });

    toast.success("Color set removed!");
  };

  /**
   * Handles the event when colors are generated in a section.
   *
   * @param {number} id - The unique identifier of the section.
   * @param {ColorData} colorData - The generated color data from the section.
   */
  const handleColorsGenerated = (id: number, colorData: ColorData): void => {
    // Update the generatedColors state with the new color data.
    setGeneratedColors((prevColors) => ({
      ...prevColors,
      [id]: colorData,
    }));
  };

  /**
   * Exports all generated colors as a JSON string and copies it to the clipboard.
   */
  const exportAllColorsAsJSON = (): void => {
    // Combine all color data into a single object.
    const exportData: ExportData = generateExportData(generatedColors);

    // Convert the color data object to a JSON string with indentation.
    const jsonString = JSON.stringify(exportData, null, 2);

    // Copy the JSON string to the clipboard.
    navigator.clipboard.writeText(jsonString).then(
      () => toast.success("All colors copied to clipboard!"),
      () => toast.error("Failed to copy colors to clipboard."),
    );
  };

  /**
   * Exports all generated colors as CSS variables and copies them to the clipboard.
   */
  const exportAllColorsAsCSSVariables = (): void => {
    // Combine all color data into a single object.
    const exportData: ExportData = generateExportData(generatedColors);

    // Convert the color data to CSS variable declarations.
    const cssVariables = Object.entries(exportData).reduce(
      (acc: string[], [colorName, shades]) => {
        const colorVariables = Object.entries(shades).map(
          ([step, shade]) => `--${colorName}-${step}: ${shade};`,
        );
        return [...acc, ...colorVariables];
      },
      [],
    );

    // Create a CSS string with the variables inside the :root selector.
    const cssString = `:root {\n  ${cssVariables.join("\n  ")}\n}`;

    // Copy the CSS string to the clipboard.
    navigator.clipboard.writeText(cssString).then(
      () => toast.success("All colors copied to clipboard!"),
      () => toast.error("Failed to copy colors to clipboard."),
    );
  };

  return (
    <main className="container mx-auto mt-12 px-6 py-12">
      {/* Buttons for adding sections and exporting colors */}
      <div className="flex flex-wrap items-center justify-center space-x-4">
        {/* Button to add a new color set */}
        <Button onClick={addSection} className="bg-rose-600 text-white">
          Add Color Set
        </Button>

        {/* Conditionally render export buttons if colors are generated */}
        {Object.keys(generatedColors).length > 0 && (
          <>
            {/* Button to export all colors as JSON */}
            <Button
              onClick={exportAllColorsAsJSON}
              className="bg-emerald-600 text-white"
            >
              Export All Colors to JSON
            </Button>

            {/* Button to export all colors as CSS variables */}
            <Button
              onClick={exportAllColorsAsCSSVariables}
              className="bg-amber-600 text-white"
            >
              Export All Colors to HEX
            </Button>
          </>
        )}
      </div>

      {/* Render each ColorSection component */}
      {sections.map((section) => (
        <ColorSection
          key={section.id} // Unique key for React rendering
          initialColorName={section.initialColorName} // Initial color name
          onDelete={() => removeSection(section.id)} // Callback to remove section
          onColorsGenerated={(colorData) =>
            handleColorsGenerated(section.id, colorData)
          } // Callback when colors are generated
        />
      ))}
    </main>
  );
};

export default Home;
