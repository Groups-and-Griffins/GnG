import React, { Component, useState, useRef} from "react";
import { collection, query, where, getDoc, getDocs } from "firebase/firestore";
import {db} from './UserAuth/config/fire';
import { Link, useNavigate } from "react-router-dom";
import { generatePath } from "react-router";
import SideNavBar from './SideNavBar';
import {InputGroup, Form, Button, Container} from 'react-bootstrap';

export default function Search() {
    let navigate = useNavigate();
    const searchRef = useRef();
    const handleKeypress = (e) => {  //it triggers by pressing the enter key
      if (e.which === 13) {
        handleSubmit();
      }
    };
    async function handleSubmit(e) {
        // console.log(searchRef.current.value);
        var e = document.getElementById("container");
        while (e.firstChild) {
            e.removeChild(e.firstChild);
        }

        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", searchRef.current.value));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // const time = new Date();
            // const timeStr = time.toLocaleTimeString();
            let div = document.createElement('div');
            div.id="search";
            div.className = "searchResultContainer";
            div.innerHTML =  `<span class = "searchResult" >${doc.data().username}</span>`;
            e.appendChild(div);
    
        });

        if(querySnapshot.empty) {
            let div = document.createElement('div');
            div.id="search";
            div.className = "searchResultContainer";
            div.innerHTML =  `<span class = "noSearchResult" >No user found</span>`;
            e.appendChild(div);
        }
        document.getElementById('search').addEventListener('click', clickUser);

        function clickUser() {
            console.log("here");
            const id = '59f781ee-b906-3c7a-e471-ee72aedca51c'
            //navigate("/user")
            navigate(
            generatePath("/user/:id/", {
                id: id,
              }));
        }
    }
    
    return (
        <>
        <SideNavBar/>
        <header className="custom_navbar">
            <span id= "myDiv" style={{ color: "#FFF", fontSize: "20px", paddingLeft: "5rem" }}>
            Search for teams or teammates
            </span>
        </header>
        <Container className="d-flex align-items-center justify-content-center" >
            <InputGroup className="mb-3 w-50 mx-auto" onKeyPress={handleKeypress} style = {{marginTop:"4.5rem"}}>
                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                <Form.Control ref={searchRef}
                placeholder="Username"
                aria-label="Username"
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
