import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import HorizontalCard from "../Components/HorizontalCard";
import fevents from "../../../models/eventsModel";
import { colors } from "../../../globals/colors";
import { useUser } from "../../../contexts/userContext";
import { useEvents } from "../../../contexts/eventsContext";
import MainLoadingIndicator from "../../../common/MainIndicator";

const Feed = () => {
  const { userProfile } = useUser();

  // console.log("id", userProfile);
  const { events, loading } = useEvents();

  if (loading || !userProfile?.uid) {
    return <MainLoadingIndicator />;
  }

  // Filter events where the user is confirmed to attend
  const confirmedEvents = events.filter((event) =>
    event?.attendees?.some((attendee) => attendee.userId === userProfile?.uid)
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Confirmed Events</Text>
      </View>
      <View style={styles.eventsContainer}>
        {confirmedEvents.length > 0 ? (
          confirmedEvents.map((event, index) => (
            <View key={index} style={styles.verticalCard}>
              <HorizontalCard event={event} attending={true} />
            </View>
          ))
        ) : (
          <Text style={styles.noEventsText}>No confirmed events</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
    marginTop: 50,
  },
  titleContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  title: {
    fontSize: 20,
    fontFamily: "bold",
    color: colors.text,
  },
  eventsContainer: {
    // paddingHorizontal: 20,
    marginTop: 20,
  },
  verticalCard: {
    marginBottom: 20,
  },
  noEventsText: {
    fontSize: 16,
    fontFamily: "medium",
    color: colors.grey,
    textAlign: "center",
    marginTop: 20,
  },
});

export default Feed;
