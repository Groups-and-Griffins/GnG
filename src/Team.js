import React from 'react'
import SideNavBar from './SideNavBar'
import {InputGroup, Form, Button, Container} from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";

export default function Team() {
  let navigate = useNavigate();
  async function handleSubmit(e) { 
    navigate('/joinTeam');
}
  
  return (
    <>
        <SideNavBar />
        <header className="custom_navbar">
        <span id="myDiv" style={{ color: "#FFF", fontSize: "20px", paddingLeft: "5rem" }}>
          My Team
        </span>
      </header>
      <Container className="d-flex align-items-center justify-content-center" >
        <Button onClick = {handleSubmit} style= {{marginTop: "20rem"}}>
          Join a team
        </Button>
      </Container>
    </>
  )
}
