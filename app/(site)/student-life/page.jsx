import React from "react";
import StudentLifeAndEnrichment from "./sections/student-life-and-enrichment";
import ExtracurricularActivities from "./sections/extracurricular-activities";
import EventsAndCelebrations from "./sections/events-and-celebrations";
import StudentSupport from "./sections/student-support";

export default function StudentLife() {
  return (
    <React.Fragment>
      <StudentLifeAndEnrichment />
      <ExtracurricularActivities />
      <EventsAndCelebrations />
      <StudentSupport />
    </React.Fragment>
  );
}
