import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../globals/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import SuccessModal from "../../../common/SuccessModal";

const ConfirmDetails = ({ route }) => {
  const navigation = useNavigation();
  const { eventDetails, tickets, location } = route.params;

  const [isModalVisible, setModalVisible] = useState(false);

  console.log(
    "Event created with details:",
    eventDetails,
    eventDetails.tickets,
    eventDetails.location
  );

  const onCreateEvent = () => {
    setModalVisible(true);
    // console.log("Event created with details:", eventDetails, tickets, location);
    // navigation.navigate("EventCreatedSuccess");
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}>
        <View style={styles.imageContainer}>
          {eventDetails?.image ? (
            <Image source={{ uri: eventDetails?.image }} style={styles.image} />
          ) : (
            <Text>No image provided</Text>
          )}
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Event Details</Text>
          <Text style={styles.label}>Event Name:</Text>
          <Text style={styles.value}>{eventDetails?.name}</Text>

          <Text style={styles.label}>Category:</Text>
          <Text style={styles.value}>{eventDetails?.category}</Text>

          <Text style={styles.label}>Date and Time:</Text>
          <Text style={styles.value}>
            {eventDetails?.date?.toLocaleString()} {"  "}:{" "}
            {eventDetails?.time?.toLocaleString()}
          </Text>

          <Text style={styles.label}>Location:</Text>
          <Text style={styles.value}>{eventDetails?.location?.address}</Text>

          <Text style={styles.label}>Description:</Text>
          <Text style={styles.value}>{eventDetails?.description}</Text>

          {eventDetails?.tickets?.length > 0 ? (
            <View>
              <Text style={styles.label}>Tickets:</Text>
              {eventDetails?.tickets?.map((ticket, index) => (
                <View key={index} style={styles.ticketContainer}>
                  <Text style={styles.ticketText}>
                    {ticket.name}: KES. {ticket.price}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
              }}>
              <Text style={styles.label}>Event is Free:</Text>
              <Ionicons
                name={
                  eventDetails?.isFreeEvent
                    ? "checkmark-circle"
                    : "close-circle"
                }
                style={styles.checkmarkIcon}
              />
            </View>
          )}
        </View>

        <TouchableOpacity
          onPress={onCreateEvent}
          style={[styles.button, { backgroundColor: colors.button }]}>
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>
            Confirm and Create Event
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <SuccessModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default ConfirmDetails;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
    paddingTop: 100,
  },
  imageContainer: {
    marginTop: 20,
    height: Dimensions.get("window").height * 0.25,
    backgroundColor: colors.line,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  detailsContainer: {
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
    marginVertical: 5,
  },
  ticketContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  ticketText: {
    fontSize: 16,
  },
  checkmarkIcon: {
    fontSize: 20,
    color: colors.green,
    marginTop: 5,
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
