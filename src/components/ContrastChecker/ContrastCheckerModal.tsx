// src/components/ContrastChecker/ContrastCheckerModal.tsx

import { type ReactElement } from "react";
import { type Color } from "chroma-js";

import useContrastData from "@hooks/useContrastData";
import Modal from "@components/Shared/Modal";
import Button from "@components/Shared/Button";

import ContrastTable from "./ContrastTable";

/**
 * Props for the ContrastCheckerModal component.
 */
export type ContrastCheckerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  shades: Color[]; // Array of chroma color objects representing shades
};

/**
 * Modal component to display contrast ratios between colors.
 *
 * @param {boolean} isOpen - Whether the modal is open.
 * @param {function} onClose - Function to close the modal.
 * @param {Color[]} shades - Array of chroma color objects representing shades.
 * @returns {ReactElement} The rendered component.
 */
const ContrastCheckerModal = ({
  isOpen,
  onClose,
  shades,
}: ContrastCheckerModalProps): ReactElement => {
  // Use the custom hook to get the contrast data
  const data = useContrastData(shades);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Modal Header */}
      <div className="mb-4 flex justify-between">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Color Contrast Checker</h3>
        <Button onClick={onClose} className="bg-white text-black hover:bg-gray-300">
          Close
        </Button>
      </div>

      {/* Contrast Table */}
      <ContrastTable data={data} />
    </Modal>
  );
};

export default ContrastCheckerModal;
