import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import LoadingSkeleton from "../../skeletons/Home/home";
import userProfile from "../../models/userModel";
import { colors } from "../../globals/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import events from "../../models/eventsModel";
import HorizontalCard from "../Components/HorizontalCard";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const { name, location, profileImage } = userProfile;

  const [searchInput, setSearchInput] = useState("");
  const [isToday, setIsToday] = useState(true);

  console.log(isToday);

  if (loading) {
    return <LoadingSkeleton />;
  }
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.topView}>
        <View style={styles.topLeft}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.locationView}>
            <Ionicons style={styles.locationIcon} name="location-sharp" />
            <Text style={styles.location}>{location}</Text>
          </View>
        </View>
        <View style={styles.profileView}>
          <Image
            style={styles.profileImage}
            source={{
              uri: profileImage,
            }}
          />
        </View>
      </View>
      <View style={styles.searchInputCover}>
        <Ionicons name="search" style={styles.inputIcons} />
        <TextInput
          style={styles.searchInputView}
          value={searchInput}
          placeholder="Search event"
          placeholderTextColor={colors.grey}
          onChangeText={(value) => {
            setSearchInput(value);
          }}
        />
      </View>
      <View style={styles.featuredEventsView}>
        <View style={styles.featuredEventsTitleView}>
          <Text style={styles.featuredEventsTitle}>Upcoming events</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tabsView}>
          <TouchableOpacity
            onPress={() => setIsToday(true)}
            style={isToday ? styles.tabButtonActive : styles.tabButton}>
            <Text
              style={
                isToday ? styles.tabButtonTextActive : styles.tabButtonText
              }>
              Today
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsToday(false)}
            style={!isToday ? styles.tabButtonActive : styles.tabButton}>
            <Text
              style={
                !isToday ? styles.tabButtonTextActive : styles.tabButtonText
              }>
              Tomorow
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.featuredView}>
          {events.map((event, index) => {
            <HorizontalCard event={event} index={index} />;
          })}
        </View>
      </View>
      <View style={styles.otherEventsView}>
        <View style={styles.featuredEventsTitleView}>
          <Text style={styles.featuredEventsTitle}>
            You might be interested{" "}
          </Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.interestingEventsView}></View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  topView: {
    paddingTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topLeft: {},
  name: {
    color: colors.text,
    fontFamily: "black",
  },
  locationView: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: {
    color: colors.grey,
  },
  location: {
    color: colors.text,
    fontFamily: "thin",
  },
  profileView: {},
  profileImage: {
    height: 40,
    width: 40,
    borderRadius: 100,
  },
  searchInputCover: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    marginVertical: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchInputView: {
    flex: 1,
    fontSize: 16,
  },
  inputIcons: {
    fontSize: 25,
    color: colors.line,
    marginRight: 10,
  },
  featuredEventsView: {
    paddingVertical: 20,
  },
  featuredEventsTitleView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  featuredEventsTitle: {
    fontFamily: "bold",
    fontSize: 20,
  },
  viewAllButton: {},
  viewAllText: {
    color: colors.grey,
    fontFamily: "medium",
  },
  tabsView: {
    paddingVertical: 20,
    flexDirection: "row",
  },
  tabButton: {
    paddingVertical: 5,
    paddingHorizontal: 50,
  },
  tabButtonActive: {
    paddingVertical: 5,
    borderBottomWidth: 2,
    padding: 10,
    width: Dimensions.get("window").width * 0.4,
    alignItems: "center",
  },
  tabButtonText: {
    color: colors.grey,
    fontFamily: "thin",
    fontSize: 16,
  },
  tabButtonTextActive: {
    color: colors.text,
    fontFamily: "black",
    fontSize: 16,
  },
});
