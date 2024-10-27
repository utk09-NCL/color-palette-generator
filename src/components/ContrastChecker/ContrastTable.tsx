// src/components/ContrastChecker/ContrastTable.tsx

import { type ReactNode } from "react";
import { contrast } from "chroma-js";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  createColumnHelper,
  flexRender,
} from "@tanstack/react-table";

/**
 * Type for each data entry in the contrast table.
 */
export type ContrastTableData = {
  bgLabel: string;
  fgLabel: string;
  bgShade: string;
  fgShade: string;
  contrastRatio: number;
  aa: "Pass" | "Fail";
  aaa: "Pass" | "Fail";
};

/**
 * Props for the ContrastTable component.
 */
export type ContrastTableProps = {
  data: ContrastTableData[];
};

/**
 * Component to render the contrast table.
 *
 * @param {ContrastTableProps} props - The data to display in the table.
 * @returns {ReactNode} The rendered component.
 */
const ContrastTable = ({ data }: ContrastTableProps): ReactNode => {
  const columnHelper = createColumnHelper<ContrastTableData>();

  // Define columns for the table
  const columns = [
    columnHelper.accessor("bgLabel", {
      header: "Background",
      cell: (info) => {
        const { bgShade } = info.row.original;
        return (
          <div
            className="text-center"
            style={{
              backgroundColor: bgShade,
              color: contrast(bgShade, "white") > 4.5 ? "white" : "black",
            }}
          >
            {info.getValue()}
          </div>
        );
      },
    }),
    columnHelper.accessor("fgLabel", {
      header: "Foreground",
      cell: (info) => {
        const { fgShade } = info.row.original;
        return (
          <div
            className="text-center"
            style={{
              backgroundColor: fgShade,
              color: contrast(fgShade, "white") > 4.5 ? "white" : "black",
            }}
          >
            {info.getValue()}
          </div>
        );
      },
    }),
    columnHelper.accessor("contrastRatio", {
      header: "Contrast Ratio",
      cell: (info) => `${info.getValue()}:1`,
    }),
    columnHelper.accessor("aa", {
      header: "AA",
      cell: (info) => {
        const value = info.getValue();
        return (
          <span
            className={`font-semibold ${
              value === "Pass" ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {value}
          </span>
        );
      },
    }),
    columnHelper.accessor("aaa", {
      header: "AAA",
      cell: (info) => {
        const value = info.getValue();
        return (
          <span
            className={`font-semibold ${
              value === "Pass" ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {value}
          </span>
        );
      },
    }),
  ];

  // Initialize the table using React Table
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSorting: true,
  });

  return (
    <div className="max-h-[70vh] overflow-x-auto">
      <table className="min-w-full border border-gray-300 bg-white">
        <thead className="bg-gray-100 text-center">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="cursor-pointer select-none border-b px-4 py-2"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  {header.column.getIsSorted() === "asc"
                    ? " 🔼"
                    : header.column.getIsSorted() === "desc"
                      ? " 🔽"
                      : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr key={row.id} className={index % 2 === 0 ? "bg-gray-50" : ""}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border-b px-4 py-2 text-center">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContrastTable;
