// src/components/ExportColors/ExportColorsModal.tsx

import { type Color } from "chroma-js";
import clsx from "clsx";
import { type ReactElement, useState } from "react";

import Button from "@components/Shared/Button";
import Modal from "@components/Shared/Modal";
import { EXPORT_FORMATS } from "@constants/index";
import { type ExportFormat, generateExportCode } from "@utils/exportUtils";

import { copyTextWithToast } from "@/utils/copyToClipboard";

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
    copyTextWithToast(codeOutput, "Code copied to clipboard!", "Failed to copy code.");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="mb-4 text-lg leading-6 font-medium text-gray-900">Export Colors</h3>

      <div className="lg:flex">
        <div className="lg:w-1/4 lg:border-r lg:pr-4">
          <ul className="grid grid-cols-2 gap-4 lg:block">
            {EXPORT_FORMATS.map((option) => (
              <li key={option.id} className="mb-2">
                <Button
                  onClick={() => setSelectedFormat(option.id as ExportFormat)}
                  className={clsx(
                    "w-full px-2 py-1 text-center shadow-xs lg:text-left",
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
          <pre className="h-64 overflow-auto rounded-[10px] bg-gray-100 p-4 shadow-xs">
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
