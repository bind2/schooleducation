import React from "react";

export default function Students() {
  const tableHeaders = ["Student Name", "Phone Number", "Program of Interest"];

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
  ];
  return (
    <div>
      {/* table */}
      <div>
        <div className="bg-absolute-white w-full overflow-x-auto rounded-lg border-2 p-6 [box-shadow:4px_4px_0px_1px_var(--absolute-black)]">
          <div className="min-w-[800px] overflow-hidden">
            {/* Header Row */}
            <div className="bg-orange-95 flex rounded-lg border-2">
              {tableHeaders.map((header, idx) => (
                <span
                  key={header}
                  className={`w-full border-black px-4 py-3 text-sm font-semibold ${
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

                return (
                  <div key={rowIndex} className="bg-orange-99 flex">
                    <span
                      className={`w-full border-r-2 ${
                        !isLastRow ? "border-b-2" : ""
                      } border-black px-4 py-3 text-sm`}
                    >
                      {row.studentName}
                    </span>
                    <span
                      className={`w-full border-r-2 ${
                        !isLastRow ? "border-b-2" : ""
                      } border-black px-4 py-3 text-sm`}
                    >
                      {row.phoneNumber}
                    </span>
                    <span
                      className={`w-full border-r-2 ${
                        !isLastRow ? "border-b-2" : ""
                      } border-black px-4 py-3 text-sm`}
                    >
                      {row.programOfInterest}
                    </span>
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
