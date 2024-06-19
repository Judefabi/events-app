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
import { useUser } from "../../../contexts/userContext";
import moment from "moment";

const HorizontalCard = ({ event, feed }) => {
  const navigation = useNavigation();
  const { userProfile } = useUser();

  const {
    id,
    creatorId,
    name,
    date,
    time,
    location,
    description,
    image,
    attendees,
  } = event;

  const isCreator = userProfile?.uid === creatorId;

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
      isCreator,
      attending,
    });
  };

  const attending = attendees?.some(
    (attendee) => attendee.userId === userProfile?.uid
  );

  const onConfirmAttending = (id) => {
    console.log("confirmed", id);
  };

  const formatDate = (date) => {
    const formattedDate = moment(date, "MM/DD/YYYY").calendar(null, {
      sameDay: "[Today]",
      nextDay: "[Tomorrow]",
      nextWeek: "dddd",
      lastDay: "[Yesterday]",
      lastWeek: "[Last] dddd",
      sameElse: "DD/MM/YYYY",
    });
    return formattedDate;
  };

  const formatTime = (time) => {
    const formattedTime = moment(time, "HH:mm").format("hh:mm A");
    return formattedTime;
  };

  return (
    <TouchableOpacity
      onPress={onDetails}
      style={[
        styles.card,
        feed ? { width: Dimensions.get("window").width * 0.9 } : null,
      ]}>
      <View style={styles.cardInnerView}>
        <Image
          style={styles.eventImage}
          source={
            image !== null
              ? { uri: image }
              : {
                  uri: "https://firebasestorage.googleapis.com/v0/b/events-424620.appspot.com/o/events%2Felementor-placeholder-image.png?alt=media&token=805b3d96-1362-4ac8-8916-3e2d94406e70",
                }
          }
        />
      </View>
      <View style={styles.eventsDetailsView}>
        <Text style={styles.eventTitle}>{name}</Text>
        <View style={styles.scheduleDetails}>
          <View style={styles.scheduleDetailView}>
            <Ionicons
              style={styles.scheduleDetailIcon}
              name="calendar-clear-outline"
            />
            <Text style={styles.eventDate}>{formatDate(date)}</Text>
          </View>
          <View style={styles.scheduleDetailView}>
            <Ionicons style={styles.scheduleDetailIcon} name="time-outline" />
            <Text style={styles.eventTime}>{formatTime(time)}</Text>
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
    fontSize: 18,
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
