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
import { eventsRef, userRef } from "../../../firebaseConfig";
import {
  arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useUser } from "../../../contexts/userContext";

const EventsDetails = ({ route }) => {
  const navigation = useNavigation();
  const { userProfile } = useUser();

  // console.log(userProfile);
  // route.params.event.attending = false;
  const [confirming, setConfirming] = useState(false);

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
    attending,
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

  let ticketAvailable;

  if (tickets) {
    ticketAvailable = tickets?.reduce((total, ticket) => {
      return total + parseInt(ticket.quantity, 10);
    }, 0);
  }

  const confirmAttending = async () => {
    setConfirming(true);
    // Add event to user's attending subcollection
    try {
      const userId = userProfile.uid;
      const userDocRef = doc(userRef, userId);
      const eventDocRef = doc(eventsRef, id);

      // Add event to user's attending subcollection
      await setDoc(doc(collection(userDocRef, "attendingEvents"), id), {
        eventId: id,
        name: name,
        date: date,
        time: time,
        location: location,
        description: description,
        image: image,
        tickets: tickets,
      });

      // Add user to event's attendees subcollection
      await setDoc(doc(collection(eventDocRef, "attendees"), userId), {
        userId: userId,
        name: userProfile.name,
        email: userProfile.email,
        image: userProfile?.photoURL || "",
        // tickets: tickets,
      });

      // Optionally, update the event's attendee count
      await updateDoc(eventDocRef, {
        attendees: arrayUnion(userId),
      });

      // Optionally, update the local state
      route.params.event.attending = true;
    } catch (error) {
      console.log(error);
    } finally {
      setConfirming(false);
    }
  };

  const viewTicket = () => {};

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 150 }}>
        <View style={styles.topView}>
          <View style={styles.topViewNameView}>
            <Text style={styles.name}>{name}</Text>
            <Text>@ {location}</Text>
          </View>
          <View style={styles.topViewDetails}>
            <View style={styles.schedulingDetailsView}>
              <Text style={styles.scheduleText}>
                {date} <Text style={styles.strokes}>/</Text> {time}
                <Text style={styles.strokes}> /</Text>{" "}
                {attendees && formatAttendeeCount(attendees?.length)}{" "}
                <Ionicons name="people" size={16} /> attending
              </Text>
            </View>
            <View style={styles.attendeesContainer}>
              {attendees?.slice(0, 4).map((attendee, index) => (
                <React.Fragment key={attendee.id}>
                  <Image
                    source={{ uri: attendee.image }}
                    style={[
                      styles.attendeeImage,
                      { marginLeft: index === 0 ? 0 : -15 },
                    ]}
                  />
                </React.Fragment>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.imageView}>
          <Image style={styles.image} source={{ uri: image }} />
        </View>
        <View style={styles.descriptionView}>
          <Text style={styles.descriptionTitle}>DESCRIPTION</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.eventTagsView}>
          {tags &&
            tags?.map((tag, index) => (
              <View style={styles.tagPill} key={index}>
                <Text style={styles.tagPillText}>{tag}</Text>
              </View>
            ))}
        </View>
        <View style={styles.mapView}>
          <Text>Map to go here</Text>
        </View>
      </ScrollView>
      <View style={styles.ticketsView}>
        <View style={styles.firstPartView}>
          <View style={styles.ticketPriceView}>
            <Text style={styles.ticketDenom}>KES.</Text>
            <Text style={styles.ticketPrice}>{tickets[0]?.price}</Text>
            <Text style={styles.ticketDeligation}>/ {tickets[0]?.name}</Text>
          </View>
          <View style={styles.ticketsNumberView}>
            <Text style={styles.ticketRemainingNumber}>{ticketAvailable}</Text>
            <Text style={styles.ticketNumber}>
              / {tickets[0]?.quantity} tickets remaining
            </Text>
          </View>
        </View>
        {!attending ? (
          <TouchableOpacity
            onPress={confirmAttending}
            style={styles.ticketsButton}>
            {confirming ? (
              <ActivityIndicator size="small" color={colors.background} />
            ) : (
              <Text style={styles.ticketsButtonText}>Confirm Attending</Text>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={viewTicket}
            style={[styles.ticketsButton, { backgroundColor: colors.green }]}>
            <Text
              style={[styles.ticketsButtonText, { color: colors.background }]}>
              View Your Ticket
            </Text>
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
    fontSize: 30,
  },
  topViewDetails: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    height: Dimensions.get("window").height * 0.3,
    borderRadius: 10,
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
});
