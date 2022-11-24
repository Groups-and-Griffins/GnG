import React, { useContext, useState, useEffect } from "react";
import SideNavBar from './SideNavBar'
import {InputGroup, Form, Button, Container} from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import fire from './UserAuth/config/fire';
import {db} from './UserAuth/config/fire';
import {collection, updateDoc, setDoc, doc, getDoc, getDocs, onSnapshot, deleteDoc, query, where, docSnap, getDocsFromServer} from 'firebase/firestore';

export default function Team() {
  let navigate = useNavigate();
  const [playerRole, setCurrentPlayerRole] = useState("");
  const [playerEmail, setCurrentEmail] = useState("");
  const [showElement, setShowElement] = useState(false);
  const [isDM, setDMBool] = useState(false);

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

        const teamRef = collection(db, "teams");
        const q = query(teamRef, where("DMEmail", "==", docSnap.data().email));
        const querySnapshot = await getDocsFromServer(q);
        if (!querySnapshot.empty) {
          setDMBool(true);
        } 
      } catch(err) {
        console.error(err);
      }
      setShowElement(true);
    } 
    fetchData();
}, []);

  if(playerEmail == "DM"){
    document.querySelector('#teamButton').innerText = 'Test';
  }


  if (playerRole == "Player") {
    document.querySelector('#teamButton').innerText = 'Join a team';
  }
  else if (playerRole == "DM" && isDM) {
    document.querySelector('#teamButton').innerText = 'See the Team';
  }
  else if (playerRole == "DM" && !isDM) {
    document.querySelector('#teamButton').innerText = 'Create a team';
  }

  async function handleSubmit(e) {
    if (playerRole == "Player")
      navigate('/joinTeam');
    else if (playerRole == "DM" && isDM)
      navigate('/teamView');
      else if (playerRole == "DM" && !isDM)
      navigate('/createTeam');
}
  
  return (
    <>
        <SideNavBar />
        <header className="custom_navbar">
        <span id="myDiv" style={{ color: "#FFF", fontSize: "25px", paddingLeft: "5rem" }}>
          My Team
        </span>
      </header>
      <Container className="d-flex align-items-center justify-content-center" >
        {showElement ? (<Button id = "teamButton" onClick = {handleSubmit} style= {{marginTop: "20rem"}}>
        </Button> ): (<Button id = "teamButton" onClick = {handleSubmit} style= {{marginTop: "20rem", display: "none"}}>
        </Button> )}
      </Container>
    </>
  )
}