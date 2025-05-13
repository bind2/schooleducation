"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";

export default function StudentInfo({ params }) {
  const { id } = use(params);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["student", id],
    queryFn: async () => {
      const res = await fetch(`/api/students/${id}`);
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
    enabled: !!id, // Prevent fetch if id is undefined
  });
  return (
    <div>
      <button className="bg-orange-90 hover:bg-orange-80 rounded-md border-1 transition-colors duration-300">
        <Link href={`/admin/students`} className="flex items-center gap-1 p-2">
          <ArrowLeft size={18} /> Back
        </Link>
      </button>
      {isLoading ? (
        <div className="p-4">loading...</div>
      ) : (
        <div className="bg-absolute-white mt-6 border-1 p-4">
          <div>ID: {id}</div>
          <div>Name: {data?.studentName}</div>
          <div>Phone Number: {data?.phoneNumber}</div>
          <div>Program of Interest: {data?.programOfInterest}</div>
        </div>
      )}
    </div>
  );
}
