// src/utils/copyToClipboard.ts

export const copyToClipboard = (dataToCopy: string): Promise<void> => {
  return navigator.clipboard.writeText(dataToCopy);
};
