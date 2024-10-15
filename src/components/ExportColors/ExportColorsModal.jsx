// src/components/ExportColors/ExportColorsModal.jsx

import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";
import clsx from "clsx";

import { EXPORT_FORMATS } from "../../constants";
import Modal from "../Shared/Modal";
import Button from "../Shared/Button";

/**
 * Modal component to export generated colors in various formats.
 *
 * @param {boolean} props.isOpen - Whether the modal is open.
 * @param {function} props.onClose - Function to close the modal.
 * @param {Array} props.shades - Array of chroma color objects representing shades.
 * @param {string} props.colorName - The name of the color set.
 * @returns {JSX.Element} The rendered component.
 */
const ExportColorsModal = ({ isOpen, onClose, shades, colorName }) => {
  const [selectedFormat, setSelectedFormat] = useState("tailwindHex");

  // Generate code output based on the selected format
  const generateCodeOutput = () => {
    const shadeSteps = shades.map((shade, index) => {
      const step =
        index === 0 ? 50 : index === shades.length - 1 ? 950 : index * 100;
      switch (selectedFormat) {
        case "tailwindHex":
          return `  '${step}': '${shade.hex().toUpperCase()}',`;
        case "tailwindHsl": {
          const [h, s, l] = shade.hsl();
          return `  '${step}': 'hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)',`;
        }
        case "scssHex":
          return `$${colorName}-${step}: ${shade.hex().toUpperCase()};`;
        case "cssHex":
          return `  --${colorName}-${step}: ${shade.hex().toUpperCase()};`;
        case "cssHsl": {
          const [h, s, l] = shade.hsl();
          return `  --${colorName}-${step}: hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%);`;
        }
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
  const handleCopy = () => {
    navigator.clipboard.writeText(codeOutput).then(
      () => toast.success("Code copied to clipboard!"),
      () => toast.error("Failed to copy code to clipboard."),
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Modal Header */}
      <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
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
                    "w-full text-center lg:text-left border-0 border-black py-1 px-2 shadow-sm shadow-gray-400 ",
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
        <div className="lg:w-3/4 lg:pl-4 mt-4 lg:mt-0">
          <pre className="bg-gray-100 p-4 rounded-[10px] h-64 overflow-auto shadow-sm shadow-gray-400">
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

ExportColorsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  shades: PropTypes.arrayOf(PropTypes.object).isRequired, // shades are chroma color objects
  colorName: PropTypes.string.isRequired,
};

export default ExportColorsModal;
