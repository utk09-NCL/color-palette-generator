// src/components/ExportColors/ExportColorsModal.tsx

import { useState, ReactElement } from "react";
import { type Color } from "chroma-js";
import { toast } from "react-hot-toast";
import clsx from "clsx";

import { EXPORT_FORMATS } from "@constants/index";
import Modal from "@components/Shared/Modal";
import Button from "@components/Shared/Button";
import { generateExportCode, type ExportFormat } from "@utils/exportUtils";

/**
 * Props for the ExportColorsModal component.
 */
export type ExportColorsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  shades: Record<string, Color[]>;
};

const ExportColorsModal = ({ isOpen, onClose, shades }: ExportColorsModalProps): ReactElement => {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>("tailwindHex");

  const codeOutput = generateExportCode(shades, selectedFormat);

  const handleCopy = (): void => {
    navigator.clipboard.writeText(codeOutput).then(
      () => toast.success("Code copied to clipboard!"),
      () => toast.error("Failed to copy code to clipboard."),
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="mb-4 text-lg font-medium leading-6 text-gray-900">Export Colors</h3>

      <div className="lg:flex">
        <div className="lg:w-1/4 lg:border-r lg:pr-4">
          <ul className="grid grid-cols-2 gap-4 lg:block">
            {EXPORT_FORMATS.map((option) => (
              <li key={option.id} className="mb-2">
                <Button
                  onClick={() => setSelectedFormat(option.id as ExportFormat)}
                  className={clsx(
                    "w-full px-2 py-1 text-center shadow-sm lg:text-left",
                    selectedFormat === option.id ? "bg-blue-500 text-white" : "hover:bg-gray-100",
                  )}
                >
                  {option.name}
                </Button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 lg:mt-0 lg:w-3/4 lg:pl-4">
          <pre className="h-64 overflow-auto rounded-[10px] bg-gray-100 p-4 shadow-sm">
            <code>{codeOutput}</code>
          </pre>
          <div className="mt-4 flex justify-between">
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
