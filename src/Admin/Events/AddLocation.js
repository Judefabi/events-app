import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { colors } from "../../../globals/colors";
import { useNavigation } from "@react-navigation/native";

const LocationSearch = ({ route }) => {
  const navigation = useNavigation();
  const { eventDetails } = route.params;
  const [location, setLocation] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });

  const handleLocationSelect = (data, details) => {
    const { lat, lng } = details.geometry.location;
    setLocation(data.description);
    setCoordinates({ lat, lng });
  };

  const onConfirmLocation = () => {
    if (!location) {
      Alert.alert("Error", "Please select a location");
      return;
    }

    const updatedTags = [...eventDetails.tags, location];

    // Create updated event details object

    const updatedEventDetails = {
      ...eventDetails,
      location,
      coordinates,
      tags: updatedTags,
    };
    // console.log("Updated dets", updatedEventDetails);
    navigation.navigate("Confirm Details", {
      eventDetails: updatedEventDetails,
    });
  };

  return (
    <View style={styles.mainContainer}>
      <GooglePlacesAutocomplete
        placeholder="Search for a location"
        fetchDetails={true}
        onPress={handleLocationSelect}
        query={{
          key: "",
          language: "en",
        }}
        styles={{
          textInput: styles.textInput,
          container: styles.autocompleteContainer,
          listView: styles.listView,
        }}
      />
      {location && (
        <View style={styles.locationDetails}>
          <Text style={styles.locationText}>Selected Location: {location}</Text>
        </View>
      )}
      <TouchableOpacity
        onPress={onConfirmLocation}
        style={[styles.button, { backgroundColor: colors.button }]}>
        <Text style={[styles.buttonText, { color: colors.buttonText }]}>
          Confirm Location
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocationSearch;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
    paddingBottom: 100,
    paddingTop: 70,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginVertical: 10,
  },
  autocompleteContainer: {
    flex: 1,
    marginTop: 20,
  },
  listView: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    marginTop: 10,
    maxHeight: 300,
  },
  locationDetails: {
    marginVertical: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
  },
  locationText: {
    fontSize: 16,
    marginVertical: 5,
  },
  button: {
    width: Dimensions.get("window").width * 0.9,
    alignSelf: "center",
    height: 50,
    marginVertical: 20,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 10,
    position: "absolute",
    bottom: 30,
    alignItems: "center",
  },
  buttonText: {
    alignSelf: "center",
    fontSize: 16,
  },
});
