"use client";

import SearchBar from "@/components/search-bar";
import Link from "next/link";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function Students() {
  const [deletingId, setDeletingId] = useState(null);
  const tableHeaders = [
    "Index",
    "Student Name",
    "Phone Number",
    "Program of Interest",
    "Action",
  ];

  const searchSuggestions = [
    "Apple",
    "Banana",
    "Orange",
    "Grapes",
    "Watermelon",
    "Pineapple",
    "aa",
  ];

  const handleSearch = (searchTerm) => {
    console.log("Search term:", searchTerm);
  };

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const res = await axios.get("/api/students");
      return res.data;
    },
    retry: 1
  });


  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(`/api/students/${id}`)
      return res.data
    },
    onSuccess: (success) => {
      alert(success.message)
      queryClient.invalidateQueries(["students"]);
    },
    onSettled: () => {
      setDeletingId(null);
    },
    onError: (error) => {
      console.log(error.message)
    },
  });

  const handleDelete = (id) => {
    setDeletingId(id);
    deleteMutation.mutate(id);
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
              {isLoading ? (
                <div className="p-3 text-center text-sm">Loading...</div>
              ) : error ? (
                <div className="p-3 text-center text-red-600">
                  {error.message}
                </div>
              ) : data?.length === 0 ? (
                <div className="p-3 text-center text-sm">
                  No students found.
                </div>
              ) : (
                data?.map((row, rowIndex) => {
                  const isLastRow = rowIndex === data?.length - 1;
                  const baseCellClasses = "border-black px-4 py-3 text-sm";
                  const borderBottomClass = isLastRow ? "" : "border-b-2";

                  return (
                    <div
                      key={rowIndex}
                      className="bg-orange-99 hover:bg-orange-95"
                    >
                      <div className="flex">
                        <Link
                          href={`/admin/students/${row?.id}`}
                          className="flex w-full"
                        >
                          <div
                            className={`w-18 ${baseCellClasses} border-r-2 ${borderBottomClass}`}
                          >
                            {rowIndex + 1}
                          </div>
                          <div
                            className={`w-4/12 ${baseCellClasses} border-r-2 ${borderBottomClass}`}
                          >
                            {row.studentName}
                          </div>
                          <div
                            className={`w-4/12 ${baseCellClasses} border-r-2 ${borderBottomClass}`}
                          >
                            {row.phoneNumber}
                          </div>
                          <div
                            className={`w-4/12 ${baseCellClasses} border-r-2 ${borderBottomClass}`}
                          >
                            {row.programOfInterest}
                          </div>
                        </Link>

                        <div
                          className={`w-4/12 ${baseCellClasses} ${borderBottomClass}`}
                        >
                          {deletingId === row.id ? (
                            <span className="text-gray-500 italic">
                              Deleting...
                            </span>
                          ) : (
                            <button
                              onClick={() => handleDelete(row.id)}
                              className="cursor-pointer text-red-600 hover:underline"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
