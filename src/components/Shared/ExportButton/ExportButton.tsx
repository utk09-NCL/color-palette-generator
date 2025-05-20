// src/components/Shared/ExportButton/ExportButton.tsx
import clsx from "clsx";
import { JSX, useState } from "react";

import type { ColorDataState } from "@/store/colorTypes";

import { ExportModal } from "../ExportModal";

export interface ExportButtonProps {
  palette: ColorDataState;
  className?: string;
}

export function ExportButton({ palette, className = "" }: ExportButtonProps): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={clsx("rounded-sm border border-slate-900", className)}
      >
        Export
      </button>

      <ExportModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} palette={palette} />
    </>
  );
}
