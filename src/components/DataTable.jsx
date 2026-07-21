import React, { useState, useMemo } from "react";
import { SearchBar } from "./SearchBar";
import { Pagination } from "./Pagination";
import { EmptyState } from "./EmptyState";
import { FileSpreadsheet } from "lucide-react";

export function DataTable({
  columns = [],
  data = [],
  searchPlaceholder = "Search entries...",
  searchKeys = [], // array of string keys to filter by
  itemsPerPage = 10,
  extraHeaderActions
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filtered data based on search keys
  const filteredData = useMemo(() => {
    setCurrentPage(1); // Reset page on filter
    if (!searchQuery.trim()) return data;

    const query = searchQuery.toLowerCase().trim();
    return data.filter((item) => {
      return searchKeys.some((key) => {
        const val = item[key];
        if (val === undefined || val === null) return false;
        return String(val).toLowerCase().includes(query);
      });
    });
  }, [data, searchQuery, searchKeys]);

  // Paginated data
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-xs overflow-hidden flex flex-col" id="data-table-root">
      {/* Search and Action Bar */}
      <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white shrink-0">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={searchPlaceholder}
          onClear={() => setSearchQuery("")}
        />
        {extraHeaderActions && (
          <div className="w-full sm:w-auto flex justify-end">
            {extraHeaderActions}
          </div>
        )}
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        {paginatedData.length > 0 ? (
          <table className="w-full min-w-max text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                {columns.map((col, idx) => (
                  <th key={idx} className="px-6 py-3.5">
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-slate-600">
              {paginatedData.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-gray-50/70 transition-colors">
                  {columns.map((col, colIdx) => {
                    const value = row[col.accessor];
                    return (
                      <td key={colIdx} className="px-6 py-3.5 align-middle">
                        {col.render ? col.render(value, row) : value}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-8">
            <EmptyState
              title="No matches found"
              description={`We couldn't find any results matching "${searchQuery}". Try modifying your search term.`}
              icon={FileSpreadsheet}
            />
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      {filteredData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
