import React, { Component, useState, useRef} from "react";
import { Card, Button, Form, Alert } from "react-bootstrap"
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom"
import fire from './config/fire';
import {db} from './config/fire';
import {collection, addDoc, setDoc, doc} from 'firebase/firestore';

export default function Signup() {
    let navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
      e.preventDefault()

      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
          return setError('Passwords do not match');
      }

      try {
          setError('');
          setLoading(true);
          //await signup(emailRef.current.value, passwordRef.current.value);
          var promise = fire.auth().createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value);
          // If there is any error stop the process.
          promise.catch(function (error) {
              var errorCode = error.code;
              console.log(`GOT ERROR: ` + errorCode)
              if (errorCode == 'auth/weak-password') return // password to weak. Minimal 6 characters
              if (errorCode == 'auth/email-already-in-use') return // Return a email already in use error
          });
        
          // When no errors create the account
          promise.then(function () {
              var id = fire.auth().currentUser.uid;
              //const userProfile = collection(db, 'users');
              const docRef = doc(db, "users", id);

              const data = {
                userID: id,
                email: emailRef.current.value
            };
            setDoc(docRef, data)
            .then(() => {
              console.log("Document has been added successfully");
            })
            .catch(error => { console.log(error); })
            navigate("/CreateProfile")
          });
      } catch {
          setError('Failed to create an account');
      }
        
      setLoading(false);
        
    }

 return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  )
}