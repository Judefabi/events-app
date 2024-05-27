import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Feed = () => {
  return (
    <View style={styles.mainContainer}>
      <Text>Feed</Text>
    </View>
  );
};

export default Feed;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
