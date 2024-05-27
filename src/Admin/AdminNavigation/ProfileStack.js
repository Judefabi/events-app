import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../Profile/Profile";

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Profile Stack" component={Profile} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
