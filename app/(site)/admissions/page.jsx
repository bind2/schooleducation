import React from "react";
import EnrollmentProcess from "./sections/enrollment-process";
import AdmissionProcess from "./sections/admission-process";
import FreeStructure from "./sections/free-structure";

export default function Admissions() {
  return (
    <React.Fragment>
      <EnrollmentProcess />
      <AdmissionProcess />
      <FreeStructure />
    </React.Fragment>
  );
}
