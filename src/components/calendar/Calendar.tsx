'use client'

import * as React from 'react';

// react-big calendar
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export interface Event {
  id?: number;
  title: any;
  start: Date;
  end: Date;
  description: string;
  allDay: boolean;

}


export interface CalendarProps {
  events: Event[];
}

export default function CalendarComponent({ events }: CalendarProps): JSX.Element {

  console.log(events, 'events')

  return (
    <div >
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}

