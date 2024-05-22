import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountsStack from "./AccountsStack";
import { BottomNavigation } from "./BottomNavigation";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {/* <Stack.Screen name="Home Stack" component={Home} /> */}
      <Stack.Screen name="Home Screen" component={BottomNavigation} />
      <Stack.Screen
        options={{ tabBarVisible: false }}
        name="Accounts Stack"
        component={AccountsStack}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
