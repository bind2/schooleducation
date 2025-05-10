"use client";

import SearchBar from "@/components/search-bar";
import Link from "next/link";
import React from "react";

export default function Students() {
  const tableHeaders = [
    "Index",
    "Student Name",
    "Phone Number",
    "Program of Interest",
  ];

  const tableData = [
    {
      studentName: "Deepak Bind",
      phoneNumber: "7722072980",
      programOfInterest: "option 1",
    },
    {
      studentName: "Nursery",
      phoneNumber: "2 - 3 Years",
      programOfInterest: "$1,686",
    },
    {
      studentName: "Nursery",
      phoneNumber: "2 - 3 Years",
      programOfInterest: "$1,686",
    },
    {
      studentName: "Nursery",
      phoneNumber: "2 - 3 Years",
      programOfInterest: "$1,686",
    },
    {
      studentName: "Nursery",
      phoneNumber: "2 - 3 Years",
      programOfInterest: "$1,686",
    },
  ];

  const searchSuggestions = [
    "Apple",
    "Banana",
    "Orange",
    "Grapes",
    "Watermelon",
    "Pineapple",
    "aa"
  ];

  const handleSearch = (searchTerm) => {
    console.log("Search term:", searchTerm);
  };

  return (
    <div>
      {/* table */}
      <div>
        <div className="bg-absolute-white w-full overflow-x-auto rounded-lg border-2 p-6 [box-shadow:4px_4px_0px_1px_var(--absolute-black)]">
          <div className="min-w-[800px] overflow-hidden">
            <SearchBar
              onSearch={handleSearch}
              suggestions={searchSuggestions}
              baseUrl="/admin/students"
            />
            {/* Header Row */}
            <div className="bg-orange-95 flex rounded-lg border-2">
              {tableHeaders.map((header, idx) => (
                <span
                  key={header}
                  className={`${
                    idx === 0 ? "w-50" : "w-full"
                  } border-black px-4 py-3 text-sm font-semibold ${
                    idx !== tableHeaders.length - 1 ? "border-r-2" : ""
                  }`}
                >
                  {header}
                </span>
              ))}
            </div>

            <div className="mt-5 overflow-hidden rounded-lg border-2">
              {tableData.map((row, rowIndex) => {
                const isLastRow = rowIndex === tableData.length - 1;
                const baseCellClasses = "border-black px-4 py-3 text-sm";
                const borderBottomClass = isLastRow ? "" : "border-b-2";

                const cells = [
                  (rowIndex + 1).toString(),
                  row.studentName,
                  row.phoneNumber,
                  row.programOfInterest,
                ];

                return (
                  <div
                    key={rowIndex}
                    className="bg-orange-99 hover:bg-orange-95"
                  >
                    <Link href={`/admin/students/${rowIndex}`} className="flex">
                      {cells.map((cellData, cellIndex) => (
                        <span
                          key={cellIndex}
                          className={`${
                            cellIndex === 0 ? "w-50" : "w-full"
                          } ${baseCellClasses} ${cellIndex !== cells.length - 1 ? "border-r-2" : ""} ${borderBottomClass} items-center justify-center`}
                        >
                          {cellData}
                        </span>
                      ))}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
