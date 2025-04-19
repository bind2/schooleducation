import React from 'react'
import AboutLittleLearners from './sections/about-little-learners'
import MissionAndVisons from './sections/mission-and-visions'
import AwardsAndRecognitions from './sections/awards-and-recognitions'
import OurHistory from './sections/our-history'
import TeamMembers from './sections/team-members'

export default function AboutUs() {
  return (
    <React.Fragment>
      <AboutLittleLearners/>
      <MissionAndVisons/>
      <AwardsAndRecognitions/>
      <OurHistory/>
      <TeamMembers/>
    </React.Fragment>
  )
}
