import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../globals/colors";

const HorizontalCard = ({ event }) => {
  const navigation = useNavigation();

  const { id, name, date, time, location, description, imageUrl, attendees } =
    event;

  const formatAttendeeCount = (count) => {
    if (count < 1000) {
      return `+${count}`;
    } else if (count >= 1000) {
      return `+${(count / 1000).toFixed(0)}k`;
    } else {
      return `+${(count / 1000).toFixed(0).replace(".0", "")}k`;
    }
  };

  const onDetails = () => {
    navigation.navigate("Event Details", {
      event: event,
    });
  };

  const onConfirmAttending = (id) => {
    console.log("confirmed", id);
  };

  return (
    <TouchableOpacity onPress={onDetails} style={styles.card}>
      <View style={styles.cardInnerView}>
        <Image style={styles.eventImage} source={{ uri: imageUrl }} />
      </View>
      <View style={styles.eventsDetailsView}>
        <Text style={styles.eventTitle}>{name}</Text>
        <View style={styles.scheduleDetails}>
          <View style={styles.scheduleDetailView}>
            <Ionicons
              style={styles.scheduleDetailIcon}
              name="calendar-clear-outline"
            />
            <Text style={styles.eventDate}>{date}</Text>
          </View>
          <View style={styles.scheduleDetailView}>
            <Ionicons style={styles.scheduleDetailIcon} name="time-outline" />
            <Text style={styles.eventTime}>{time}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HorizontalCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.google,
    height: Dimensions.get("window").height * 0.3,
    width: Dimensions.get("window").width * 0.8,
    marginRight: 10,
    borderRadius: 10,
    padding: 10,
    elevation: 1,
    marginVertical: 10,
  },
  cardInnerView: {
    backgroundColor: colors.background,
    height: Dimensions.get("window").height * 0.18,
    borderRadius: 10,
    overflow: "hidden",
  },
  eventImage: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
  },
  eventsDetailsView: {
    paddingHorizontal: 10,
  },
  eventTitle: {
    fontSize: 22,
    fontFamily: "black",
    paddingVertical: 10,
  },
  scheduleDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  scheduleDetailView: {
    flexDirection: "row",
    alignItems: "center",
  },
  scheduleDetailIcon: {
    marginRight: 10,
    fontSize: 16,
  },
  eventDate: {
    marginRight: 10,
  },
  eventTime: {},
});
