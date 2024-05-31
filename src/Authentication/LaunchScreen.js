// LaunchScreen.js

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../globals/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LaunchScreen = () => {
  const navigation = useNavigation();
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleCreateEventsPress = async () => {
    await AsyncStorage.setItem("type", "creator");
    navigation.navigate("Register");
  };

  const handleAttendEventsPress = async () => {
    await AsyncStorage.setItem("type", "attendee");
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Image
          source={require("../../assets/splash.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.buttonsView}>
          <TouchableOpacity
            style={styles.buttonCreator}
            onPress={handleCreateEventsPress}>
            <Text style={styles.buttonCreatorText}>I Create Events</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleAttendEventsPress}>
            <Text style={styles.buttonText}>I Attend Events</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 1000,
    height: 1000,
    marginBottom: 50,
  },
  buttonsView: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: colors.button,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 10,
    alignItems: "center",
    width: "90%",
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonCreator: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 10,
    alignItems: "center",
    width: "90%",
  },
  buttonCreatorText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LaunchScreen;
