import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import HorizontalCard from "../Components/HorizontalCard";
import fevents from "../../../models/eventsModel";
import adminProfile from "../../../models/adminModel";
import { colors } from "../../../globals/colors";

const Feed = () => {
  const { email } = adminProfile;
  //TODO:: Consider using id instead of email
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    const fetchedEvents = fevents.filter((event) => event.creator === email);
    setMyEvents(fetchedEvents);
  }, [email]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>My Events</Text>
      </View>
      <View style={styles.eventsContainer}>
        {myEvents.length > 0 ? (
          myEvents.map((event, index) => (
            <View key={index} style={styles.verticalCard}>
              <HorizontalCard event={event} feed={true} />
            </View>
          ))
        ) : (
          <Text style={styles.noEventsText}>No events created</Text>
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
