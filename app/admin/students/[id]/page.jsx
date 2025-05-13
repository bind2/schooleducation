"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { getStudentById } from "@/api/student";

export default function StudentInfo({ params }) {
  const { id } = use(params);

  const { data, isLoading } = useQuery({
    queryKey: ["student", id],
    queryFn: () => getStudentById(id),
    enabled: !!id,
  });

  return (
    <div className="mx-auto max-w-2xl px-4 py-4">
      <Link href="/admin/students">
        <button className="bg-orange-90 hover:bg-orange-80 mb-4 flex items-center gap-2 rounded-md border border-black px-3 py-2 text-sm font-medium text-black transition-colors">
          <ArrowLeft size={18} /> Back
        </button>
      </Link>

      {isLoading ? (
        <div className="text-center text-sm text-gray-600">Loading...</div>
      ) : (
        <div className="rounded-lg border border-black bg-white p-6 shadow-md">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Student Information
          </h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 text-sm sm:grid-cols-2">
            <InfoRow label="ID" value={data?.id} />
            <InfoRow label="Parent Name" value={data?.parentName} />
            <InfoRow label="Student Name" value={data?.studentName} />
            <InfoRow label="Student Age" value={data?.studentAge} />
            <InfoRow label="Phone Number" value={data?.phoneNumber} />
            <InfoRow
              label="Program of Interest"
              value={data?.programOfInterest}
            />
            <div className="sm:col-span-2">
              <p className="font-medium text-gray-500">Message:</p>
              <p className="mt-1 text-gray-800">{data?.message || "—"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable row component
function InfoRow({ label, value }) {
  return (
    <div>
      <p className="font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-gray-800">{value || "—"}</p>
    </div>
  );
}
