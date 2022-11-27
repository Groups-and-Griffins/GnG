import React, { useContext, useState, useEffect, useRef } from "react";
import { Card, Button, Alert, Container, Form } from "react-bootstrap"
import { useAuth } from "./UserAuth/AuthContext";
import { Link, useNavigate } from "react-router-dom"
import fire from './UserAuth/config/fire';
import {db} from './UserAuth/config/fire';
import {collection, updateDoc, setDoc, doc, getDoc, getDocs, onSnapshot, deleteDoc, query, where, docSnap, getDocsFromServer} from 'firebase/firestore';

import SideNavBar from "./SideNavBar";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const bioValue = useRef();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");


  useEffect(() => {
    const fetchData = async() => {
      try {
        const docRef = doc(db, "users", fire.auth().currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUsername(docSnap.data().username);
          setBio(docSnap.data().bio);
          document.getElementById('bio').value = docSnap.data().bio;
        } else {
          console.error("can't find user");
        }

      } catch(err) {
        console.error(err);
      }
    } 
    fetchData();
}, []);
  async function handleUpdateProfile() {
    // try {
    // navigate("/calendar")
    // } catch {
    //   console.log(error);
    // }
    var id = fire.auth().currentUser.uid;
    const userRef = collection(db, 'users');
    const docRef = doc(db, 'users', id);

    const data = {
        bio: bioValue.current.value
    };
    updateDoc(docRef, data)
    .then(docRef => { 
        console.log("A New Document Field has been added to an existing document"); })
    .catch(error => { console.log(error); })

  }
  async function handleLogout() {
    setError("")

    try {
      await logout()
      navigate("/home")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>
    <SideNavBar/>
    <header className="custom_navbar">
        <span id="myDiv" style={{ color: "#FFF", fontSize: "25px", paddingLeft: "5rem" }}>
          Profile
        </span>
      </header>
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Profile</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <div style={{ display: "inline-grid" }}>
              <strong>Email:</strong> {currentUser.email}
              <strong>Username:</strong> {username}
              </div>
              <Form.Group id="username">
                  <Form.Label style={{fontWeight: "bold"}}>Bio:</Form.Label>
                  <div class="mb-3">
                    <textarea class="form-control" id="bio"  ref={bioValue} rows="3"></textarea>
                  </div>
              </Form.Group>
              <Button className="w-100 mt-4" type="submit" onClick={handleUpdateProfile}>
                  Update Profile
              </Button>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <Button variant="link" onClick={handleLogout} style = {{color:"#F0F8FF"}} >
              Log Out
            </Button>
           
          </div>
        </div>
    </Container>
    </>
  )
}