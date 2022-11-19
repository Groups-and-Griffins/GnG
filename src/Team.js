import React, { useContext, useState, useEffect } from "react";
import SideNavBar from './SideNavBar'
import {InputGroup, Form, Button, Container} from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import fire from './UserAuth/config/fire';
import {db} from './UserAuth/config/fire';
import {collection, updateDoc, setDoc, doc, getDoc, getDocs, onSnapshot, deleteDoc, query, where, docSnap} from 'firebase/firestore';

export default function Team() {
  let navigate = useNavigate();
  const [playerRole, setCurrentPlayerRole] = useState("");
  const [playerEmail, setCurrentEmail] = useState("");
  const [showElement, setShowElement] = useState(false)
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
      const q = query(usersRef, where("DMEmail", "==", "patel.vraj1781@gmail.com"));
      const querySnapshot2 = await getDocs(q);
      querySnapshot2.forEach((doc) => {
        console.log(doc.data().DMEmail);
      })
    } catch(err) {
      console.error(err);
    }
  }
  fetchData2();
}, []);
  // console.log(playerRole);
  if(playerEmail == "DM"){
    document.querySelector('#teamButton').innerText = 'Test';
  }


  if (playerRole == "Player") {
    document.querySelector('#teamButton').innerText = 'Join a team';
  }
  else if (playerRole == "DM") {
    document.querySelector('#teamButton').innerText = 'Create a team';
  }

  async function handleSubmit(e) {
    if (playerRole == "Player")
      navigate('/joinTeam');
    else if (playerRole == "DM")
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
