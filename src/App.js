import React from "react";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import CreateProfile from "./CreateProfile";
import PrivateRoute from './PrivateRoute';
import HelloGriffins from './helloGriffins';

function App() {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Routes>
            <Route exact path='/' element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
              }>
              <Route exact path='/home' element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }>
            </Route>
            </Route>
            <Route exact path='/createprofile' element={
                <PrivateRoute>
                  <CreateProfile />
                </PrivateRoute>
              }>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/helloGriffins" element={<helloGriffins />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}

export default App