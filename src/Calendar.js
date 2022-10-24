import React, {Component, useState} from 'react';
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import "./CalendarStyles.css";
import fire from './config/fire';
import {db} from './config/fire';
import {collection, updateDoc, setDoc, doc, DocumentSnapshot, getDoc} from 'firebase/firestore';

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
    this.calendarRef = React.createRef();
    this.state = {
      viewType: "Week",
      durationBarVisible: false,
      timeRangeSelectedHandling: "Enabled",
      onTimeRangeSelected: async args => {
        const dp = this.calendar;
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
        const userRef = collection(db, 'users');
        for (const element of eventList) {
          const docRef = doc(db, 'users', id, 'schedule', String(element.id));
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
              console.log(element.id);
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

  componentDidMount() {
    this.setState({
      startDate: "2022-10-01",
      events: [
        {
          id: 1,
          text: "Event 1",
          start: "2022-09-27T10:30:00",
          end: "2022-09-27T13:00:00"
        },
        {
          id: 2,
          text: "Event 2",
          start: "2022-09-28T09:30:00",
          end: "2022-09-28T11:30:00",
          backColor: "#6aa84f"
        },
        {
          id: 3,
          text: "Event 3",
          start: "2022-09-29T12:00:00",
          end: "2022-09-29T15:00:00",
          backColor: "#f1c232"
        },
        {
          id: 4,
          text: "Event 4",
          start: "2022-10-01T11:30:00",
          end: "2022-10-01T14:30:00",
          backColor: "#cc4125"
        }
    ]
  })

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
      {/* <Form onClick={handleSubmit}> */}
        <Button className="w-100 mt-4" type="button">
          Submit
        </Button>
      {/* </Form> */}
      </div>
    );
  }
}

export default Calendar;