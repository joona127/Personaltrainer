import React, {useEffect, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import Traininglist from './Traininglist';

export default function MyCalendar() {
    const [trainings, setTrainings] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        getTrainings();

    }, [])

    const getTrainings = () => {
        fetch("https://customerrest.herokuapp.com/gettrainings/")
            .then(response => response.json())
            .then(data => {
                
                setTrainings(data)
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        makeEvents();

    }, [trainings])

   const makeEvents = () => {
       var i;
       var eventit = [];
       for (i = 0; i < trainings.length; i++) {
           
        let a = {};
        a.title = trainings[i].customer.firstname + ' ' + trainings[i].customer.lastname + ' - ' + trainings[i].activity;
        a.date = trainings[i].date;
        var ending = new Date(trainings[i].date);
        ending.setMinutes(ending.getMinutes() + trainings[i].duration);
        a.end = ending;
        eventit.push(a);
         
       }
    setEvents(eventit);
   }


    return (
        <div>
            <FullCalendar

                initialView="dayGridMonth"
                height="650px"
                headerToolbar={{
                    left: "prev,next",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay"
                }}
                plugins={[dayGridPlugin, timeGridPlugin]}
               events={events}
            

            />
        </div>
    )
}

