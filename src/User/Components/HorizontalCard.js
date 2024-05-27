import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../globals/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

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
        <View style={styles.imageOverlayView}>
          <TouchableOpacity
            onPress={() => onConfirmAttending(id)}
            style={styles.joinEventButtonView}>
            <Text style={styles.joinEventButtonText}>Confirm Attending</Text>
          </TouchableOpacity>
          <View style={styles.attendeesContainer}>
            {attendees.slice(0, 3).map((attendee, index) => (
              <React.Fragment key={attendee.id}>
                <Image
                  source={{ uri: attendee.image }}
                  style={[styles.attendeeImage, { marginLeft: -15 }]}
                />
                {index === 2 && attendees.length > 3 && (
                  <View style={[styles.moreAttendeesView, { marginLeft: -15 }]}>
                    <Text style={[styles.moreAttendeesText]}>
                      {formatAttendeeCount(attendees.length - 3)}
                    </Text>
                  </View>
                )}
              </React.Fragment>
            ))}
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
  },
  eventImage: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
  },
  imageOverlayView: {
    position: "absolute",
    bottom: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  joinEventButtonView: {
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: "center",
  },
  joinEventButtonText: {
    color: colors.text,
    fontFamily: "black",
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
