import React from 'react'
import OurAcademicApproach from './sections/our-academic-approach'
import OurSpecialFeatures from './sections/our-special-features'
import OurRoomsGallery from './sections/our-rooms-gallery'
import WhatStudentLearn from './sections/what-student-learn'

export default function Academics() {
  return (
    <React.Fragment>
      <OurAcademicApproach/>
      <OurSpecialFeatures/>
      <WhatStudentLearn/>
      <OurRoomsGallery/>
    </React.Fragment>
  )
}
