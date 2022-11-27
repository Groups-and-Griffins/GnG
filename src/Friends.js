import React from 'react'
import SideNavBar from './SideNavBar'

export default function Friends() {
  return (
    <>
        <header className="custom_navbar">
          <span id="myDiv" style={{ color: "#FFF", fontSize: "25px", paddingLeft: "5rem" }}>
            Friends
          </span>
        </header>
        <SideNavBar/>
        <div>Friends</div>
    </>
  )
}
