import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./UserAuth/AuthContext";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {FaSearch, FaHome, FaUser} from 'react-icons/fa';
import {MdLogout, MdOutlineGroup} from 'react-icons/md';

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
<SideNav style={{ background: "#000" }}
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
                          <FaHome />
                      </NavIcon>
                      <NavText>
                          Home
                      </NavText>
                  </NavItem>
                  <NavItem eventKey="search">
                      <NavIcon>
                          <FaSearch />
                      </NavIcon>
                      <NavText>
                          Search
                      </NavText>
                  </NavItem>
                  <NavItem eventKey="team">
                      <NavIcon>
                          <MdOutlineGroup />
                      </NavIcon>
                      <NavText>
                          Team
                      </NavText>
                  </NavItem>
                  <NavItem eventKey="profile">
                      <NavIcon>
                          <FaUser />
                      </NavIcon>
                      <NavText>
                          Profile
                      </NavText>
                  </NavItem>
                  <NavItem eventKey="logout">
                      <NavIcon>
                          <MdLogout />
                      </NavIcon>
                      <NavText>
                          Logout
                      </NavText>
                  </NavItem>
              </SideNav.Nav>
          </SideNav>
    
  )
}
