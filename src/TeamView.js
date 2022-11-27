import React, { useContext, useState, useEffect } from "react";
import SideNavBar from './SideNavBar'
import {InputGroup, Form, Button, Container, Card, Alert} from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import fire from './UserAuth/config/fire';
import {db} from './UserAuth/config/fire';
import {collection, updateDoc, setDoc, doc, getDoc, getDocs, onSnapshot, deleteDoc, query, where, docSnap, getDocsFromServer} from 'firebase/firestore';

export default function TeamView() {
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const [playerRole, setCurrentPlayerRole] = useState("");
  const [playerEmail, setCurrentEmail] = useState("");
  const [teamName, setCurrentTeamName] = useState("");
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
          setCurrentTeamName(querySnapshot.data().team);
          var e = document.getElementById("myDiv");
          e.innerHTML = "My Team, " + querySnapshot.data().email;
          document.querySelector('#practice').innerText = querySnapshot.data().email;
        } 
      } catch(err) {
        console.error(err);
      }
      setShowElement(true);
    } 
    fetchData();
}, []);

//document.querySelector('#practice').innerText = playerRole;

  async function handleSubmit(e) {
    if (playerRole == "Player")
      navigate('/joinTeam');
}
// var e = document.getElementsByClassName("text-center mb-4");
// e.innerHTML = "Welcome, " + teamName;

  return (
    <>
        <SideNavBar />
        <header className="custom_navbar">
        <span id="myDiv" style={{ color: "#FFF", fontSize: "25px", paddingLeft: "5rem" }}>
          My Team
        </span>
      </header>
      <Container className="d-flex align-items-center justify-content-center" >
      <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">$teamName</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <strong>Email:</strong> {playerEmail}
            </Card.Body>
          </Card>

        </div>
      </Container>
    </>
  )
}