import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./UserAuth/AuthContext";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import Signup from "./UserAuth/Signup";
import Dashboard from "./Dashboard";
import Login from "./UserAuth/Login";
import CreateProfile from "./UserAuth/CreateProfile";
import PrivateRoute from './PrivateRoute';
import Alex from './4800Activities/Alex';
import HelloWorld from './4800Activities/helloWorld'
import HelloGriffins from './4800Activities/helloGriffins';
import Update from './4800Activities/update';
import PlayerPage from './4800Activities/playerPage'
import Calendar from "./Calendar";
import Home from "./Home";
import Search from "./Search";
import Team from "./Team";
import User from "./User";

export default function App() {
  return (
    // <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{  }}>
        <Router>
          <AuthProvider>
            <Routes>
            {/* <Route exact path='/' element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
              }>
            </Route> */}
              <Route exact path='/dashboard' element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }>
              </Route>

            <Route exact path='/createprofile' element={
                <PrivateRoute>
                  <CreateProfile />
                </PrivateRoute>
              }>
              </Route>
              <Route exact path='/calendar' element={
                <PrivateRoute>
                  <Calendar />
                </PrivateRoute>
              }>
              </Route>
              <Route exact path='/team' element={
                <PrivateRoute>
                  <Team />
                </PrivateRoute>
              }>
              </Route>
              
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/Alex" element={<Alex />} />
            <Route path="/helloworld" element={<HelloWorld />} />
            <Route path="/helloGriffins" element={<HelloGriffins />} />
            <Route path="/update" element={<Update />} />
            <Route path="/playerPage" element={<PlayerPage />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/search" element={<Search />} />
            <Route path="/user/:id" element={<User />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    // </Container>
  )
}
