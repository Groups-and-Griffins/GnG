import React, { Component, useState, useRef} from 'react'
import { Card, Button, Form, Alert, Container } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import fire from './config/fire';
import {db} from './config/fire';
import {collection, updateDoc, setDoc, doc} from 'firebase/firestore';

export default function CreateProfile() {
    let navigate = useNavigate();
    const [error, setError] = useState('');
    const realNameRef = useRef();
    const userNameRef = useRef();
    const playerRoleRef = useRef();
    const [loading, setLoading] = useState(false)
    
    async function handleSubmit(e) {
        e.preventDefault()

        console.log(realNameRef.current.value);
        console.log(userNameRef.current.value);
        console.log(playerRoleRef.current.value);

        var id = fire.auth().currentUser.uid;
        const userRef = collection(db, 'users');
        const docRef = doc(db, 'users', id);

        const data = {
            name: realNameRef.current.value,
            username: userNameRef.current.value,
            playerRole: playerRoleRef.current.value
        };
        updateDoc(docRef, data)
        .then(docRef => { 
            console.log("A New Document Field has been added to an existing document"); })
        .catch(error => { console.log(error); })
        setLoading(false);
        navigate("/home")
        }
    return (
        <>
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                        <h2 className="text-center mb-4">Create your Profile</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="first-name">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" ref={realNameRef} required />
                                </Form.Group>
                                <Form.Group id="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" ref={userNameRef} required />
                                </Form.Group>
                                <Form.Group id="dndRole">
                                    <Form.Label>Dnd Role</Form.Label>
                                    <Form.Control required as = "select" ref={playerRoleRef} >
                                        <option value="">Select a role</option>
                                        <option value="Player">Player</option>
                                        <option value="DM">Dungeon Master</option>
                                        <option value="NP">No Preference</option>
                                    </Form.Control>
                                    {/* <Form.Control type="username" ref={userNameRef} required /> */}
                                </Form.Group>
                                <Button disabled={loading} className="w-100 mt-4" type="submit">
                                    Create Profile
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </>
    )
}
