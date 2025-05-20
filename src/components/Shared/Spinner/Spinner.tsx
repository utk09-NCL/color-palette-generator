// src/components/Shared/Spinner/Spinner.tsx
import React from "react";

/**
 * A simple loading spinner.
 */
export const Spinner: React.FC = () => (
  <div className="flex items-center justify-center p-6">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
  </div>
);
