import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

// RightAction Component
function RightAction({ prog, drag }) {
  const styleAnimation = useAnimatedStyle(() => {
    // Kaydırma ilerledikçe butonun yerini ayarlayın
    return {
      transform: [{ translateX: drag.value + 100 }], // Kaydırma hareketine göre animasyon
    };
  });

  return (
    <Reanimated.View style={styleAnimation}>
      <Text style={styles.rightAction}>Delete</Text>
    </Reanimated.View>
  );
}

// Example Component
function Example({ resetSwipe }) {
  return (
    <ReanimatedSwipeable
      containerStyle={styles.swipeable}
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40} // Kaydırma eşiği
      renderRightActions={(prog, drag) => (
        <RightAction prog={prog} drag={drag} />
      )}
      reset={resetSwipe} // Kaydırmayı dışarı tıklayınca sıfırla
    >
      <View style={styles.content}>
        <Text>Swipe me to see the right action!</Text>
      </View>
    </ReanimatedSwipeable>
  );
}

// Home Component
export default function Home() {
  const [resetSwipe, setResetSwipe] = useState(false);

  const handlePressOutside = () => {
    console.log("Press outside, so close the swipeable window.");
    setResetSwipe(true); // Kaydırmayı sıfırla
    setTimeout(() => setResetSwipe(false), 100); // Kaydırma işlemini sıfırlamak için biraz beklet
  };

  return (
    <GestureHandlerRootView>
      <TouchableWithoutFeedback onPress={handlePressOutside}>
        <View style={styles.wrapper}>
          <Example resetSwipe={resetSwipe} />
        </View>
      </TouchableWithoutFeedback>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  rightAction: {
    width: 100,
    height: 50,
    backgroundColor: "purple",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
  },
  swipeable: {
    height: 50,
    backgroundColor: "papayawhip", // Renk burası
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
