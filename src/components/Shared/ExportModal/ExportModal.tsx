// src/components/Shared/ExportModal/ExportModal.tsx
import { Fragment, JSX, useState } from "react";
import toast from "react-hot-toast";
import { BsCheck2, BsClipboard, BsX } from "react-icons/bs";

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";

import { EXPORT_FORMATS } from "@/constants";
import { type ExportFormat, exportPalette } from "@/services/exportService";
import type { ColorDataState } from "@/store/colorTypes";

export interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  palette: ColorDataState;
}

export function ExportModal({ isOpen, onClose, palette }: ExportModalProps): JSX.Element {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>("tailwindHex");
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  // Generate the code preview for the selected format
  const generatePreview = (): string => {
    if (!palette.generatedShades || palette.generatedShades.length === 0) {
      return "// Please generate color shades first to see the export preview";
    }

    try {
      const result = exportPalette(palette, selectedFormat);
      return result.content;
    } catch (error) {
      console.error("Failed to generate preview:", error);
      return "// Error generating preview";
    }
  };

  const handleCopy = async (content: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedFormat(selectedFormat);
      toast.success("Code copied to clipboard!");

      // Reset copied state after 2 seconds
      setTimeout(() => setCopiedFormat(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error("Failed to copy to clipboard");
    }
  };

  const previewContent = generatePreview();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-6xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                  <DialogTitle as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Export Palette: {palette.name}
                  </DialogTitle>
                  <button
                    onClick={onClose}
                    className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                  >
                    <BsX className="h-5 w-5" />
                  </button>
                </div>

                {/* Main Content */}
                <div className="grid h-[600px] grid-cols-1 gap-6 lg:grid-cols-3">
                  {/* Left Column - Format List */}
                  <div className="lg:col-span-1">
                    <h4 className="mb-3 text-sm font-medium text-gray-900">Export Formats</h4>
                    <div className="space-y-2">
                      {EXPORT_FORMATS.map((format) => (
                        <button
                          key={format.id}
                          onClick={() => setSelectedFormat(format.id as ExportFormat)}
                          className={`w-full rounded-lg border px-4 py-3 text-left transition-colors ${
                            selectedFormat === format.id
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          <div className="font-medium">{format.name}</div>
                          <div className="mt-1 text-xs text-gray-500">
                            {format.id.includes("tailwind") && "Tailwind CSS config"}
                            {format.id.includes("scss") && "SCSS variables"}
                            {format.id.includes("css") &&
                              !format.id.includes("tailwind") &&
                              "CSS custom properties"}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right Column - Code Preview */}
                  <div className="flex flex-col lg:col-span-2">
                    <div className="mb-3 flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">Code Preview</h4>
                      <button
                        onClick={() => handleCopy(previewContent)}
                        className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                          copiedFormat === selectedFormat
                            ? "border border-green-200 bg-green-100 text-green-700"
                            : "border border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        disabled={!palette.generatedShades || palette.generatedShades.length === 0}
                      >
                        {copiedFormat === selectedFormat ? (
                          <>
                            <BsCheck2 className="h-4 w-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <BsClipboard className="h-4 w-4" />
                            Copy Code
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex-1 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                      <pre className="h-full overflow-auto p-4 font-mono text-sm whitespace-pre-wrap text-gray-800">
                        {previewContent}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={onClose}
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                  >
                    Close
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
