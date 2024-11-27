// src/pages/Home.tsx

import chroma, { type Color } from "chroma-js";
import { type ReactElement, useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import ColorSection, { type ColorData } from "@components/ColorSection/ColorSection";
import ExportColorsModal from "@components/ExportColors/ExportColorsModal";
import Button from "@components/Shared/Button";
import { ALLOWED_COLOR_NAMES } from "@constants/index";

/**
 * Type representing a color section in the application.
 */
export type ColorSectionType = {
  id: number;
  colorName: string;
};

/**
 * Home page component that allows users to add color sections, generate color shades,
 * and export the colors in various formats.
 *
 * @returns {ReactElement} The rendered Home component.
 */
const Home = (): ReactElement => {
  // State to manage the list of color sections.
  const [sections, setSections] = useState<ColorSectionType[]>([
    { id: Date.now(), colorName: "primary" },
  ]);

  // State to keep track of generated colors from each section.
  const [generatedColors, setGeneratedColors] = useState<Record<number, ColorData>>({});

  // State to control the visibility of the export modal.
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  /**
   * Adds a new color section to the page.
   */
  const addSection = useCallback((): void => {
    setSections((prevSections) => {
      const existingNames = prevSections.map((s) => s.colorName);
      const availableNames = ALLOWED_COLOR_NAMES.filter((name) => !existingNames.includes(name));
      const nextName = availableNames[0] || `custom-${Date.now()}`;

      return [...prevSections, { id: Date.now(), colorName: nextName }];
    });

    // Show a toast notification after adding a new color set.
    setTimeout(() => toast.success("Color set added!"), 50);
  }, []);

  /**
   * Removes a color section from the page.
   *
   * @param {number} id - The ID of the section to remove.
   */
  const removeSection = useCallback((id: number): void => {
    setSections((prevSections) => prevSections.filter((s) => s.id !== id));
    setGeneratedColors((prevColors) => {
      const newColors = { ...prevColors };
      delete newColors[id];
      return newColors;
    });
    toast.success("Color set removed!");
  }, []);

  /**
   * Handles the event when colors are generated in a section.
   *
   * @param {number} id - The ID of the section.
   * @param {ColorData} colorData - The generated color data.
   */
  const handleColorsGenerated = useCallback((id: number, colorData: ColorData): void => {
    setGeneratedColors((prevColors) => ({
      ...prevColors,
      [id]: colorData,
    }));
  }, []);

  /**
   * Handles the event when a color name changes in a section.
   *
   * @param {number} id - The ID of the section.
   * @param {string} newColorName - The new color name.
   */
  const handleColorNameChange = useCallback((id: number, newColorName: string): void => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === id ? { ...section, colorName: newColorName } : section,
      ),
    );
  }, []);

  /**
   * Aggregates all generated shades by their color names.
   *
   * @returns {Record<string, Color[]>} An object mapping color names to arrays of chroma Colors.
   */
  const getAllShadesByName = (): Record<string, Color[]> => {
    return Object.values(generatedColors).reduce(
      (acc, colorData) => {
        acc[colorData.colorName] = colorData.shades.map((shade) => chroma(shade));
        return acc;
      },
      {} as Record<string, Color[]>,
    );
  };

  return (
    <main className="container mx-auto mt-12 px-6 py-12">
      <div className="flex flex-wrap items-center justify-center space-x-4">
        {/* Button to add a new color section */}
        <Button onClick={addSection} className="bg-rose-600 text-white">
          Add Color Set
        </Button>
        {/* Button to open the export modal if there are generated colors */}
        {Object.keys(generatedColors).length > 0 && (
          <Button onClick={() => setIsExportModalOpen(true)} className="bg-blue-600 text-white">
            Export All Colors
          </Button>
        )}
      </div>

      {/* Render each color section */}
      {sections.map((section) => (
        <ColorSection
          key={section.id}
          colorName={section.colorName}
          onColorNameChange={(newColorName) => handleColorNameChange(section.id, newColorName)}
          onDelete={() => removeSection(section.id)}
          onColorsGenerated={(colorData) => handleColorsGenerated(section.id, colorData)}
          usedColorNames={sections.filter((s) => s.id !== section.id).map((s) => s.colorName)}
        />
      ))}

      {/* Export Colors Modal */}
      {isExportModalOpen && (
        <ExportColorsModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          shades={getAllShadesByName()}
        />
      )}
    </main>
  );
};

export default Home;
