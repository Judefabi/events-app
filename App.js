import React from "react";
import { StatusBar, Text, View, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { lightTheme, darkTheme, colors } from "./globals/colors";
import { FontProvider, useFontContext } from "./contexts/fontcontext";
import HomeStack from "./src/User/UserNavigation/UserHomeStack";
import SuccessModal from "./common/SuccessModal";
import LaunchScreen from "./src/Authentication/LaunchScreen";
import AuthStack from "./src/MainNavigation/Authstack";
import { AuthProvider } from "./contexts/authContext";
import { LocationProvider } from "./contexts/locationContext";
import { LoadingProvider } from "./contexts/loadingContext";

const AppContent = () => {
  const { fontsLoaded, fontError } = useFontContext();

  if (!fontsLoaded && !fontError) {
    return <Text>Loading...</Text>; // Or a loading spinner
  }

  return (
    <NavigationContainer>
      {/* <HomeStack /> */}
      <AuthStack />
      {/* <SuccessModal /> */}
      {/* <LaunchScreen /> */}
    </NavigationContainer>
  );
};

const App = () => {
  const colorScheme = useColorScheme();

  return (
    <LocationProvider>
      <AuthProvider>
        <FontProvider>
          <LoadingProvider>
            <View style={{ flex: 1, backgroundColor: colors.background }}>
              <StatusBar
                barStyle={
                  colorScheme === "dark" ? "light-content" : "dark-content"
                }
                hidden={false}
                backgroundColor={colors.line}
                translucent={true}
              />
              <AppContent />
            </View>
          </LoadingProvider>
        </FontProvider>
      </AuthProvider>
    </LocationProvider>
  );
};

export default App;
