// src/components/ColorInput/ColorPreview.tsx

import { type ReactElement } from "react";

/**
 * Props for the ColorPreview component.
 */
export type ColorPreviewProps = {
  color: string;
};

/**
 * Component to display a preview of the current color.
 *
 * @param {string} color - The color to display in the preview.
 * @returns {ReactElement} The rendered component.
 */
const ColorPreview = ({ color }: ColorPreviewProps): ReactElement => {
  return (
    // A div element styled to display the selected color
    <div
      className="h-24 w-full rounded-lg shadow-2xl lg:h-32 lg:w-full"
      style={{ backgroundColor: color }} // Inline style to set the background color
    ></div>
  );
};

export default ColorPreview;
