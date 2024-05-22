import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Profile = () => {
  return (
    <View style={styles.mainContainer}>
      <Text>Profile</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
