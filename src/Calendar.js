import React, {Component, useState} from 'react';
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { withRouter } from './withRouter';
import "./CalendarStyles.css";
import fire from './config/fire';
import {db} from './config/fire';
import {collection, updateDoc, setDoc, doc, DocumentSnapshot, getDoc, getDocs, onSnapshot} from 'firebase/firestore';

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
      timeRangeSelectedHandling: "Enabled",
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
              end: element.end.value
            };
            setDoc(docRef, data)
            .then(docRef => { 
                console.log("A New Document Field has been added to an existing document"); })
            .catch(error => { console.log(error); })
          }
      };
      },
      eventDeleteHandling: "Update",
      onEventClick: async args => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt("Update event text:", args.e.text());
        if (!modal.result) { return; }
        const e = args.e;
        e.data.text = modal.result;
        dp.events.update(e);  
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
    const startDate = "2022-10-01";
    this.calendar.update({startDate, events});
  }

  goHome() {
    this.props.navigate('/home')
  }

  render() {
    return (
      <div>
      <div style={styles.wrap}>
        <div style={styles.left}>
          <DayPilotNavigator
            selectMode={"week"}
            startDate={"2022-10-01"}
            selectionDay={"2022-10-01"}
            onTimeRangeSelected={ args => {
              this.calendar.update({
                startDate: args.day
              });
            }}
          />
        </div>
        <div style={styles.main}>
          <DayPilotCalendar
            {...this.state}
            ref={this.calendarRef}
          />
        </div>
        </div>
      <Form onClick={this.goHome}>
        <Button className="w-100 mt-4" type="button">
          Submit
        </Button>
      </Form>
      </div>
    );
  }
}

export default withRouter(Calendar);
