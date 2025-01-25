import React, { useContext, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Text,
  Button,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Reanimated, { useAnimatedStyle } from "react-native-reanimated";

const EventActions = ({ selectedEvent, drag }) => {
  console.log("event actiona geldi..");
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const translateX = useDerivedValue(() => drag.value);

  const handleDelete = () => setIsModalVisible(true);

  const pressDelete = async () => {
    setIsModalVisible(false);
  };

  const handleEdit = async () => {
    await AsyncStorage.setItem("selectedEvent", JSON.stringify(selectedEvent));
    navigation.navigate("modal");
  };

  // butonun yeri
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value + 160 }],
    };
  });

  return (
    <>
      <Reanimated.View style={styleAnimation}>
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.iconWrapper} onPress={handleDelete}>
            <MaterialIcons name="delete-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper} onPress={handleEdit}>
            <AntDesign name="edit" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </Reanimated.View>
      <View style={{ flex: 1 }}>
        <Modal
          visible={isModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Bu etkinliği silmek istediğinize emin misiniz?
              </Text>
              <View style={styles.modalButtons}>
                <Button
                  title="İptal"
                  onPress={() => setIsModalVisible(false)}
                  color="gray"
                />
                <Button title="Sil" onPress={pressDelete} color="red" />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: "row",
    marginVertical: 20,
    top: 10,
  },
  iconWrapper: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 8,
    zIndex: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "rgb(22, 28, 45)",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "left",
    color: "#fff",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
  },
});

export default EventActions;
