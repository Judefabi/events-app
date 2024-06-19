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
import { colors } from "../../../globals/colors";
import fevents from "../../../models/eventsModel";
import HorizontalCard from "../Components/HorizontalCard";
import VerticalCard from "../Components/VerticalCard";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEvents } from "../../../contexts/eventsContext";
import { useUser } from "../../../contexts/userContext";

const Home = () => {
  const navigation = useNavigation();
  const { events, loading } = useEvents();
  const { userProfile } = useUser();
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

  if (loading || !userProfile) {
    return <LoadingSkeleton />;
  }

  // console.log(userProfile);

  const { name, location, profileImage } = userProfile;

  const NoEventsHorizontalCard = () => (
    <View style={[styles.horizontalCard, styles.placeholderCard]}>
      <View style={styles.placeholderFirstView}>
        <Text style={styles.placeholderTitle}>No events today or tomorrow</Text>
        <Text style={styles.placeholderDescription}>
          We aim to keep you in the loop on all events happeing near you.
        </Text>
      </View>
      <View style={styles.placeholderSecondView}>
        <Image
          source={require("../../../assets/party.png")}
          style={styles.placeholderImage}
        />
      </View>
    </View>
  );

  const NoEventsVerticalCard = () => (
    <View style={[styles.verticalCard, styles.placeholderCard]}>
      <View style={styles.placeholderFirstView}>
        <Text style={styles.placeholderTitle}>Create and share</Text>
        <Text style={styles.placeholderDescription}>
          Becoe a host by creatinga n event with us.
          <Text
            style={{
              color: colors.green,
              fontFamily: "bold",
              paddingHorizontal: 5,
            }}>
            Click me to start!!
          </Text>
        </Text>
      </View>
      <View style={styles.placeholderSecondView}>
        <Image
          source={require("../../../assets/party.png")}
          style={styles.placeholderImage}
        />
      </View>
    </View>
  );

  const today = moment().startOf("day");
  const tomorrow = moment().add(1, "day").startOf("day");

  const todayEvents = events.filter((item) =>
    moment(item.date, "MM/DD/YYYY").isSame(today, "day")
  );

  const tomorrowEvents = events.filter((item) =>
    moment(item.date, "MM/DD/YYYY").isSame(tomorrow, "day")
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

  const getInitials = (name) => {
    const nameArray = name?.split(" ");
    const initials = nameArray.map((n) => n[0]).join("");
    return initials.toUpperCase();
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.topView}>
        <View style={styles.topLeft}>
          <Text style={styles.name}>Hey, {name?.split(" ")[0] || ""}</Text>
          <View style={styles.locationView}>
            <Ionicons style={styles.locationIcon} name="location-sharp" />
            <Text style={styles.location}>Attendee</Text>
          </View>
        </View>
        <View style={styles.profileView}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.initialsContainer}>
              <Text style={styles.initialsText}>{getInitials(name)}</Text>
            </View>
          )}
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
      {/* {isSearch ? (
        <View style={styles.popularView}>
          <Text style={styles.popularSearchTitle}>Popular searches:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {popularSearches.map((popular, index) => (
              <TouchableOpacity
                key={index}
                style={styles.popularPill}
                onPress={() => handlePopularSearchPress(popular)}>
                <Text style={styles.popularPillText}>{popular?.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : null} */}
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
  initialsContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: colors.text,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  initialsText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: "bold",
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
    flexDirection: "row",
    width: Dimensions.get("window").width * 0.9,
    marginVertical: 10,
  },
  placeholderText: {
    color: colors.text,
  },
  placeholderFirstView: {
    width: Dimensions.get("window").width * 0.55,
    marginHorizontal: 10,
  },
  placeholderTitle: {
    fontFamily: "bold",
    fontSize: 18,
    marginBottom: 5,
    color: colors.text,
  },
  placeholderDescription: {
    fontSize: 12,
    color: colors.grey,
  },
  placeholderSecondView: {
    width: Dimensions.get("window").width * 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderImage: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  otherEventsView: {
    paddingVertical: 20,
  },
  interestingEventsView: {},
  verticalCard: {
    marginBottom: 20,
  },
});
