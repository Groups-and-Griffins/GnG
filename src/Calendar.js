import React, {Component, useState} from 'react';
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import { Form, Button, Card, Alert, Container, InputGroup } from "react-bootstrap"
import { withRouter } from './withRouter';
import "./CalendarStyles.css";
import fire from './UserAuth/config/fire';
import {db} from './UserAuth/config/fire';
import {collection, updateDoc, setDoc, doc, getDoc, getDocs, onSnapshot, deleteDoc, query, where} from 'firebase/firestore';
import SideNavBar from './SideNavBar';


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

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.goHome = this.goHome.bind(this);
    this.calendarRef = React.createRef();
    this.state = {
      viewType: "Week",
      durationBarVisible: false,
      timeRangeSelectedHandling: "Update",
      onTimeRangeSelected: async args => {
        const dp = this.calendar;
        this.calendar.update();
        const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
        dp.clearSelection();
        if (!modal.result) { return; }
        dp.events.add({
          id: DayPilot.guid(),
          text: modal.result,
          start: args.start,
          end: args.end,
          backColor: "#6aa84f"
        });

        // Add events to firestore
        var eventList = [];
        Array.prototype.push.apply(eventList, dp.events.list);
        var id = fire.auth().currentUser.uid;
        for (const element of eventList) {
          const docRef = doc(db, 'users', id, 'schedule', String(element.id));
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
              console.log(docSnap.data());
          }
          else {
            const data = {
              id: element.id,
              text: element.text,
              start: element.start.value,
              end: element.end.value,
              backColor: "#6aa84f"
            };
            setDoc(docRef, data)
            .then(docRef => { 
                console.log("A New Document Field has been added to an existing document"); })
            .catch(error => { console.log(error); })
          }
      };
      },
      eventDeleteHandling: "Update",
      onEventDelete: async args => {
        // const modal = await DayPilot.Modal.confirm("Delete Event?");
        // if (!modal.result) {  
        //   args.preventDefault(); 
        // }
        // else {
          const dp = this.calendar;
          dp.events.update(e);
          const e = args.e;
          // Update event text to firestore
          var id = fire.auth().currentUser.uid;
          const docRef = doc(db, 'users', id, 'schedule', String(e.data.id));
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            await deleteDoc(docRef)
            .then(docRef => { 
              console.log("Doc deleted"); })
              .catch(error => { console.log(error); })
            }
            else {
              console.log("doc doesn't exist")
            }
        //}
      },
      eventResizeHandling: "Update",
      onEventResized: async args => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.confirm("Change Event Times?");
        if (!modal.result) { return; }
        const e = args.e;
        dp.events.update(e);
        // Update event text to firestore
        var id = fire.auth().currentUser.uid;
        const docRef = doc(db, 'users', id, 'schedule', String(e.data.id));
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log(e.data.start.value);
          console.log(e.data.end.value);
          const data = {
            start: e.data.start.value,
            end: e.data.end.value,
          };
          updateDoc(docRef, data)
          .then(docRef => { 
            console.log("Doc Updated"); })
            .catch(error => { console.log(error); })
          }
          else {
            console.log("doc doesn't exist")
          }
      },
      eventMoveHandling: "Update",
      onEventMoved: async args => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.confirm("Move Event?");
        if (!modal.result) { return; }
        const e = args.e;
        dp.events.update(e);
        // Update event text to firestore
        var id = fire.auth().currentUser.uid;
        const docRef = doc(db, 'users', id, 'schedule', String(e.data.id));
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log(e.data.start.value);
          const data = {
            start: e.data.start.value,
            end: e.data.end.value,
          };
          updateDoc(docRef, data)
          .then(docRef => { 
            console.log("Doc Updated"); })
            .catch(error => { console.log(error); })
          }
          else {
            console.log("doc doesn't exist")
          }
      },
      eventClickHandling: "Update",
      onEventClick: async args => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt("Update event text:", args.e.text());
        if (!modal.result) { return; }
        const e = args.e;
        e.data.text = modal.result;
        dp.events.update(e);
        
        // Update event text to firestore
        var id = fire.auth().currentUser.uid;
        const docRef = doc(db, 'users', id, 'schedule', String(e.data.id));
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = {
            text: e.data.text,
          };
          updateDoc(docRef, data)
          .then(docRef => { 
            console.log("Doc Updated"); })
            .catch(error => { console.log(error); })
          }
          else {
            console.log("doc doesn't exist")
          }
      },
    };
    
  }

  get calendar() {
    return this.calendarRef.current.control;
  }

  async componentDidMount() {
    const myList = [];
    var id = fire.auth().currentUser.uid;
    const querySnapshot = await getDocs(collection(db, "users", id, "schedule"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      const event = doc.data();
      myList.push(event);
    });


    const events = myList
    const startDate = "2022-11-14";
    this.calendar.update({startDate, events});

      
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("userID", "==", fire.auth().currentUser.uid));
  const querySnapshot2 = await getDocs(q);
  querySnapshot2.forEach((doc) => {
    console.log(doc.data().username);
    var e = document.getElementById("myDiv");
    e.innerHTML = "Welcome, " + doc.data().username;
  })
}

  goHome() {
    this.props.navigate('/dashboard')
  }

  render() {
    return (
      <>
        <header className="custom_navbar">
          <span id="myDiv" style={{ color: "#FFF", fontSize: "20px", paddingLeft: "5rem" }}>
            Welcome
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
                {/* <Button onClick={this.goHome} className="w-50 mt-4 mx-auto" type="button">
                  Submit
                </Button> */}
              </div>
            </div>
              {/* <div>
                <h3>ID: {this.props.dataFromParent}</h3>
              </div> */}
          </Container>
      </>
    );
  }
}

export default withRouter(Calendar);
