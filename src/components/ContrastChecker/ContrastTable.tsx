// src/components/ContrastChecker/ContrastTable.jsx

import PropTypes from "prop-types";
import { contrast } from "chroma-js";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  createColumnHelper,
  flexRender,
} from "@tanstack/react-table";

/**
 * Component to render the contrast table.
 *
 * @param {Array} props.data - The data to display in the table.
 * @returns {JSX.Element} The rendered component.
 */
const ContrastTable = ({ data }) => {
  const columnHelper = createColumnHelper();

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
    <div className="overflow-x-auto max-h-[70vh]">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-100 text-center">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="py-2 px-4 border-b cursor-pointer select-none"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  {{
                    asc: " 🔼",
                    desc: " 🔽",
                  }[header.column.getIsSorted()] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr key={row.id} className={index % 2 === 0 ? "bg-gray-50" : ""}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="py-2 px-4 border-b text-center">
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

ContrastTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ContrastTable;
