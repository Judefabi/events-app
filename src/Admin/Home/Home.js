import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import LoadingSkeleton from "../../../skeletons/Home/home";
import { colors } from "../../../globals/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import events from "../../../models/eventsModel";
import adminProfile from "../../../models/adminModel";
import HorizontalCard from "../Components/HorizontalCard";
import VerticalCard from "../Components/VerticalCard";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { name, location, profileImage, email } = adminProfile;
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    const fetchedEvents = events.filter((event) => event.creator === email);
    setMyEvents(fetchedEvents);
  }, [email]);

  // console.log("events", myEvents);

  const [searchInput, setSearchInput] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [isToday, setIsToday] = useState(true);

  if (loading) {
    return <LoadingSkeleton />;
  }

  const createEvent = () => {
    navigation.navigate("Create Event");
  };

  const popularSearches = [
    {
      name: "Sauti Sol",
      id: 1,
    },
    {
      name: "GDG Nairobi",
      id: 2,
    },
    {
      name: "Rhumba",
      id: 3,
    },
    {
      name: "Bensoul",
      id: 4,
    },
  ];

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.topView}>
          <View style={styles.topLeft}>
            <Text style={styles.name}>Hey, {name}</Text>
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
            onFocus={() => setIsSearch(true)}
            onBlur={() => setIsSearch(false)}
          />
        </View>
        {isSearch ? (
          <View style={styles.popularView}>
            <Text style={styles.popularSearchTitle}>Popular searches:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {popularSearches.map((search, index) => (
                <View key={index} style={styles.popularPill}>
                  <Text style={styles.popularPillText}>{search.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        ) : null}
        <View style={styles.featuredEventsView}>
          <View style={styles.featuredEventsTitleView}>
            <Text style={styles.featuredEventsTitle}>My events</Text>
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
          <ScrollView horizontal>
            {myEvents.map((item, index) => (
              <HorizontalCard key={index} event={item} />
            ))}
          </ScrollView>
        </View>
        <View style={styles.otherEventsView}>
          <View style={styles.featuredEventsTitleView}>
            <Text style={styles.featuredEventsTitle}>Trending</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.interestingEventsView}>
            {events.map((item, index) => (
              <VerticalCard key={index} event={item} />
            ))}
            {/* <FlatList
            showsVerticalScrollIndicator={false}
            data={events}
            renderItem={({ item }) => <VerticalCard event={item} />}
            keyExtractor={(item) => item.id}
          /> */}
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={createEvent} style={styles.createEventButton}>
        <Text style={styles.createEventButtonText}>Create Event</Text>
      </TouchableOpacity>
    </View>
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
    fontSize: 24,
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
    borderWidth: 2,
    borderColor: colors.line,
    borderRadius: 10,
    marginVertical: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    // backgroundColor: colors.line,
  },
  searchInputView: {
    flex: 1,
    fontSize: 16,
  },
  inputIcons: {
    fontSize: 25,
    color: colors.text,
    marginRight: 10,
  },
  popularView: {
    flexDirection: "row",
  },
  popularSearchTitle: {
    color: colors.text,
  },
  popularPill: {
    backgroundColor: colors.line,
    marginLeft: 5,
    borderRadius: 10,
  },
  popularPillText: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    fontFamily: "medium",
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
    color: colors.green,
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
  featuredView: {
    paddingVertical: 20,
    flexDirection: "row",
  },
  createEventButton: {
    position: "absolute",
    bottom: 30,
    right: 10,
    backgroundColor: colors.text,
    width: Dimensions.get("window").width * 0.4,
    height: Dimensions.get("window").height * 0.06,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  createEventButtonText: {
    color: colors.background,
    fontSize: 16,
    fontFamily: "bold",
  },
});
