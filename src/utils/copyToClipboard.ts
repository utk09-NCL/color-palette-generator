// src/utils/copyToClipboard.ts
import { toast } from "react-hot-toast";

/**
 * Copy text to the clipboard.
 *
 * @param {string} dataToCopy - The data to copy to the clipboard.
 * @returns {Promise<void>} A promise that resolves when the copy operation is complete.
 */
export const copyToClipboard = (dataToCopy: string): Promise<void> => {
  return navigator.clipboard.writeText(dataToCopy);
};

/**
 *
 * @param {string} dataToCopy - The data to copy to the clipboard.
 * @param {string} successMessage - The message to display on successful copy.
 * @param {string} errorMessage - The message to display on failed copy.
 * @returns {Promise<void>} A promise that resolves when the copy operation is complete.
 */
export const copyTextWithToast = async (
  dataToCopy: string,
  successMessage: string,
  errorMessage: string,
): Promise<void> => {
  try {
    await copyToClipboard(dataToCopy);
    toast.success(successMessage);
  } catch {
    toast.error(errorMessage);
  }
};
