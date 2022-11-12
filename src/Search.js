import React, { Component, useState, useRef} from "react";
import SideNavBar from './SideNavBar';
import {InputGroup, Form, Button, Container} from 'react-bootstrap';

export default function Search() {
    const searchRef = useRef();
    async function handleSubmit(e) {
        console.log(searchRef.current.value);
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
        </>
    )
}
