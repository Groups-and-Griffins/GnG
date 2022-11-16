import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./UserAuth/AuthContext";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {FaSearch, FaHome, FaUser, FaUserFriends} from 'react-icons/fa';
import {MdLogout, MdOutlineGroup} from 'react-icons/md';
import {GiSpikedDragonHead} from 'react-icons/gi';

export default function SideNavBar() {
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();
    const [error, setError] = useState("");
    let toggled = false;
    async function handleLogout() {
        setError("")
        try {
          await logout()
          navigate("/home")
        } catch {
          setError("Failed to log out")
        }
      }
  return (
<SideNav style={{ background: "#000", }}
          onSelect={(selected) => {
              switch (selected) {
                  case "home":
                      navigate("/calendar");
                      break;
                  case "search":
                      navigate("/search");
                      break;
                case "team":
                    navigate("/team");
                    break;
                case "friends":
                    navigate("/friends");
                    break;
                case "profile":
                    navigate("/dashboard");
                    break;
                case "logout":
                    handleLogout();
                    break;
              }
          } }
          onToggle={() => {
            toggled = !toggled;
            if (document.getElementById('myDiv') !== null) {
                if(toggled)
                    document.getElementById('myDiv').style.paddingLeft = "16rem";
                else
                    document.getElementById('myDiv').style.paddingLeft = "5rem";
            }
          }}
      >
              <SideNav.Toggle />
              <SideNav.Nav>
                  <NavItem eventKey="home">
                      <NavIcon>
                          <FaHome size={25}/>
                      </NavIcon>
                      <NavText style = {{fontSize: "20px"}}>
                          Home
                      </NavText>
                  </NavItem>
                  <NavItem eventKey="search" >
                      <NavIcon>
                          <FaSearch size={25}/>
                      </NavIcon>
                      <NavText style = {{fontSize: "20px"}}>
                          Search
                      </NavText>
                  </NavItem>
                  <NavItem eventKey="team">
                      <NavIcon>
                          <GiSpikedDragonHead size={25}/>
                      </NavIcon>
                      <NavText style = {{fontSize: "20px"}}>
                            My Team
                      </NavText>
                  </NavItem>
                  <NavItem eventKey="friends">
                      <NavIcon>
                          <FaUserFriends size={25}/>
                      </NavIcon>
                      <NavText style = {{fontSize: "20px"}}>
                            Friends
                      </NavText>
                  </NavItem>
                  <NavItem eventKey="profile">
                      <NavIcon>
                          <FaUser size={25}/>
                      </NavIcon>
                      <NavText style = {{fontSize: "20px"}}>
                            Profile
                      </NavText>
                  </NavItem>
                  <NavItem eventKey="logout">
                      <NavIcon>
                          <MdLogout size={25}/>
                      </NavIcon>
                      <NavText style = {{fontSize: "20px"}}>
                          Logout
                      </NavText>
                  </NavItem>
              </SideNav.Nav>
          </SideNav>
    
  )
}
