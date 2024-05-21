import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const AccountsStack = () => {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="Accounts"
      screenOptions={{
        headerShadowVisible: false,
        headerTintColor: colors.text,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
          alignSelf: "center",
        },
      }}>
    </Stack.Navigator>
  );
};

export default AccountsStack;

const styles = StyleSheet.create({});
