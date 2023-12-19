'use client';
import React, { useState, useEffect } from 'react';
import './ContenClender.css';
import Calendar from '@/components/calendar/Calendar';
import axios from 'axios';

interface Event {
  id?: number;
  title: any;
  start: Date;
  end: Date;
  description: string;
  allDay: boolean;

}

function ContentCalendar() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const client_id = JSON.parse(localStorage.getItem('token') || '{}').client_id;
    axios.post('http://localhost:8000/twitter/gettweet', {
      client_id: client_id,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        let newStructData: Event[] = [];
        if (response.data.length > 0) {
          response.data.map((item: any) => {
            newStructData.push({
              id: newStructData.length + 1,
              title: item.tweet,
              start: new Date(item.time),
              end: new Date(new Date(item.time).getTime() + 60 * 60 * 1000),
              description: item.description,
              allDay: false,
            });
          });
        }
        setEvents(newStructData);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

  }, []);

  return (
    <div >
      {loading ? (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div className="loader"></div>
        </div>
      ) : (
        <div className="calendar-container">
        <Calendar events={events} />
        </div>
      )}
    </div>
  );
}

export default ContentCalendar;



