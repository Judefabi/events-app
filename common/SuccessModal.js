import React, { useEffect } from "react";
import { View, Text, StyleSheet, Modal, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../globals/colors";
import Ionicons from "react-native-vector-icons/Ionicons";

const SuccessModal = ({ isVisible, onClose }) => {
  const navigation = useNavigation();

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
        navigation.navigate("Home");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, navigation]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Ionicons name="checkmark-circle" style={styles.checkIcon} />
          <Text style={styles.successText}>Success</Text>
          <View style={styles.messageView}>
            <Text style={styles.messageViewText}>
              Succesfully created the event. Visit your events page and start
              sharing!!
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: Dimensions.get("window").width * 0.85,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  successText: {
    color: colors.text,
    fontSize: 24,
    fontFamily: "black",
    paddingVertical: 10,
  },
  checkIcon: {
    fontSize: 100,
    color: colors.green,
  },
  messageView: {
    alignItems: "center",
    justifyContent: "center",
  },
  messageViewText: {
    textAlign: "center",
  },
});

export default SuccessModal;
