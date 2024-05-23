import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../globals/colors";
import Ionicons from "react-native-vector-icons/Ionicons";

const HorizontalCard = ({ event }) => {
  const { id, name, date, time, location, description, imageUrl, attendees } =
    event;

  return (
    <View style={styles.card}>
      <View style={styles.cardInnerView}>
        <View style={styles.imageView}>
          <Image style={styles.eventImage} source={{ uri: imageUrl }} />
          <View style={styles.imageOverlayView}>
            <View style={styles.joinEventButtonView}>
              <Text style={styles.joinEventButtonText}>Confirm Attending</Text>
            </View>
            <View style={styles.attendingView}>
              <Text style={styles.attendingViewNumber}>{attendees}</Text>
            </View>
          </View>
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

export default HorizontalCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    height: Dimensions.get("window").height * 0.3,
    width: Dimensions.get("window").width * 0.8,
    // backgroundColor: colors.google,
    marginRight: 10,
    marginLeft: 5,
    borderRadius: 10,
    padding: 10,
    elevation: 1,
    marginVertical: 10,
  },
  cardInnerView: {
    backgroundColor: colors.background,
    height: Dimensions.get("window").height * 0.18,
  },
  imageView: {
    height: Dimensions.get("window").height * 0.18,
    width: Dimensions.get("window").width * 0.8,
  },
  eventImage: {
    height: Dimensions.get("window").height * 0.18,
    width: Dimensions.get("window").width * 0.75,
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
    // backgroundColor: colors.line,
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
