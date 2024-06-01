// Toast.js
import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../globals/colors";
import { useLoading } from "../contexts/loadingContext";

const Toast = () => {
  const { toastMessage, toastVisible, toastStatus, hideToast } = useLoading();

  useEffect(() => {
    if (toastVisible) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toastVisible, hideToast]);

  if (!toastVisible) return null;

  return (
    <View
      style={[
        styles.toastContainer,
        toastStatus === "success"
          ? { borderLeftColor: colors.green }
          : { borderLeftColor: colors.red },
      ]}>
      <View>
        <Text
          style={
            toastStatus === "success" ? styles.succesText : styles.errorText
          }>
          {toastStatus}
        </Text>
        <Text style={styles.toastText}>{toastMessage}</Text>
      </View>
      <TouchableOpacity style={styles.closeButton} onPress={hideToast}>
        <Text style={styles.cancelText}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    top: 60,
    left: 20,
    right: 20,
    backgroundColor: colors.background,
    padding: 10,
    borderRadius: 10,
    justifyContent: "space-between",
    flex: 1,
    borderLeftWidth: 10,
    borderLeftColor: colors.green,
    elevation: 2,
    zIndex: 1001,
    flexDirection: "row",
  },
  succesText: {
    color: colors.green,
    fontSize: 16,
    fontFamily: "black",
  },
  errorText: {
    color: colors.red,
    fontSize: 16,
    fontFamily: "black",
  },
  toastText: {
    color: colors.text,
    fontSize: 16,
  },
  closeButton: {
    paddingHorizontal: 20,
  },
  cancelText: {
    fontSize: 26,
    fontFamily: "black",
  },
});

export default Toast;
