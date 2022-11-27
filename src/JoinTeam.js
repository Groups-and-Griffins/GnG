import React, { Component, useState, useRef} from "react";
import { collection, query, where, getDoc, getDocs, doc, setDoc, updateDoc } from "firebase/firestore";
import {db} from './UserAuth/config/fire';
import { Link, useNavigate } from "react-router-dom";
import { generatePath } from "react-router";
import SideNavBar from './SideNavBar';
import {InputGroup, Form, Button, Container} from 'react-bootstrap';
import { withRouter } from "./withRouter";
import User from "./User";
import fire from './UserAuth/config/fire';

var myID;
export default function JoinTeam() {
    let navigate = useNavigate();
    const searchRef = useRef();
    const [teamName, setTeamName] = useState("");
    const handleKeypress = (e) => {  //it triggers by pressing the enter key
      if (e.which === 13) {
        handleSubmit();
      }
    };
    async function handleSubmit(e) {
        var e = document.getElementById("container");
        //const docRef = doc(db, "teams", teamName); //fill in team
        //const docRef = collection(db, "users");
        while (e.firstChild) {
            e.removeChild(e.firstChild);
        }

        const usersRef = collection(db, "teams");
        const q = query(usersRef, where("team", "==", searchRef.current.value));
        const querySnapshot = await getDocs(q);
        var id = fire.auth().currentUser.uid;
        const docRef = doc(db, 'users', id);
        querySnapshot.forEach((doc) => {
            if (doc.data().userID !== fire.auth().currentUser.uid) {
            let div = document.createElement('div');
            myID = doc.data().userID;
            div.id=String(doc.data().userID);
            div.className = "searchResultContainer";
            div.innerHTML =  `<span id = '${doc.data().team}' class = "searchResult" >${doc.data().team}</span>`;
            e.appendChild(div);
            setTeamName(doc.data().team);
            const data = {
                teamName: doc.data().team
            };
            updateDoc(docRef, data)
            .then(() => {
                console.log("Document has been added successfully");
            });
            }
            else {
                let div = document.createElement('div');
                div.id="search";
                div.className = "noSearchResultContainer";
                div.innerHTML =  `<span class = "noSearchResult" >No team found under that name</span>`;
                e.appendChild(div);
            }
        });

        if(querySnapshot.empty) {
            let div = document.createElement('div');
            div.id="search";
            div.className = "noSearchResultContainer";
            div.innerHTML =  `<span class = "noSearchResult" >No team found under that name</span>`;
            e.appendChild(div);
        }

        const searchResults = document.getElementsByClassName('searchResult');

        for (const result of searchResults) {
            result.addEventListener('click', function clickUser() {
                const id = result.id
                // const docRef = collection(db, "users");
                // const data = {
                //   teamName: teamName
                // };
                // updateDoc(docRef, data)
                // .then(() => {
                //   console.log("Document has been added successfully");
                // });

                navigate("/team");
                //navigate(generatePath("/user/:id/", {id: id,}));
            }
        )}
    }
    
    return (
        <>
        <SideNavBar/>
        <header className="custom_navbar">
            <span id= "myDiv" style={{ color: "#FFF", fontSize: "25px", paddingLeft: "5rem" }}>
            Search for teams
            </span>
        </header>
        <Container className="d-flex align-items-center justify-content-center" >
            <InputGroup className="mb-3 w-50 mx-auto" onKeyPress={handleKeypress} style = {{marginTop:"4.5rem"}}>
                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                <Form.Control ref={searchRef}
                placeholder="Team Name"
                aria-label="Team Name"
                aria-describedby="basic-addon1"
                />
                <Button onClick={handleSubmit} type="button">
                Search
                </Button>
            </InputGroup>
        </Container>
        <Container id = "container">
            {/* <div id="getText" style={{textAlign:"center", display: "none"}}>
                Here
            </div> */}
        </Container>

        </>
    )
}

export var myID;

  