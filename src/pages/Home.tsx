// src/pages/Home.tsx

import { useState, ReactElement } from "react";
import { toast } from "react-hot-toast";
import chroma, { type Color } from "chroma-js";

import { ALLOWED_COLOR_NAMES } from "@constants/index";
import Button from "@components/Shared/Button";
import ColorSection, { ColorData } from "@components/ColorSection/ColorSection";
import ExportColorsModal from "@components/ExportColors/ExportColorsModal";

export type ColorSectionType = {
  id: number;
  initialColorName: string;
};

const Home = (): ReactElement => {
  const [sections, setSections] = useState<ColorSectionType[]>([
    { id: Date.now(), initialColorName: "primary" },
  ]);
  const [generatedColors, setGeneratedColors] = useState<
    Record<number, ColorData>
  >({});
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const addSection = (): void => {
    const existingNames = sections.map((s) => s.initialColorName);
    const availableNames = ALLOWED_COLOR_NAMES.filter(
      (name) => !existingNames.includes(name),
    );
    const nextName = availableNames[0] || `custom-${Date.now()}`;

    setSections((prevSections) => [
      ...prevSections,
      { id: Date.now(), initialColorName: nextName },
    ]);

    setTimeout(() => toast.success("Color set added!"), 50);
  };

  const removeSection = (id: number): void => {
    setSections((prevSections) => prevSections.filter((s) => s.id !== id));
    setGeneratedColors((prevColors) => {
      const newColors = { ...prevColors };
      delete newColors[id];
      return newColors;
    });
    toast.success("Color set removed!");
  };

  const handleColorsGenerated = (id: number, colorData: ColorData): void => {
    setGeneratedColors((prevColors) => ({
      ...prevColors,
      [id]: colorData,
    }));
  };

  const getAllShadesByName = (): Record<string, Color[]> => {
    return Object.values(generatedColors).reduce(
      (acc, colorData) => {
        acc[colorData.colorName] = colorData.shades.map((shade) =>
          chroma(shade),
        );
        return acc;
      },
      {} as Record<string, Color[]>,
    );
  };

  return (
    <main className="container mx-auto mt-12 px-6 py-12">
      <div className="flex flex-wrap items-center justify-center space-x-4">
        <Button onClick={addSection} className="bg-rose-600 text-white">
          Add Color Set
        </Button>
        {Object.keys(generatedColors).length > 0 && (
          <Button
            onClick={() => setIsExportModalOpen(true)}
            className="bg-blue-600 text-white"
          >
            Export All Colors
          </Button>
        )}
      </div>

      {sections.map((section) => (
        <ColorSection
          key={section.id}
          initialColorName={section.initialColorName}
          onDelete={() => removeSection(section.id)}
          onColorsGenerated={(colorData) =>
            handleColorsGenerated(section.id, colorData)
          }
        />
      ))}

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
