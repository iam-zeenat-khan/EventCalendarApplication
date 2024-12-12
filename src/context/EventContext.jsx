import { createContext, useEffect, useState } from "react";

export const EventContext = createContext();



export const EventProvider = ({ children }) => {
  const dummyData = [
    {
      id: 1,
      title: "Team Meeting",
      details: "Discuss project updates and tasks.",
      startTime: "10:00",
      endTime: "11:30",
      category: "Work",
      date: "2024-12-13",
    },
    {
      id: 2,
      title: "Family Dinner",
      details: "Dinner with family at the new Italian restaurant.",
      startTime: "19:00",
      endTime: "21:00",
      category: "Family",
      date: "2024-12-13",
    },
    {
      id: 3,
      title: "Morning Jog",
      details: "Jogging at the park for 30 minutes.",
      startTime: "06:00",
      endTime: "06:30",
      category: "Personal",
      date: "2024-12-14",
    },
    {
      id: 4,
      title: "Grocery Shopping",
      details: "Buy weekly groceries.",
      startTime: "15:00",
      endTime: "16:00",
      category: "Other",
      date: "2024-12-14",
    },
  ];

  const [events, setEvents] = useState(() => {
    const localData = localStorage.getItem("events");
    return localData ? JSON.parse(localData) : dummyData; // Use dummy data if no localStorage data
  });

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events"));
    if (storedEvents) {
      setEvents(storedEvents);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const addEvent = (newEvent) => {
    const eventWithId = { ...newEvent, id: Date.now() }; // Generate unique id using timestamp
    setEvents((prevEvents) => [...prevEvents, eventWithId]);
  };

  const deleteEvent = (id) => {
    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.filter((event) => event.id !== id);
      localStorage.setItem("events", JSON.stringify(updatedEvents));
      return updatedEvents;
    });
  };

  const updateEvent = (updatedEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const deleteAllEvent = () => {
    setEvents([]);
    localStorage.removeItem("events");
  };

  return (
    <EventContext.Provider
      value={{ events, setEvents, addEvent, deleteEvent, deleteAllEvent, updateEvent }}
    >
      {children}
    </EventContext.Provider>
  );
};