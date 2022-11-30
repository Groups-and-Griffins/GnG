import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "./AuthContext"
import { Link, useNavigate } from "react-router-dom";
import fire from './config/fire';


export default function Login() {
    let navigate = useNavigate();
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("");
      setLoading(true);
      //await login(emailRef.current.value, passwordRef.current.value);
      var promise = fire.auth().signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
      promise.catch(function (error) {
        var errorCode = error.code;
        console.log(errorCode)
        if (errorCode == 'auth/wrong-password') 
          setError('Incorrect Password');// password incorrect
        if (errorCode == 'auth/user-not-found') 
          setError('User not found');// password incorrect
      });
      promise.then(function () {
        navigate("/calendar");
    });
    } catch {
      setError("Failed to log in");
    }
    
    setLoading(false)
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
                        <a className="nav-link" href="/login"> Login</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/signup"> Sign Up</a>
                      </li>
                    </ul>
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
              <h2 className="text-center mb-4">Log In</h2>
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
                <Button disabled={loading} className="w-100 mt-4" type="submit">
                  Log In
                </Button>
              </Form>
              <div className="w-100 text-center mt-3">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2" style = {{color:"#FFFFFF"}}>
            Need an account? <Link to="/signup" style = {{color:"#000000"}} >Sign Up</Link>
          </div>
        </div>
      </Container>
    </>
  )
}