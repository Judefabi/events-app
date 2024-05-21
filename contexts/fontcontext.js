import React, { createContext, useContext, useEffect, useState } from "react";
import { useFonts } from "expo-font";

const FontContext = createContext();

export const useFontContext = () => useContext(FontContext);

export const FontProvider = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [fontError, setFontError] = useState(null);

  const [loaded, error] = useFonts({
    black: require("../assets/fonts/black.ttf"),
    bold: require("../assets/fonts/bold.ttf"),
    light: require("../assets/fonts/light.ttf"),
    medium: require("../assets/fonts/medium.ttf"),
    regular: require("../assets/fonts/regular.ttf"),
    thin: require("../assets/fonts/thin.ttf"),
    thinitalic: require("../assets/fonts/thinitalic.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      setFontsLoaded(true);
    } else if (error) {
      setFontError(error);
    }
  }, [loaded, error]);

  return (
    <FontContext.Provider value={{ fontsLoaded, fontError }}>
      {children}
    </FontContext.Provider>
  );
};
