import React, { useContext, useState, useEffect } from "react";
import SideNavBar from './SideNavBar'
import {InputGroup, Form, Button, Container} from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import fire from './UserAuth/config/fire';
import {db} from './UserAuth/config/fire';
import {collection, updateDoc, setDoc, doc, getDoc, getDocs, onSnapshot, deleteDoc, query, where, docSnap} from 'firebase/firestore';

export default function TeamView() {
  let navigate = useNavigate();
  const [playerRole, setCurrentPlayerRole] = useState("");
  const [playerEmail, setCurrentEmail] = useState("");
  const [showElement, setShowElement] = useState(false);
  const isTeamDM = new Boolean(false);
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
              isTeamDM = new Boolean(true);
              var e = document.getElementById("myDiv");
              e.innerHTML = "My Team, " + doc.data().team;
            }
        })
         
      } catch(err) {
        console.error(err);
      }
    }
  fetchData2();
}, []);
  // console.log(playerRole);

  return (
    <>
        <SideNavBar />
        <header className="custom_navbar">
        <span id="myDiv" style={{ color: "#FFF", fontSize: "25px", paddingLeft: "5rem" }}>
          My Team
        </span>
      </header>
      <Container className="d-flex align-items-center justify-content-center" >
 
      </Container>
    </>
  )
}