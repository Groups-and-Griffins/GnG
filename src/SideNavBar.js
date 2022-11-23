import React, { Component, useState, useRef, useEffect, useContext} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./UserAuth/AuthContext";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {FaSearch, FaHome, FaUser} from 'react-icons/fa';
import {MdLogout, MdOutlineGroup} from 'react-icons/md';
import fire from './UserAuth/config/fire';
import {db} from './UserAuth/config/fire';
import { Card, Button, Form, Alert, Container } from "react-bootstrap"
import {collection, updateDoc, setDoc, doc, getDoc, getDocs, onSnapshot, deleteDoc, query, where, docSnap} from 'firebase/firestore';


export default function SideNavBar() {
    
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

      //CHECK IF USER IS DM AND IF THEY HAVE A TEAM
      let navigate = useNavigate();
  const [playerRole, setCurrentPlayerRole] = useState("");
  const [playerEmail, setCurrentEmail] = useState("");
  const [showElement, setShowElement] = useState(false)
  const [isTeamDM, setDMStatus] = useState(false);
  useEffect(() => {
    const fetchData = async() => {
      try {
        const docRef = doc(db, "users", fire.auth().currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCurrentPlayerRole(docSnap.data().playerRole);
          setCurrentEmail(docSnap.data().email);
        } else {
          console.error("can't find user");
        }
      } catch(err) {
        console.error(err);
      }
      setShowElement(true);
    } 
    fetchData();
 
  const fetchData2 = async() => {
    try {
      const usersRef = collection(db, "teams");
      const q = query(usersRef, where("DMEmail", "==", playerEmail));
      const querySnapshot2 = await getDocs(q);
      querySnapshot2.forEach((doc) => {
        console.log(doc.data().DMEmail);
        if (playerEmail == doc.data().DMEmail) {
            //makes boolean true if user is DM of a team
            setDMStatus(true);
          }
      })
       
    } catch(err) {
      console.error(err);
    }
  }
  fetchData2();
}, []);

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
                    if(isTeamDM){
                        navigate("/teamView");
                    }else{
                        navigate("/team");
                    }
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
