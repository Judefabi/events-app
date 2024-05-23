// import { StatusBar, View, useColorScheme } from "react-native";
// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { lightTheme, darkTheme } from "./globals/colors";
// import AuthStack from "./src/Navigation/Authstack";

// const App = () => {
//   const colorScheme = useColorScheme();

//   const theme = colorScheme === "dark" ? darkTheme : lightTheme;

//   return (
//     <View>
//       <StatusBar
//         barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
//         hidden={false}
//         backgroundColor={theme.colors.line}
//         translucent={true}
//       />
//       <NavigationContainer theme={theme}>
//         {/* <BottomNavigation /> */}
//         <AuthStack />
//       </NavigationContainer>
//     </View>
//   );
// };

// export default App;
import React from "react";
import { StatusBar, Text, View, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { lightTheme, darkTheme } from "./globals/colors";
import AuthStack from "./src/Navigation/Authstack";
import { FontProvider, useFontContext } from "./contexts/fontcontext";
import HomeStack from "./src/Navigation/HomeStack";

const AppContent = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;
  const { fontsLoaded, fontError } = useFontContext();

  if (!fontsLoaded && !fontError) {
    return <Text>Loading...</Text>; // Or a loading spinner
  }

  return (
    <NavigationContainer theme={theme}>
      <HomeStack />
      {/* <AuthStack /> */}
    </NavigationContainer>
  );
};

const App = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  return (
    <FontProvider>
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
          hidden={false}
          backgroundColor={theme.colors.line}
          translucent={true}
        />
        <AppContent />
      </View>
    </FontProvider>
  );
};

export default App;
