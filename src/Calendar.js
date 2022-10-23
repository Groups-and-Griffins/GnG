import React, {Component} from 'react';
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import "./CalendarStyles.css";


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
        console.log(dp.events.list)
      },
      eventDeleteHandling: "Update",
      onEventClick: async args => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt("Update event text:", args.e.text());
        if (!modal.result) { return; }
        const e = args.e;
        e.data.text = modal.result;
        dp.events.update(e);
        if (e.data.text == "Event 2") {
          e.data.eventType = "free time"
          -console.log(e)
        }
      },
    };
    
  }

  get calendar() {
    return this.calendarRef.current.control;
  }

  componentDidMount() {

    const events = [
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
      },
    ];
    //calender format: year-month-day
    const startDate = "2022-10-01";

    if (events.text == "Event 4") {
      console.log('here')
      events.backColor = "#f1c232";
    }
    this.calendar.update({startDate, events});

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
    );
  }
}

export default Calendar;