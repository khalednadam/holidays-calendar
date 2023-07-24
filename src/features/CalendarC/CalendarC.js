import React, { useEffect } from 'react'
import { Calendar, dateFnsLocalizer  } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import format from 'date-fns/format';   
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import './calendar.css';
import { selectSelectedCountry } from '../Countries/selectedCountrySlice';
import { useDispatch, useSelector } from 'react-redux';
import { loadEvents, selectEvents } from '../CalendarC/calendarCSlice';
import { unwrapResult } from '@reduxjs/toolkit';

const locales = {
    'en-US': enUS,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});


export const CalendarC = () =>{
    const events = useSelector(selectEvents);
    const selectedCountry = useSelector(selectSelectedCountry);
    const dispatch = useDispatch();
    useEffect(() =>{
        if(selectedCountry !== '' && selectedCountry !== undefined){
            console.log('api fetched')
            dispatch(loadEvents(selectedCountry))
            .then(unwrapResult);
        }
    }, [dispatch, selectedCountry]);
    
    const myEventsList = events;
    return(
        <div className='calendar'>
            
            <div className='calendar-parent'>
                <Calendar
                    // view='agenda'
                    defaultView='agenda'
                    localizer={localizer}
                    events={myEventsList}
                    startAccessor="start"
                    style={{ height: '70vh', margin: 10}}
                />
            </div>
        </div>
    );
}