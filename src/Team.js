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
<<<<<<< Updated upstream
  const [showElement, setShowElement] = useState(false)

=======
  const [playerEmail, setCurrentEmail] = useState("");
  const [showElement, setShowElement] = useState(false);
  const [teamName, setCurrentTeamName] = useState("");
  const [teamDesc, setCurrentTeamDesc] = useState("");
>>>>>>> Stashed changes
  useEffect(() => {
    const fetchData = async() => {
      try {
        const docRef = doc(db, "users", fire.auth().currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCurrentPlayerRole(docSnap.data().playerRole);
        } else {
          console.error("can't find user");
        }
      } catch(err) {
        console.error(err);
      }
      setShowElement(true);
    } 
    fetchData();
<<<<<<< Updated upstream
  }, []);
  
  console.log(playerRole);
  
=======
 
  const fetchData2 = async() => {
    try {
      const usersRef = collection(db, "teams");
      const q = query(usersRef, where("DMEmail", "==", playerEmail));
      const querySnapshot2 = await getDocs(q);
      querySnapshot2.forEach((doc) => {
        console.log(doc.data().DMEmail);
      })
      if(querySnapshot2.exists()){
        setCurrentTeamName(querySnapshot2.data().team);
        setCurrentTeamDesc(querySnapshot2.data().description);
        document.getElementById("teamName").innerHTML = "THIS WORKS";
        document.getElementById("teamDescript").innerHTML = teamDesc;
        document.write(teamName+teamDesc);
      }
    } catch(err) {
      console.error(err);
    }
  }
  fetchData2();

  const fetchData3 = async() => {
    try {
      const docRef = doc(db, "teams", fire.auth().currentUser.uid);
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
  fetchData3();
}, []);
   //console.log(teamName);



>>>>>>> Stashed changes
  if (playerRole == "Player") {
    document.querySelector('#teamButton').innerText = 'Join a team';
  }
  //If the user is a DM and if their Email is already connected to a team they should see that teams info
  else if (playerRole == "DM") {
    if(teamName != ""){
      document.querySelector('#teamButton').innerText = 'Create a team';
    }else if(teamName == ""){
      document.querySelector('#teamButton').innerText = 'Test';
    }
  }


  async function handleSubmit(e) {
    if (playerRole == "Player")
      navigate('/joinTeam');
    else if (playerRole == "DM")
      navigate('/createTeam');
}
  
<<<<<<< Updated upstream
  return (
    <>
        <SideNavBar />
        <header className="custom_navbar">
        <span id="myDiv" style={{ color: "#FFF", fontSize: "20px", paddingLeft: "5rem" }}>
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
=======
  if(playerRole == "DM" && teamName != ""){
    //no button if the DM already has a team created
    return (
      <>
          <SideNavBar />
          <header className="custom_navbar">
          <span id="myDiv" style={{ color: "#FFF", fontSize: "25px", paddingLeft: "5rem" }}>
            My Team Exists
          </span>
        </header>
        <Container className="d-flex align-items-center justify-content-center" >
        <body>
        Hello
        </body>
        </Container>
        <div>
        <h1> <span id="teamName">Team Name</span> </h1>
          <p> <span id="teamDescript">Team Descript</span> </p>
        </div>
        
      </>
    )
  }else{
    return (
      <>
          <SideNavBar />
          <header className="custom_navbar">
          <span id="myDiv" style={{ color: "#FFF", fontSize: "25px", paddingLeft: "5rem" }}>
            My Team Create
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
>>>>>>> Stashed changes
}
