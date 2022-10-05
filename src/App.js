import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Login from "./Login";
import CreateProfile from "./CreateProfile";
import PrivateRoute from './PrivateRoute';
import Alex from './Alex';
import HelloWorld from './helloWorld'
import HelloGriffins from './helloGriffins';
import Update from './update';
import PlayerPage from './playerPage'
import Calendar from "./Calendar";

function App() {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{  }}>
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
            <Route path="/Alex" element={<Alex />} />
            <Route path="/helloworld" element={<HelloWorld />} />
            <Route path="/helloGriffins" element={<HelloGriffins />} />
            <Route path="/update" element={<Update />} />
            <Route path="/playerPage" element={<PlayerPage />} />
            <Route path="/calendar" element={<Calendar />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}

export default App