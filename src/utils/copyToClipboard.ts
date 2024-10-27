export const copyToClipboard = (dataToCopy) => {
  return navigator.clipboard.writeText(dataToCopy);
};
