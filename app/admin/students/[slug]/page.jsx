'use client'

import { useSearchParams } from 'next/navigation';
import React from 'react'

export default function StudentInfo() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  return (
    <div>StudentInfo
       {searchQuery ? (
        <p className="mb-2">
          Search Query: <strong>{searchQuery}</strong>
        </p>
      ) : (
        <p className="mb-2 text-gray-500">No search term provided.</p>
      )}
    </div>
  )
}
