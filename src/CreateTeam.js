import React, { Component, useState, useRef} from 'react'
import fire from './UserAuth/config/fire';
import {db} from './UserAuth/config/fire';
import { Card, Button, Form, Alert, Container } from "react-bootstrap"
import {collection, updateDoc, setDoc, doc, getDoc, getDocs, onSnapshot, deleteDoc, query, where, docSnap} from 'firebase/firestore';
export default function CreateTeam() {
  const teamNameRef = useRef();
  const teamDescriptionRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    var id = fire.auth().currentUser.uid;
    //const teamRef = collection(db, 'teams');
    var teamName = "dragonBallZ"
    const docRef = doc(db, "teams", teamName);

    const data = {
      team: teamName,
      email: "myemail.com"
    }
    setDoc(docRef, data)
    .then(() => {
      console.log("Document has been added successfully");
    })
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
