import React, { useContext, useState, useEffect } from "react";
import { generatePath } from "react-router";
import SideNavBar from './SideNavBar'
import {InputGroup, Form, Button, Container, Card, Alert} from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import fire from './UserAuth/config/fire';
import {db} from './UserAuth/config/fire';
import {collection, updateDoc, setDoc, doc, getDoc, getDocs, onSnapshot, deleteDoc, query, where, docSnap, getDocsFromServer} from 'firebase/firestore';

var myID2 = null;
var teamTrue = true;
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
  const teamMates = [];
  let hasRun = false;
  //const [hasRun, setRun] = useState(false);
  //a.push("E"); this will add element to end of array

  useEffect(() => {
    const fetchData = async() => {
      var e = document.getElementById("container");
      while (e.firstChild) {
        e.removeChild(e.firstChild);
      }
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

        let saveTeam = "";
        if (!querySnapshot.empty) { //if DM
          setDMBool(true);
          querySnapshot.forEach((doc) => { //after this code blocks the code doesn't want to execute anymore, this is only the case if you are a DM
            setCurrentTeamName(doc.data().team);
            saveTeam = doc.data().team;
          })
          let saveID = "";
          const q2 = query(userRef, where("teamName", "==", saveTeam));
          const querySnapshot2 = await getDocsFromServer(q2);
          querySnapshot2.forEach((doc2) => {
            teamMates.push(doc2.data().username);
            myID2 = doc2.data().userID;
            saveID = doc2.data().userID;
            
          })
          if(!hasRun) {
            for (let j = 0; j < teamMates.length; j++) { 
              hasRun = true;
              console.log(teamMates[j]);
              let div = document.createElement('div');
              myID2 = saveID;
              div.id=String(saveID);
              div.className = "searchResultContainer";
              div.innerHTML =  `<span id = '${teamMates[j]}' class = "searchResult" >${teamMates[j]}</span>`;
              e.appendChild(div);
            }
            const searchResults = document.getElementsByClassName('searchResult');

            for (const result of searchResults) {
                result.addEventListener('click', async function clickUser() {
                    const id = result.id
                    const q3 = query(userRef, where("username", "==", id));
                    const querySnapshot3 = await getDocsFromServer(q3);
                    querySnapshot3.forEach((doc3) => {
                      myID2 = doc3.data().userID;
            
                    })
                    navigate(generatePath("/user2/:id/", {id: id,}));
                }
            )}
          }
          
          //setCurrentTeamName(querySnapshot.data().team);
          var e = document.getElementById("myDiv");
          e.innerHTML = "My Team, " + querySnapshot.data().DMEmail;
          

        } else { //if player
          const q2 = query(userRef, where("teamName", "==", docSnap.data().teamName));
          const querySnapshot2 = await getDocsFromServer(q2);
          setCurrentTeamName(docSnap.data().teamName);
          saveTeam = docSnap.data().teamName;
          let saveID = "";
          querySnapshot2.forEach((doc2) => {
              //teamMates[i] = doc2.data().email;
            if(doc2.data().username != docSnap.data().username) { //don't add yourself as teammate
              teamMates.push(doc2.data().username);
              myID2 = doc2.data().userID;
              saveID = doc2.data().userID;
            }
            
          })

          if(!hasRun) {
            for (let j = 0; j < teamMates.length; j++) { 
              hasRun = true;
              console.log(teamMates[j]);
              let div = document.createElement('div');
              myID2 = saveID;
              div.id=String(saveID);
              div.className = "searchResultContainer";
              div.innerHTML =  `<span id = '${teamMates[j]}' class = "searchResult" >${teamMates[j]}</span>`;
              e.appendChild(div);
            }
            const searchResults = document.getElementsByClassName('searchResult');

            for (const result of searchResults) {
                result.addEventListener('click', async function clickUser() {
                    const id = result.id
                    const q3 = query(userRef, where("username", "==", id));
                    const querySnapshot3 = await getDocsFromServer(q3);
                    querySnapshot3.forEach((doc3) => {
                      myID2 = doc3.data().userID;
            
                    })
                    navigate(generatePath("/user2/:id/", {id: id,}));
                }
            )}
          }
          
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
      <Container id = "container">
            {/* <div id="getText" style={{textAlign:"center", display: "none"}}>
                Here
            </div> */}
        </Container>
    </>
  )
}

export var teamTrue;
export var myID2;