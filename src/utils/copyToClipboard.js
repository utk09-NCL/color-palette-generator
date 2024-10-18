import { toast } from "react-hot-toast";

export const handleCopy = (dataToCopy) => {
  navigator.clipboard.writeText(dataToCopy).then(
    () => toast.success(`Copied ${dataToCopy} to clipboard!`),
    () => toast.error("Failed to copy code to clipboard."),
  );
};
