// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import CalendarsScreen from "./screens/CalendarScreen";
const RootStack = createNativeStackNavigator({
  screens: {
    Calendars: CalendarsScreen,
    Home: Home,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
