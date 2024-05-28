import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomNavigation } from "../User/UserNavigation/BottomNavigation";
import Register from "../Authentication/Register";
import Email from "../Authentication/Email";
import Login from "../Authentication/Login";
import { useTheme } from "@react-navigation/native";
import LaunchScreen from "../Authentication/LaunchScreen";
import UserHomeStack from "../User/UserNavigation/UserHomeStack";
import AdminHomeStack from "../Admin/AdminNavigation/AdminHomeStack";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const { colors } = useTheme();
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);

  let routename;
  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value == null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null; //handle error message to show if
  } else if (isFirstLaunch === true) {
    routename = "Launch";
  } else {
    routename = "Launch";
  }
  return (
    <Stack.Navigator
      initialRouteName={routename}
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
