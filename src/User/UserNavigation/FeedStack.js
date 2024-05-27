import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Feed from "../Feed/Feed";

const Stack = createNativeStackNavigator();

const FeedStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Feed Stack" component={Feed} />
    </Stack.Navigator>
  );
};

export default FeedStack;


