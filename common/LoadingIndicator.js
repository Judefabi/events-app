import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../globals/colors";

const LoadingIndicator = () => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator
        style={styles.indicator}
        size={50}
        color={colors.text}
      />
      {/* <Text>Loading...</Text> */}
    </View>
  );
};

export default LoadingIndicator;

const styles = StyleSheet.create({
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  indicator: {
    color: colors.text,
  },
});
