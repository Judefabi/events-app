import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomNavigation } from "./BottomNavigation";
import EventsDetails from "../Events/EventsDetails";
import { colors } from "../../../globals/colors";
import Events from "../Events/Events";

const Stack = createNativeStackNavigator();

const UserHomeStack = () => {
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
        name="Events"
        component={Events}
      />
    </Stack.Navigator>
  );
};

export default UserHomeStack;
