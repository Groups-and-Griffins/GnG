import React from 'react';
import { Link, useNavigate } from "react-router-dom"
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {FaSearch, FaHome} from 'react-icons/fa';

export default function SideNavBar() {
    const navigate = useNavigate();
  return (
<SideNav style={{ background: "#000" }}
    onSelect={(selected) => {
        switch(selected) {
            case "home":
                navigate("/dashboard");
                break;
            case "search":
                navigate("/search")
                break;
        }        
    }}
>
    <SideNav.Toggle />
    <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="home">
            <NavIcon>
            <FaHome/>
            </NavIcon>
            <NavText>
                Home
            </NavText>
        </NavItem>
        <NavItem eventKey="search">
            <NavIcon>
            <FaSearch/>
            </NavIcon>
            <NavText>
                Search
            </NavText>
        </NavItem>
    </SideNav.Nav>
</SideNav>
    
  )
}
