import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Home = () => {
  return (
    <View style={styles.mainContainer}>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
