import React, { createContext, useState, useEffect } from "react";
import * as Location from "expo-location";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg(
          "Permission to access location was denied. Turn on location in app settings to help us show events near you"
        );
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        console.log("Error getting location: " + JSON.stringify(error));
        setLocation(location);
        // setErrorMsg(error.message);
      }
    })();
  }, []);

  return (
    <LocationContext.Provider value={{ location, errorMsg }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  return React.useContext(LocationContext);
};
