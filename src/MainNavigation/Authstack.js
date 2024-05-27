import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomNavigation } from "../User/UserNavigation/BottomNavigation";
import Register from "../Authentication/Register";
import Email from "../Authentication/Email";
import Login from "../Authentication/Login";
import HomeStack from "../User/UserNavigation/HomeStack";
import { useTheme } from "@react-navigation/native";

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
    routename = "Register";
  } else {
    routename = "Register";
  }
  return (
    <Stack.Navigator
      initialRouteName={routename}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Forgot Password" component={Email} />
      <Stack.Screen name="Login" component={Login} />
      {/* <Stack.Screen name="Bottom" component={BottomNavigation} /> */}
      <Stack.Screen name="Home Stack" component={HomeStack} />
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
