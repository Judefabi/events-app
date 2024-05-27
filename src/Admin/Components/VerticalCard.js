import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../../globals/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const VerticalCard = ({ event }) => {
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
    navigation.navigate("Event Details");
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardInnerView}>
        <View style={styles.imageView}>
          <Image style={styles.eventImage} source={{ uri: imageUrl }} />
        </View>
      </View>
      <View style={styles.secondPart}>
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
        <View style={styles.attendeesContainer}>
          {attendees.slice(0, 2).map((attendee, index) => (
            <React.Fragment key={attendee.id}>
              <Image
                source={{ uri: attendee.image }}
                style={[styles.attendeeImage, { marginLeft: -15 }]}
              />
              {index === 1 && attendees.length > 2 && (
                <View style={[styles.moreAttendeesView, { marginLeft: -15 }]}>
                  <Text style={[styles.moreAttendeesText]}>
                    {formatAttendeeCount(attendees.length - 2)}
                  </Text>
                </View>
              )}
            </React.Fragment>
          ))}
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
  secondPart: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
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
  attendeesContainer: {
    flexDirection: "row",
    paddingVertical: 5,
    alignItems: "center",
    marginRight: 20,
  },
  attendeeImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: colors.background,
  },
  moreAttendeesView: {
    backgroundColor: colors.background,
    // width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  moreAttendeesText: {
    fontWeight: "bold",
    color: colors.text,
    // fontSize: 20,
    paddingHorizontal: 10,
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
