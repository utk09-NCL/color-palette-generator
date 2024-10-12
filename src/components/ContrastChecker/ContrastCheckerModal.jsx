// src/components/ContrastChecker/ContrastCheckerModal.jsx

import PropTypes from "prop-types";

import useContrastData from "../../hooks/useContrastData";
import Modal from "../Shared/Modal";
import Button from "../Shared/Button";

import ContrastTable from "./ContrastTable";

/**
 * Modal component to display contrast ratios between colors.
 *
 * @param {boolean} props.isOpen - Whether the modal is open.
 * @param {function} props.onClose - Function to close the modal.
 * @param {Array} props.shades - Array of chroma color objects representing shades.
 * @returns {JSX.Element} The rendered component.
 */
const ContrastCheckerModal = ({ isOpen, onClose, shades }) => {
  // Use the custom hook to get the contrast data
  const data = useContrastData(shades);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Modal Header */}
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Color Contrast Checker
        </h3>
        <Button
          onClick={onClose}
          className="bg-white text-black hover:bg-gray-300"
        >
          Close
        </Button>
      </div>

      {/* Contrast Table */}
      <ContrastTable data={data} />
    </Modal>
  );
};

ContrastCheckerModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  shades: PropTypes.arrayOf(PropTypes.object).isRequired, // shades are chroma color objects
};

export default ContrastCheckerModal;
