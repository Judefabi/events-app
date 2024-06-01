import React, { useState } from "react";
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
import moment from "moment";
import LoadingSkeleton from "../../../skeletons/Home/home";
import userProfile from "../../../models/userModel";
import { colors } from "../../../globals/colors";
import fevents from "../../../models/eventsModel";
import HorizontalCard from "../Components/HorizontalCard";
import VerticalCard from "../Components/VerticalCard";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEvents } from "../../../contexts/eventsContext";

const Home = () => {
  // const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { name, location, profileImage } = userProfile;
  // const [events, setEvents] = useState(fevents);

  const { events, loading } = useEvents();

  // console.log("events", events);

  const [searchInput, setSearchInput] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [isToday, setIsToday] = useState(true);

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

  if (loading) {
    return <LoadingSkeleton />;
  }

  const NoEventsHorizontalCard = () => (
    <View style={[styles.horizontalCard, styles.placeholderCard]}>
      <Text style={styles.placeholderText}>No events available.</Text>
    </View>
  );

  const NoEventsVerticalCard = () => (
    <View style={[styles.verticalCard, styles.placeholderCard]}>
      <Text style={styles.placeholderText}>No upcoming events.</Text>
    </View>
  );

  const today = moment().startOf("day");
  const tomorrow = moment().add(1, "day").startOf("day");

  const todayEvents = events.filter((item) =>
    moment(item.date, "DD/MM/YYYY").isSame(today, "day")
  );

  const tomorrowEvents = events.filter((item) =>
    moment(item.date, "DD/MM/YYYY").isSame(tomorrow, "day")
  );

  // console.log("Today's Events:", todayEvents);
  // console.log("Tomorrow's Events:", tomorrowEvents);

  const onViewAll = () => {
    navigation.navigate("Events", {
      events,
      featuredEvents: events,
      search: "",
    });
  };

  const onSearch = () => {
    navigation.navigate("Events", {
      events,
      featuredEvents: events,
      search: searchInput,
    });
  };

  const handlePopularSearchPress = (popular) => {
    console.log("popular", popular);
    // setSearchInput(name);
    // setIsSearch(false);
  };

  return (
    <ScrollView style={styles.mainContainer}>
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
        <TextInput
          style={styles.searchInputView}
          value={searchInput}
          placeholder="Search event"
          placeholderTextColor={colors.grey}
          onChangeText={(value) => setSearchInput(value)}
          onFocus={() => setIsSearch(true)}
          onBlur={() => setIsSearch(false)}
        />
        <TouchableOpacity onPress={onSearch} style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {isSearch ? (
        <View style={styles.popularView}>
          <Text style={styles.popularSearchTitle}>Popular searches:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {popularSearches.map((popular, index) => (
              <TouchableOpacity
                key={index}
                style={styles.popularPill}
                onPress={() => handlePopularSearchPress(popular)}>
                <Text style={styles.popularPillText}>{popular.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : null}
      <View style={styles.featuredEventsView}>
        <View style={styles.featuredEventsTitleView}>
          <Text style={styles.featuredEventsTitle}>Upcoming events</Text>
          <TouchableOpacity onPress={onViewAll} style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tabsView}>
          {todayEvents.length > 0 ? (
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
          ) : null}
          {tomorrowEvents.length > 0 ? (
            <TouchableOpacity
              onPress={() => setIsToday(false)}
              style={!isToday ? styles.tabButtonActive : styles.tabButton}>
              <Text
                style={
                  !isToday ? styles.tabButtonTextActive : styles.tabButtonText
                }>
                Tomorrow
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <ScrollView horizontal>
          {todayEvents.length > 0 && isToday ? (
            todayEvents?.length > 0 ? (
              todayEvents?.map((item, index) => (
                <HorizontalCard key={index} event={item} attending={false} />
              ))
            ) : null
          ) : tomorrowEvents?.length > 0 ? (
            tomorrowEvents?.map((item, index) => (
              <HorizontalCard key={index} event={item} />
            ))
          ) : (
            <NoEventsHorizontalCard />
          )}
        </ScrollView>
      </View>
      <View style={styles.otherEventsView}>
        <View style={styles.featuredEventsTitleView}>
          <Text style={styles.featuredEventsTitle}>
            You might be interested
          </Text>
          <TouchableOpacity onPress={onViewAll} style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.interestingEventsView}>
          {events?.length > 0 ? (
            events
              ?.slice(0, 3)
              .map((item, index) => <VerticalCard key={index} event={item} />)
          ) : (
            <NoEventsVerticalCard />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
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
  },
  searchInputView: {
    flex: 1,
    fontSize: 16,
  },
  searchButton: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: colors.green,
    borderRadius: 5,
  },
  searchButtonText: {
    color: colors.background,
    fontFamily: "medium",
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
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  popularPillText: {
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
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  tabButtonActive: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.green,
  },
  tabButtonText: {
    color: colors.grey,
  },
  tabButtonTextActive: {
    color: colors.green,
    fontFamily: "bold",
  },
  horizontalCard: {
    marginRight: 20,
  },
  placeholderCard: {
    backgroundColor: colors.line,
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: colors.text,
  },
  otherEventsView: {
    paddingVertical: 20,
  },
  interestingEventsView: {},
  verticalCard: {
    marginBottom: 20,
  },
});
