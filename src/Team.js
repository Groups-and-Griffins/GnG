import React from 'react'
import SideNavBar from './SideNavBar'

export default function Team() {
  return (
    <>
        <SideNavBar />
        <header className="custom_navbar">
        <span id="myDiv" style={{ color: "#FFF", fontSize: "20px", paddingLeft: "5rem" }}>
          My Team
        </span>
      </header>
        <div>Team</div>
    </>
  )
}
