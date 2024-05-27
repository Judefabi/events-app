import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountsStack from "./AccountsStack";
import { BottomNavigation } from "./BottomNavigation";
import EventsDetails from "../Events/EventsDetails";
import { colors } from "../../../globals/colors";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home Screen" component={BottomNavigation} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTintColor: colors.text,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
            alignSelf: "center",
          },
          headerTransparent: true,
        }}
        name="Event Details"
        component={EventsDetails}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
