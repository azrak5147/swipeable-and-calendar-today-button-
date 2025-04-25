import React from "react";
import { StyleSheet } from "react-native";
import {
  AgendaList,
  CalendarProvider,
  ExpandableCalendar,
} from "react-native-calendars";
import EventItem from "../component/EventItem";
import { getMarkedDates } from "../component/getMarkedDate";

export default function TakvimScreen() {
  const userEvents = [
    {
      category: "Arkadaş",
      date: "2025-01-25",
      id: "90c0",
      notes: "Gcc",
      title: "Dvgv",
    },
    {
      category: "Arkadaş",
      date: "2025-01-24",
      id: "bca8",
      notes: "D",
      title: "Cxbu",
    },
    {
      category: "Arkadaş",
      date: "2025-01-23",
      id: "8268",
      notes: "F",
      title: "Dg",
    },
  ];

  const specialEvents = [
    {
      date: "2025-01-01",
      notes:
        "Yeni yılınız kutlu olsun! Yeni başlangıçlar ve umut dolu bir yıl dilerim.",
      title: "Yeni Yıl",
    },
    {
      date: "2025-02-14",
      notes: "Sevgiyle dolu bir gün! Sevgililer Günü'nüz kutlu olsun.",
      title: "Sevgililer Günü",
    },
    {
      date: "2025-03-08",
      notes:
        "Kadınlar Günü'nüz kutlu olsun! Tüm kadınların başarıları ve hakları her zaman kutlanmalıdır.",
      title: "Kadınlar Günü",
    },
  ];

  // Tarihe göre veriyi gruplama ve formatlama
  const formatAgendaData = (specialEvents, userEvents) => {
    const combinedEvents = [...specialEvents, ...userEvents];
    const groupedByDate = {};

    combinedEvents.forEach((event) => {
      if (!groupedByDate[event.date]) {
        groupedByDate[event.date] = [];
      }
      groupedByDate[event.date].push(event);
    });

    return Object.entries(groupedByDate).map(([date, events]) => ({
      title: date,
      data: events,
    }));
  };

  const agendaData = formatAgendaData(specialEvents, userEvents);

  const today = new Date().toISOString().split("T")[0];

  return (
    <CalendarProvider
      showTodayButton={true}
      theme={{ todayButtonTextColor: "#000000" }}
      date={today}
      onDateChange={(date) => console.log(date)}
    >
      <ExpandableCalendar markedDates={getMarkedDates(agendaData)} />
      <AgendaList
        sections={agendaData}
        renderItem={({ item }) => (
          <EventItem item={item} isUserData={item.isUserEvent} />
        )}
      />
    </CalendarProvider>
  );
}

const styles = StyleSheet.create({});
