import React, { Component, useState, useRef} from "react";
import { Card, Button, Form, Alert, Container } from "react-bootstrap"
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
              if (errorCode == 'auth/weak-password') 
                return setError('Password must be longer than six characters');// password to weak. Minimal 6 characters
              if (errorCode == 'auth/email-already-in-use')
               return setError('This email is already in use');// Return a email already in use error
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
      <header className="header_section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8">
              <nav className="navbar navbar-expand-lg custom_nav-container ">
                <a className="navbar-brand" href="/home">
                  <span>
                    Groups&Griffons
                  </span>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <div className="d-flex  flex-column flex-lg-row align-items-center">
                    <ul className="navbar-nav  ">
                      <li className="nav-item active">
                        <a className="nav-link" href="/home">Home <span className="sr-only">(current)</span></a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="about.html">About </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="service.html">Services </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="contact.html">Contact</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/login"> Login</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/signup"> Sign Up</a>
                      </li>
                    </ul>
                    {/* <form className="form-inline my-2 my-lg-0 ml-0 ml-lg-4 mb-3 mb-lg-0">
                      <button className="btn  my-2 my-sm-0 nav_search-btn" type="submit" />
                    </form> */}
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
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
                  <Form.Label>Password (More than 6 characters)</Form.Label>
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
          <div className="w-100 text-center mt-2" style = {{color:"#FFFFFF"}}>
            Already have an account? <Link to="/login" style = {{color:"#000000"}} >Log In</Link>
          </div>
        </div>
      </Container>
    </>
  )
}