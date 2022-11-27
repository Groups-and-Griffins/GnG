import React, { useContext, useState, useEffect } from "react";
import SideNavBar from './SideNavBar'
import {InputGroup, Form, Button, Container, Card, Alert} from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import fire from './UserAuth/config/fire';
import {db} from './UserAuth/config/fire';
import {collection, updateDoc, setDoc, doc, getDoc, getDocs, onSnapshot, deleteDoc, query, where, docSnap, getDocsFromServer} from 'firebase/firestore';

export default function TeamView() {
  //whoever in user collection has same taem name
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const [playerRole, setCurrentPlayerRole] = useState("");
  const [playerEmail, setCurrentEmail] = useState("");
  const [teamName, setCurrentTeamName] = useState("");
  //const [userName, setCurrentUserName] = useState(""); //
  const [showElement, setShowElement] = useState(false);
  const [userName, setUsername] = useState("");
  const [isDM, setDMBool] = useState(false);
  const a = [];
  //a.push("E"); this will add element to end of array

  useEffect(() => {
    const fetchData = async() => {
      try {
        const docRef = doc(db, "users", fire.auth().currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCurrentPlayerRole(docSnap.data().playerRole);
          setCurrentEmail(docSnap.data().email);
          setUsername(docSnap.data().username);
        } else {
          console.error("can't find user");
        }

        const teamRef = collection(db, "teams");
        const userRef = collection(db, "users");
        const q = query(teamRef, where("DMEmail", "==", docSnap.data().email));
        const querySnapshot = await getDocsFromServer(q);

        const teamMates = [];
        
        if (!querySnapshot.empty) { //if DM
          setDMBool(true);
          querySnapshot.forEach((doc) => {
            setCurrentTeamName(doc.data().team);
          });
          //setCurrentTeamName(querySnapshot.data().team);
          var e = document.getElementById("myDiv");
          e.innerHTML = "My Team, " + querySnapshot.data().DMEmail;
          
          const q2 = query(userRef, where("teamName", "==", teamName));
          const querySnapshot2 = await getDocsFromServer(q2);
          const i = 0;
          if(querySnapshot2.empty) {
            console.error("No query results");
          }
          else {
            console.error("There are results");
          }
          querySnapshot2.forEach((doc2) => {
            teamMates[i] = doc2.data().username;
            
          })

        } else { //if player
          const q2 = query(userRef, where("teamName", "==", docSnap.data().teamName));
          const querySnapshot2 = await getDocsFromServer(q2);
          const i = 0;
          querySnapshot2.forEach((doc2) => {
              //teamMates[i] = doc2.data().email;
            if(doc2.data().username != docSnap.data().username) { //don't add yourself as teammate
              teamMates.push(doc2.data().username);
            }
            
          })
          
        }

        //printing team mates
        console.log("Teammates length is " + teamMates.length);
        for (let j = 0; j < teamMates.length; j++) { 
          console.log(teamMates[j]);
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
          <Card style = {{marginTop: "5rem"}}>
            <Card.Body>
              <h2 className="text-center mb-4">
                <strong> Welcome:</strong> {teamName}

              </h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <strong>Email:</strong> {playerEmail}
            </Card.Body>
          </Card>

        </div>
      </Container>
    </>
  )
}