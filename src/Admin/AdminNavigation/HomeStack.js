import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomNavigation } from "./BottomNavigation";
import EventsDetails from "../Events/EventsDetails";
import { colors } from "../../../globals/colors";
import CreateEvent from "../Events/CreateEvent";
import AddLocation from "../Events/AddLocation";
import CreateTickets from "../Events/CreateTickets";
import ConfirmDetails from "../Events/ConfirmDetails";
import Events from "../Events/Events";

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
        name="Create Event"
        component={CreateEvent}
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
        name="Add Location"
        component={AddLocation}
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
        name="Add Tickets"
        component={CreateTickets}
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
        name="Confirm Details"
        component={ConfirmDetails}
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

export default HomeStack;

const styles = StyleSheet.create({});
