import React, {Component, useState} from 'react';
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import { Form, Button, Card, Alert, Container, InputGroup } from "react-bootstrap"
import { withRouter } from './withRouter';
import "./CalendarStyles.css";
import fire from './UserAuth/config/fire';
import {db} from './UserAuth/config/fire';
import {collection, updateDoc, setDoc, doc, DocumentSnapshot, getDoc, getDocs, onSnapshot, deleteDoc, query, where} from 'firebase/firestore';
import SideNavBar from './SideNavBar';
import { useParams, useLocation } from 'react-router-dom';
import Search from './Search';
import {myID} from './Search';

const styles = {
  wrap: {
    display: "flex"
  },
  left: {
    marginRight: "10px"
  },
  main: {
    flexGrow: "1"
  }
};



class User extends Component {
  constructor(props) {
    super(props);
    this.goHome = this.goHome.bind(this);
    this.calendarRef = React.createRef();
    this.state = {
      viewType: "Week",
      durationBarVisible: false,
      timeRangeSelectedHandling: "Disabled",
      eventDeleteHandling: "Disabled",
      eventResizeHandling: "Disabled",
      eventMoveHandling: "Disabled",
      eventClickHandling: "Disabled",
    };
    
  }

  get calendar() {
    return this.calendarRef.current.control;
  }

  async componentDidMount() {
    if (myID == null) {
      console.log("isNull");
      this.goHome();
    }
    else {
      // console.log(myID);
      // const str = window.location.href;
      // var array = str.split("/");
      // const Userid = array[4];
      const myList = [];

      // var username = array[4];
      // const usersRef = collection(db, "users");
      // const q1 = query(usersRef, where("username", "==", username));
      // const querySnapshot1 = await getDocs(q1);
      // var id;
      // querySnapshot1.forEach((doc) => {
      //   id = doc.data().userID;
      // });
      const querySnapshot = await getDocs(collection(db, "users", myID, "schedule"));
      querySnapshot.forEach((doc) => {
        const event = doc.data();
        myList.push(event);
      });

      const events = myList
      const startDate = "2022-11-14";
      this.calendar.update({startDate, events});

      var e = document.getElementById("myDiv");
      //e.innerHTML = "Search Result: " + username;

    }
  }

  goHome() {
    this.props.navigate('/search')
  }

  render() {
    return (
      <>
        <header className="custom_navbar">
          <span id="myDiv" style={{ color: "#FFF", fontSize: "20px", paddingLeft: "5rem" }}>
            User
          </span>
        </header>
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <SideNavBar />
            <div>
              <div style={styles.wrap}>
                <div style={styles.left}>
                  <DayPilotNavigator
                    selectMode={"week"}
                    startDate={"2022-11-14"}
                    selectionDay={"2022-11-14"}
                    onTimeRangeSelected={args => {
                      this.calendar.update({
                        startDate: args.day
                      });
                    }} />
                </div>
                <div style={styles.main}>
                  <DayPilotCalendar
                    {...this.state}
                    ref={this.calendarRef} />
                </div>
              </div>
              <div className="d-flex align-items-center">
                <Button onClick={this.goHome} className="w-50 mt-4 mx-auto" type="button">
                  Back to Search
                </Button>
              </div>
            </div>
          </Container>
      </>
    );
  }
}

export default withRouter(User);

// import React from 'react';
// import { useParams } from 'react-router-dom';
// import Calendar from './Calendar';

// export default function User() {
//   let { id } = useParams();
//   return (
//     <>
//     {/* <div>UserProfile</div>
//     <div>
//       <h3>ID: {id}</h3>
//     </div> */}
//     <Calendar dataFromParent = {id}/>

//     </>
//   )
// }
