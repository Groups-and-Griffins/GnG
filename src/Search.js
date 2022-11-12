import React, { Component, useState, useRef} from "react";
import { collection, query, where, getDoc, getDocs } from "firebase/firestore";
import {db} from './UserAuth/config/fire';
import SideNavBar from './SideNavBar';
import {InputGroup, Form, Button, Container} from 'react-bootstrap';

export default function Search() {
    const searchRef = useRef();
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
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            let div = document.createElement('div');
            div.style.textAlign="center";
            div.style.paddingBottom="1rem";
            const time = new Date();
            const timeStr = time.toLocaleTimeString();
            div.innerHTML =  `<span style="background-color: white; padding:0.5rem; border-radius:0.5rem; padding-left: 100px; padding-right: 100px">${doc.data().username}</span>`;
            e.appendChild(div);
        });

        if(querySnapshot.empty) {
            let div = document.createElement('div');
            div.style.textAlign="center";
            div.style.paddingBottom="1rem";
            const time = new Date();
            const timeStr = time.toLocaleTimeString();
            div.innerHTML =  `<span style="background-color: white; padding:0.5rem; border-radius:0.5rem; padding-left: 100px; padding-right: 100px">No user found</span>`;
            e.appendChild(div);
        }
        // let div = document.createElement('div');
        // div.style.textAlign="center";
        // div.style.paddingBottom="1rem";
        // const time = new Date();
        // const timeStr = time.toLocaleTimeString();
        // div.innerHTML =  `<span style="background-color: white; padding:0.5rem; border-radius:0.5rem; padding-left: 100px; padding-right: 100px">${timeStr}</span>`;
        // e.appendChild(div);
    }
    
    return (
        <>
        <SideNavBar/>
        <header className="custom_navbar">
            <span id= "myDiv" style={{ color: "#FFF", fontSize: "25px", paddingLeft: "5rem" }}>
            Search for teams or teammates
            </span>
        </header>
        <Container className="d-flex align-items-center justify-content-center" >
            <InputGroup className="mb-3 w-50 mx-auto" style = {{marginTop:"4.5rem"}}>
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
