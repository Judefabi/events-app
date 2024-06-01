import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../../contexts/authContext";
import LaunchScreen from "../Authentication/LaunchScreen";
import Register from "../Authentication/Register";
import Email from "../Authentication/Email";
import Login from "../Authentication/Login";
import UserHomeStack from "../User/UserNavigation/UserHomeStack";
import AdminHomeStack from "../Admin/AdminNavigation/AdminHomeStack";
import { useNavigation } from "@react-navigation/native";
import MainLoadingIndicator from "../../common/MainIndicator";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const navigation = useNavigation();
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const { isAuthenticated, type, loading } = useAuth(); // Assume loading is a state in your auth context

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const value = await AsyncStorage.getItem("alreadyLaunched");
        setIsFirstLaunch(value === null);
      } catch (error) {
        console.error(
          "Error retrieving isFirstLaunch from AsyncStorage:",
          error
        );
      }
    };

    checkFirstLaunch();
  }, []);

  useEffect(() => {
    console.log(isAuthenticated);
    if (isAuthenticated === undefined) return;

    if (isFirstLaunch) {
      navigation.navigate("Launch");
    } else if (isAuthenticated) {
      if (type === "creator") {
        navigation.navigate("Admin Stack");
      } else if (type === "attendee") {
        navigation.navigate("User Stack");
      }
    } else {
      navigation.navigate("Login");
    }
  }, [isFirstLaunch, isAuthenticated, type]);

  if (isAuthenticated === undefined) {
    return <MainLoadingIndicator />;
  }

  // console.log(routename);
  return (
    <Stack.Navigator
      initialRouteName={"Launch"}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Launch" component={LaunchScreen} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Forgot Password" component={Email} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="User Stack" component={UserHomeStack} />
      <Stack.Screen name="Admin Stack" component={AdminHomeStack} />
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
