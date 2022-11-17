import React, { Component, useState, useRef} from 'react'
import fire from './UserAuth/config/fire';
import {db} from './UserAuth/config/fire';
import { Card, Button, Form, Alert, Container } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom";
import {collection, updateDoc, setDoc, doc, getDoc, getDocs, onSnapshot, deleteDoc, query, where, docSnap} from 'firebase/firestore';
export default function CreateTeam() {
  const teamNameRef = useRef();
  const teamDescriptionRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)
  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault()
    
    var id = fire.auth().currentUser.uid;
    //const teamRef = collection(db, 'teams');
    //var teamName = "dragonBallZ"
    var teamName = teamNameRef.current.value;
    var des = teamDescriptionRef.current.value;
    const docRef = doc(db, "teams", teamName);
    const teamRef = collection(db, "teams");
    const q = query(teamRef, where("team", "==", teamNameRef.current.value));
    const querySnapshot = await getDocs(q);


    if(querySnapshot.empty) {
      const data = {
        team: teamName,
        email: "work.com",
        description: des
      };
      setDoc(docRef, data)
      .then(() => {
        console.log("Document has been added successfully");
      })

      navigate("/team");
    }
    else {
      return setError("Team Name already exists");
    }
  }
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
    <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
            <Card.Body>
            <h2 className="text-center mb-4">Create your Team</h2>
            {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="team-name">
                        <Form.Label>Team Name</Form.Label>
                        <Form.Control type="text" ref={teamNameRef} required />
                    </Form.Group>
                    <Form.Group id="team-description">
                        <Form.Label>Team Description</Form.Label>
                        <Form.Control type="text" ref={teamDescriptionRef} required />
                    </Form.Group>
                    <Button disabled={loading} className="w-100 mt-4" type="submit">
                        Create Profile
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    </div>
</Container>
  )
}