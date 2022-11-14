import React, {Component, useState} from 'react';
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { withRouter } from './withRouter';
import "./CalendarStyles.css";
import fire from './UserAuth/config/fire';
import {db} from './UserAuth/config/fire';
import {collection, updateDoc, setDoc, doc, DocumentSnapshot, getDoc, getDocs, onSnapshot, deleteDoc} from 'firebase/firestore';
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
 d0c0889b8eac02ed47a280e68e011635191019cc
    this.calendar.update({startDate, events});
  }

  goHome() {
    this.props.navigate('/dashboard')
  }

  //insert dates into the database
  insertDatesIntoDatabase(startDate, endDate, startTime, endTime, days, startIndexOfDay, startID, color){
    //startDate and EndDate are strings that need the date in the format of year-month-day
    //startIndexOfDay IS SUPER IMPORTANT, TELLS COMPUTER WHAT INDEX OF THE DAYS ARRAY IS THE START
    //this compares the dates like so 20221023 < 20221024
    if(parseInt(startDate) < parseInt(endDate)){
      //assuming military time
      if(parseInt(startTime) < parseInt(endTime)){
        //assuming at least one 1 in the array of days
        //IGNORING LEAP YEARS
        let startYear = parseInt(startDate.substring(0,5));
        let endYear = parseInt(endDate.substring(0,5));
        //assuming months are always 2 numbers
        let startMonth =  parseInt(startDate.substring(5,7));
        let endMonth = parseInt(endDate.substring(5,7));
        //assuming days are always 2 numbers
        let startDay =  parseInt(startDate.substring(7,9));
        let endDay = parseInt(endDate.substring(7,9));
        //counter variables
        let yearCount = startYear;
        let monthCount = startMonth;
        let dayCount = startDay;
        let currentIndex = startIndexOfDay;

        for(; yearCount <= endYear; yearCount++){
          for(; monthCount <= endMonth; monthCount++){
            if(monthCount > 12){
              break;
            }
            //this loop should only activate if the month is equal to end month
            if(monthCount == endMonth){
              for(; dayCount <= endDay; dayCount++){
                if(days[currentIndex] == 1){
                  //ADD ITEM TO DATABASE
                  const newString = "" + yearCount + "-" + monthCount + "-" + dayCount;
                  const event = [
                    {
                      id: startID,
                      text: "Event "+startID,
                      start: ""+newString+"T"+startTime,
                      end: ""+newString+"T"+endTime,
                      backColor: color
                    }
                  ];
                }
                currentIndex++;
                if(currentIndex > days.length){
                  currentIndex = 0;
                }
              }
            }else{
              //if the month count doesn't equal end month all days must be included
              if(monthCount == 2){
                //febuary
                let maxMonth = 28;
                for(; dayCount <= maxMonth; dayCount++){
                  if(days[currentIndex] == 1){
                    //ADD ITEM TO DATABASE
                  }
                  currentIndex++;
                  if(currentIndex > days.length){
                    currentIndex = 0;
                  }
                }
              }else if(monthCount == 4 || monthCount == 6 || monthCount == 9 || monthCount == 11){
                //april, june, sep, or nov
                let maxMonth = 30;
                for(; dayCount <= maxMonth; dayCount++){
                  if(days[currentIndex] == 1){
                    //ADD ITEM TO DATABASE
                  }
                  currentIndex++;
                  if(currentIndex > days.length){
                    currentIndex = 0;
                  }
                  
                }
              }else{
                //every other month
                let maxMonth = 31;
                for(; dayCount <= maxMonth; dayCount++){
                  if(days[currentIndex] == 1){
                    //ADD ITEM TO DATABASE
                  }
                  currentIndex++;
                  if(currentIndex > days.length){
                    currentIndex = 0;
                  }
                }
              }
            }
          }
        }
      }else{
        return "ERROR: Times are wrong";
      }

    }else{
      return "ERROR: Dates are wrong";
    }

  }

  //export information out of the database
  exportDatesOutOfDatabase() {
    
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
                  } } />
              </div>
              <div style={styles.main}>
                <DayPilotCalendar
                  {...this.state}
                  ref={this.calendarRef} />
              </div>
            </div>
            <Form onClick={this.goHome} className="d-flex align-items-center">
              <Button className="w-50 mt-4 mx-auto" type="button">
                Submit
              </Button>
            </Form>
          </div>
        </Container></>
    );
  }
}

export default withRouter(Calendar);
