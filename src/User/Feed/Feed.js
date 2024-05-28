import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import HorizontalCard from "../Components/HorizontalCard";
import fevents from "../../../models/eventsModel";
import userProfile from "../../../models/userModel";
import { colors } from "../../../globals/colors";

const Feed = () => {
  const { id } = userProfile;
  // Filter events where the user is confirmed to attend
  const confirmedEvents = fevents.filter((event) =>
    event.attendees.some((attendee) => attendee.id === id)
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
