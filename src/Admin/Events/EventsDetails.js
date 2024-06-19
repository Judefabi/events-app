import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../globals/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEvents } from "../../../contexts/eventsContext";
import moment from "moment";

const EventsDetails = ({ route }) => {
  const navigation = useNavigation();
  const { isCreator } = route?.params;
  const { deleteEvent, confirmAttending, loading, confirming } = useEvents();
  const { attending } = route.params;
  const [isAttending, setIsAttending] = useState(attending);

  const {
    id,
    name,
    date,
    time,
    location,
    description,
    image,
    attendees,
    tags,
    tickets,
    isFreeEvent,
  } = route?.params?.event;

  const formatAttendeeCount = (count) => {
    if (count < 1000) {
      return `${count}`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(0)}k`;
    } else {
      return `${(count / 1000).toFixed(0).replace(".0", "")}k`;
    }
  };

  let ticketsAvailable;

  if (tickets) {
    ticketsAvailable = tickets?.reduce((total, ticket) => {
      return total + parseInt(ticket.quantity, 10);
    }, 0);
  }

  const onDeleteEvent = async (id) => {
    await deleteEvent(id);
    navigation.navigate("Home");
  };

  const onConfirmAttending = async () => {
    await confirmAttending(route.params.event);
    setIsAttending(true);
  };

  const getInitials = (name) => {
    const nameArray = name.split(" ");
    const initials = nameArray.map((n) => n[0]).join("");
    return initials.toUpperCase();
  };

  const formattedDate = moment(date, "MM/DD/YYYY").calendar(null, {
    sameDay: "[Today]",
    nextDay: "[Tomorrow]",
    nextWeek: "dddd",
    lastDay: "[Yesterday]",
    lastWeek: "[Last] dddd",
    sameElse: "DD/MM/YYYY",
  });

  const formattedTime = moment(time, "HH:mm").format("hh:mm A");

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 150 }}>
        <View style={styles.topView}>
          <View
            style={{
              flexDirection: "row",
            }}>
            <View style={styles.topViewNameView}>
              <Text style={styles.name}>{name}</Text>
              <Text>@ {location}</Text>
            </View>
            {/* {isCreator && (
              <View style={styles.editView}>
                <Text style={styles.editEventText}>Edit Event</Text>
              </View>
            )} */}
          </View>
          <View style={styles.topViewDetails}>
            <View style={styles.schedulingDetailsView}>
              <Text style={styles.scheduleText}>
                {formattedDate} <Text style={styles.strokes}>/</Text>{" "}
                {formattedTime}
                <Text style={styles.strokes}> /</Text>{" "}
                {attendees?.length > 0
                  ? formatAttendeeCount(attendees?.length)
                  : "0"}
                <Ionicons name="people" size={16} /> attending
              </Text>
            </View>
            <View style={styles.attendeesContainer}>
              {attendees?.slice(0, 4).map((attendee, index) => (
                <React.Fragment key={index}>
                  {attendee.image ? (
                    <Image
                      source={{ uri: attendee.image }}
                      style={[styles.attendeeImage, { marginLeft: -15 }]}
                    />
                  ) : (
                    <View
                      style={[styles.attendeeInitials, { marginLeft: -15 }]}>
                      <Text style={styles.initialsText}>
                        {getInitials(attendee.name)}
                      </Text>
                    </View>
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.imageView}>
          <Image
            style={styles.image}
            source={
              image !== null
                ? { uri: image }
                : {
                    uri: "https://firebasestorage.googleapis.com/v0/b/events-424620.appspot.com/o/events%2Felementor-placeholder-image.png?alt=media&token=805b3d96-1362-4ac8-8916-3e2d94406e70",
                  }
            }
          />
        </View>
        <View style={styles.descriptionView}>
          <Text style={styles.descriptionTitle}>DESCRIPTION</Text>
          <Text style={styles.description}>{description}</Text>
          <View style={{ flexDirection: "row" }}>
            {tags &&
              tags?.map((tag, index) => (
                <View style={styles.hashtagView} key={index}>
                  <Text style={styles.hashtagText}>#{tag}</Text>
                </View>
              ))}
          </View>
        </View>
        {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tags &&
            tags?.map((tag, index) => (
              <View style={styles.tagPill} key={index}>
                <Text style={styles.tagPillText}>{tag}</Text>
              </View>
            ))}
        </ScrollView> */}

        <View style={styles.mapView}>
          <Text>Map to go here</Text>
        </View>
      </ScrollView>
      <View style={styles.ticketsView}>
        <View style={styles.firstPartView}>
          {isFreeEvent ? (
            <Text style={styles.freeEventText}>Free Event</Text>
          ) : (
            <View>
              <View style={styles.ticketPriceView}>
                <Text style={styles.ticketDenom}>KES.</Text>
                <Text style={styles.ticketPrice}>{tickets[0]?.price}</Text>
                <Text style={styles.ticketDeligation}>
                  / {tickets[0]?.name}
                </Text>
              </View>
              <View style={styles.ticketsNumberView}>
                <Text style={styles.ticketRemainingNumber}>
                  {ticketsAvailable}
                </Text>
                <Text style={styles.ticketNumber}>
                  /{tickets[0]?.quantity} tickets remaining
                </Text>
              </View>
            </View>
          )}
        </View>
        {isCreator ? (
          <TouchableOpacity
            onPress={() => onDeleteEvent(id)}
            style={[styles.ticketsButton, { backgroundColor: colors.red }]}>
            {loading ? (
              <ActivityIndicator size="small" color={colors.background} />
            ) : (
              <Text style={styles.ticketsButtonText}>Delete Event</Text>
            )}
          </TouchableOpacity>
        ) : !isCreator && isAttending ? (
          <TouchableOpacity
            onPress={viewTicket}
            style={[styles.ticketsButton, { backgroundColor: colors.green }]}>
            <Text
              style={[styles.ticketsButtonText, { color: colors.background }]}>
              View Your Ticket
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={onConfirmAttending}
            style={styles.ticketsButton}>
            {confirming ? (
              <ActivityIndicator size="small" color={colors.background} />
            ) : (
              <Text style={styles.ticketsButtonText}>Confirm Attending</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default EventsDetails;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  },
  topView: {},
  topViewNameView: {
    paddingTop: 100,
    width: "50%",
  },
  name: {
    fontFamily: "bold",
    fontSize: 24,
  },
  topViewDetails: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editView: {
    flexDirection: "row",
    width: "50%",
    marginTop: 100,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  editIcon: {
    color: colors.red,
    fontSize: 25,
  },
  editEventText: {
    paddingHorizontal: 10,
    color: colors.background,
    fontSize: 18,
    fontFamily: "regular",
    backgroundColor: colors.button,
    paddingHorizontal: 20,
    borderRadius: 10,
    paddingVertical: 10,
  },

  schedulingDetailsView: {
    alignItems: "center",
  },
  scheduleText: {
    fontSize: 16,
    fontFamily: "regular",
    color: colors.text,
  },
  strokes: {
    fontFamily: "black",
    fontSize: 20,
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
  attendeeInitials: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.text,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: colors.grey,
  },
  initialsText: {
    color: colors.background,
    fontWeight: "bold",
  },
  moreAttendeesView: {
    backgroundColor: colors.background,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  moreAttendeesText: {
    fontWeight: "bold",
    color: colors.text,
    paddingHorizontal: 10,
  },
  imageView: {},
  image: {
    height: Dimensions.get("window").height * 0.4,
    borderRadius: 10,
    objectFit: "contain",
  },
  descriptionView: {
    paddingVertical: 20,
  },
  descriptionTitle: {
    fontFamily: "thin",
    fontSize: 16,
  },
  description: {
    fontFamily: "regular",
    lineHeight: 25,
  },
  eventTagsView: {
    paddingBottom: 10,
    flexDirection: "row",
  },
  tagPill: {
    marginHorizontal: 5,
    borderColor: colors.line,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.line,
  },
  tagPillText: {
    fontFamily: "regular",
  },
  mapView: {
    height: Dimensions.get("window").height * 0.3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.line,
    marginVertical: 10,
  },
  ticketsView: {
    position: "absolute",
    bottom: 30,
    left: 10,
    right: 10,
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  firstPartView: {},
  ticketPriceView: {
    flexDirection: "row",
    paddingVertical: 5,
    alignItems: "baseline",
  },
  ticketDenom: {
    fontFamily: "bold",
    fontSize: 16,
  },
  ticketPrice: {
    fontFamily: "black",
    fontSize: 26,
  },
  ticketDeligation: {
    fontFamily: "regular",
  },
  ticketsNumberView: {
    flexDirection: "row",
  },
  ticketRemainingNumber: {
    fontFamily: "bold",
    fontSize: 14,
  },
  ticketNumber: {
    fontSize: 14,
  },
  ticketsButton: {
    marginTop: 20,
    backgroundColor: colors.button,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  ticketsButtonText: {
    color: colors.background,
    fontFamily: "bold",
  },
  hashtagView: {},
  hashtagText: {
    color: "blue",
    fontFamily: "bold",
  },
});
