import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Agenda, LocaleConfig } from "react-native-calendars";
import AntDesign from "@expo/vector-icons/AntDesign";
import EventItem from "../component/EventItem";
export default function CalendarsScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(null);

  // Bugün tarihini elde et
  const todayString = new Date().toISOString().split("T")[0];

  // Etkinlik verileri
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
    {
      date: "2025-03-21",
      notes:
        "Nevruz Bayramı'nız mübarek olsun! Baharın taptaze başlangıcını kutluyoruz.",
      title: "Nevruz Bayramı",
    },
    {
      date: "2025-04-01",
      notes: "Şaka günü! Neşeli ve eğlenceli bir 1 Nisan geçirmenizi dilerim.",
      title: "Şaka Günü",
    },
  ];

  // Etkinlikleri tarihe göre grupla
  const formatAgendaData = (specialEvents, userEvents) => {
    const formatted = {};

    specialEvents.forEach((event) => {
      if (!formatted[event.date]) {
        formatted[event.date] = [];
      }
      formatted[event.date].push({ ...event, isUserEvent: false });
    });

    userEvents.forEach((event) => {
      if (!formatted[event.date]) {
        formatted[event.date] = [];
      }
      formatted[event.date].push({ ...event, isUserEvent: true });
    });

    return formatted;
  };

  const agendaData = formatAgendaData(specialEvents, userEvents);

  // Seçilen tarihteki etkinlikleri filtrele
  const filteredAgendaData = selectedDate
    ? { [selectedDate]: agendaData[selectedDate] || [] }
    : agendaData;

  // Bugün butonuna tıklandığında bugünü seç
  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  return (
    <SafeAreaView style={styles.Agendacontainer}>
      <Agenda
        selected={selectedDate || todayString} // Bugün tarihini seçili yap
        onDayPress={handleDayPress}
        items={filteredAgendaData} // Filtrelenmiş etkinlik verisini göster
        markedDates={{
          [todayString]: { selected: true, selectedColor: "blue" },
        }}
        renderItem={(item) => (
          <EventItem item={item} isUserData={item.isUserEvent} />
        )}
        renderEmptyData={() => <Text>Bugün etkinlik yok</Text>}
      />
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setSelectedDate(todayString)}>
          <Text style={styles.tabText}>Bugün</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign
            name="search1"
            size={24}
            color="black"
            style={{
              marginBottom: 5,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.tabText}>Etkinliklerim</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Agendacontainer: {
    flex: 1,
    backgroundColor: "white",
  },
  eventContainer: {
    padding: 10,
    backgroundColor: "lightgray",
    marginBottom: 5,
  },
  eventTitle: {
    fontWeight: "bold",
  },
  tabContainer: {
    borderColor: "lightgray",
    borderWidth: 1,
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    bottom: 0,
    paddingHorizontal: 20,
    alignItems: "center",
    height: 50,
    width: "100%",
  },
  tabText: {
    fontSize: 16,
    color: "black",
    marginBottom: 5,
  },
});
