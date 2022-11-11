import React, { useState } from "react"
import { Card, Button, Alert, Container } from "react-bootstrap"
import { useAuth } from "./AuthContext"
import { Link, useNavigate } from "react-router-dom"
import {db} from './config/fire';
import {collection, addDoc} from 'firebase/firestore';

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleUpdateProfile() {
    try {
    navigate("/calendar")
    } catch {
      console.log(error);
    }
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
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Profile</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <strong>Email:</strong> {currentUser.email}
              <Button className="w-100 mt-4" type="submit" onClick={handleUpdateProfile}>
                  Edit Schedule
              </Button>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <Button variant="link" onClick={handleLogout} style = {{color:"#F0F8FF"}}>
              Log Out
            </Button>
          </div>
        </div>
    </Container>
    </>
  )
}