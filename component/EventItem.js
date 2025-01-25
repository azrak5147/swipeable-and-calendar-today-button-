import React, { useCallback, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import EventActions from "./EventAction";
const EventItem = ({ item, isUserData }) => {
  console.log("eventItema gelen item ::: " + item);

  const formatDateToDDMMYYYY = useCallback((dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  }, []);

  const renderItemContent = () => (
    <View style={styles.activityContainer}>
      <View style={styles.itemContent}>
        <View style={styles.textContainer}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.itemText}>{item.title}</Text>
            {isUserData && (
              <Text
                style={{ color: "gray", fontSize: 13, top: 3, marginLeft: 5 }}
              >
                ( {formatDateToDDMMYYYY(item.date)} )
              </Text>
            )}
          </View>
          <Text style={styles.notesText}>{item.notes}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <GestureHandlerRootView>
      {isUserData ? (
        <ReanimatedSwipeable
          enableTrackpadTwoFingerGesture //2 parmağin da aktif çalışması
          containerStyle={styles.swipeable}
          renderRightActions={(prog, drag) => (
            <EventActions prog={prog} drag={drag} selectedEvent={item} />
          )}
          rightThreshold={50}
          friction={1}
          onSwipeableWillOpen={() => console.log("Swipe Opened")}
          onSwipeableWillClose={() => console.log("Swipe Closed")}
        >
          {renderItemContent()}
        </ReanimatedSwipeable>
      ) : (
        <View>{renderItemContent()}</View>
      )}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  activityContainer: {
    padding: 10,
    marginBottom: 10,
    marginTop: 25,
    width: "95%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 3 },
    elevation: 3,
    backgroundColor: "#ffe3ea",
    borderRadius: 10,
    alignSelf: "center",
  },
  swipeable: {},
  itemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  notesText: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default EventItem;
