// src/components/Shared/Modal.jsx

import { Fragment } from "react";
import PropTypes from "prop-types";
import { Dialog, Transition } from "@headlessui/react";

/**
 * Reusable Modal component.
 *
 * @param {boolean} props.isOpen - Whether the modal is open.
 * @param {function} props.onClose - Function to close the modal.
 * @param {React.ReactNode} props.children - Modal content.
 * @returns {JSX.Element} The rendered component.
 */
const Modal = ({ isOpen, onClose, children }) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center bg-black bg-opacity-50">
          {/* Centering trick */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          {/* Modal content */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-5xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
