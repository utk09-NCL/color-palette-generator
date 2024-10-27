// src/components/ExportColors/ExportColorsModal.tsx

import { useState, ReactElement } from "react";
import { type Color } from "chroma-js";
import { toast } from "react-hot-toast";
import clsx from "clsx";

import { EXPORT_FORMATS } from "@constants/index";
import Modal from "@components/Shared/Modal";
import Button from "@components/Shared/Button";

/**
 * Props for the ExportColorsModal component.
 */
export type ExportColorsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  shades: Color[];
  colorName: string;
};

/**
 * Modal component to export generated colors in various formats.
 *
 * @param {ExportColorsModalProps} props - Modal settings, color data, and handlers.
 * @returns {ReactElement} The rendered component.
 */
const ExportColorsModal = ({
  isOpen,
  onClose,
  shades,
  colorName,
}: ExportColorsModalProps): ReactElement => {
  const [selectedFormat, setSelectedFormat] = useState("tailwindHex");

  // Generate code output based on the selected format
  const generateCodeOutput = (): string => {
    const shadeSteps = shades.map((shade, index) => {
      const step =
        index === 0 ? 50 : index === shades.length - 1 ? 950 : index * 100;

      // Get HSL and handle NaN for hue
      const [h, s, l] = shade.hsl();
      const hue = isNaN(h) ? 0 : Math.round(h);
      const saturation = Math.round(s * 100);
      const lightness = Math.round(l * 100);

      switch (selectedFormat) {
        case "tailwindHex":
          return `  '${step}': '${shade.hex().toUpperCase()}',`;
        case "tailwindHsl":
          return `  '${step}': 'hsl(${hue}, ${saturation}%, ${lightness}%)',`;
        case "scssHex":
          return `$${colorName}-${step}: ${shade.hex().toUpperCase()};`;
        case "cssHex":
          return `  --${colorName}-${step}: ${shade.hex().toUpperCase()};`;
        case "cssHsl":
          return `  --${colorName}-${step}: hsl(${hue}, ${saturation}%, ${lightness}%);`;
        case "cssRgb": {
          const [r, g, b] = shade.rgb();
          return `  --${colorName}-${step}: rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)});`;
        }
        default:
          return "";
      }
    });

    switch (selectedFormat) {
      case "tailwindHex":
      case "tailwindHsl":
        return `'${colorName}': {\n${shadeSteps.join("\n")}\n}`;
      case "scssHex":
        return shadeSteps.join("\n");
      case "cssHex":
      case "cssHsl":
      case "cssRgb":
        return `:root {\n${shadeSteps.join("\n")}\n}`;
      default:
        return "";
    }
  };

  const codeOutput = generateCodeOutput();

  // Handle copying code to clipboard
  const handleCopy = (): void => {
    navigator.clipboard.writeText(codeOutput).then(
      () => toast.success("Code copied to clipboard!"),
      () => toast.error("Failed to copy code to clipboard."),
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Modal Header */}
      <h3 className="mb-4 text-lg font-medium leading-6 text-gray-900">
        Export Colors
      </h3>

      <div className="lg:flex">
        {/* Format Selection Sidebar */}
        <div className="lg:w-1/4 lg:border-r lg:pr-4">
          <ul className="grid grid-cols-2 gap-4 lg:block">
            {EXPORT_FORMATS.map((option) => (
              <li key={option.id} className="mb-2 border-0 border-black">
                <Button
                  onClick={() => setSelectedFormat(option.id)}
                  className={clsx(
                    "w-full border-0 border-black px-2 py-1 text-center shadow-sm shadow-gray-400 lg:text-left",
                    selectedFormat === option.id
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100",
                  )}
                >
                  {option.name}
                </Button>
              </li>
            ))}
          </ul>
        </div>
        {/* Code Display Area */}
        <div className="mt-4 lg:mt-0 lg:w-3/4 lg:pl-4">
          <pre className="h-64 overflow-auto rounded-[10px] bg-gray-100 p-4 shadow-sm shadow-gray-400">
            <code>{codeOutput}</code>
          </pre>
          <div className="mt-4 flex justify-between">
            {/* Buttons for copying code and closing the modal */}
            <Button onClick={handleCopy} className="bg-blue-500 text-white">
              Copy Code
            </Button>
            <Button onClick={onClose} className="bg-white text-black">
              Close
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ExportColorsModal;
