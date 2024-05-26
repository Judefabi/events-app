import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../globals/colors";
import Ionicons from "react-native-vector-icons/Ionicons";

const VerticalCard = ({ event }) => {
  const { id, name, date, time, location, description, imageUrl, attendees } =
    event;

  return (
    <View style={styles.card}>
      <View style={styles.cardInnerView}>
        <View style={styles.imageView}>
          <Image style={styles.eventImage} source={{ uri: imageUrl }} />
        </View>
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
    </View>
  );
};

export default VerticalCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: 10,
    paddingVertical: 10,
    marginVertical: 10,
    flexDirection: "row",
    elevation: 0.5,
  },
  cardInnerView: {
    backgroundColor: colors.line,
  },
  imageView: {
    height: Dimensions.get("window").width * 0.2,
    width: Dimensions.get("window").width * 0.2,
  },
  eventImage: {
    height: Dimensions.get("window").width * 0.2,
    width: Dimensions.get("window").width * 0.2,
    borderRadius: 10,
  },
  imageOverlayView: {
    position: "absolute",
    bottom: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: Dimensions.get("window").width * 0.7,
  },
  joinEventButtonView: {
    backgroundColor: colors.grey,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  joinEventButtonText: {
    color: colors.background,
  },
  attendingView: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  attendingViewNumber: {
    color: colors.background,
    fontFamily: "black",
  },
  eventsDetailsView: {
    paddingHorizontal: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontFamily: "medium",
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
