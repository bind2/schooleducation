'use client'

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React, { use } from 'react'

export default function StudentInfo({params}) {
const {slug} = use(params)
  return (
    <div>
      <button className='border-1 rounded-md bg-orange-90 hover:bg-orange-80 transition-colors duration-300'>
        <Link href={`/admin/students`} className='flex items-center gap-1 p-2'><ArrowLeft size={18}/> Back</Link>
      </button>
      <div className='mt-6 border-1 p-4 bg-absolute-white'>
        <div>Name: Deepak Bind</div>
        <div>Phone Number: 7722072980</div>
        <div>Program of Interest: Option 1</div>
      </div>
       
    </div>
  )
}
