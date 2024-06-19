import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { colors } from "../../../globals/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import HorizontalCard from "../Components/HorizontalCard";
import VerticalCard from "../Components/VerticalCard";
import { useNavigation } from "@react-navigation/native";
import { useEvents } from "../../../contexts/eventsContext";
import { useUser } from "../../../contexts/userContext";
import LoadingSkeleton from "../../../skeletons/Home/home";
import { useLocation } from "../../../contexts/locationContext";

const Home = () => {
  const navigation = useNavigation();
  const { events, loading } = useEvents();
  const { userProfile } = useUser();
  const { location, errorMsg } = useLocation();

  // const [myEvents, setMyEvents] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const onSearch = () => {
    navigation.navigate("Events", {
      events,
      myEvents,
      search: searchInput,
    });
  };

  if (loading || !userProfile) {
    return <LoadingSkeleton />;
  }

  // console.log(events.length);

  const { uid, name, profileImage, email } = userProfile;

  const myEvents = events.filter((event) => event.creatorId === uid);
  // useEffect(() => {
  //   const fetchedEvents = events.filter((event) => event.creator === email);
  //   setMyEvents(fetchedEvents);
  // }, [email]);

  const createEvent = () => {
    navigation.navigate("Create Event");
  };

  const renderItem = ({ item }) => <HorizontalCard event={item} />;

  const onViewAll = () => {
    navigation.navigate("Events", {
      myEvents,
      events,
      search: "",
    });
  };

  const getInitials = (name) => {
    const nameArray = name?.split(" ");
    const initials = nameArray.map((n) => n[0]).join("");
    return initials.toUpperCase();
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.mainContainer}>
        <View style={styles.topView}>
          <View style={styles.topLeft}>
            <Text style={styles.name}>Hey, {name?.split(" ")[0] || ""}</Text>
            <View style={styles.locationView}>
              <Ionicons style={styles.locationIcon} name="location-sharp" />
              <Text style={styles.location}>Host</Text>
            </View>
          </View>
          <View style={styles.profileView}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
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
        <View style={styles.featuredEventsView}>
          <View style={styles.featuredEventsTitleView}>
            <Text style={styles.featuredEventsTitle}>My events</Text>
            <TouchableOpacity onPress={onViewAll} style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            data={myEvents}
            renderItem={renderItem}
            keyExtractor={(item) => item?.id?.toString()}
            snapToInterval={Dimensions.get("window").width * 0.7}
            decelerationRate="fast"
            contentContainerStyle={styles.flatListContentContainer}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.otherEventsView}>
          <View style={styles.featuredEventsTitleView}>
            <Text style={styles.featuredEventsTitle}>Trending</Text>
            <TouchableOpacity onPress={onViewAll} style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          {/* <FlatList
            style={{ paddingBottom: 150 }}
            data={events?.slice(0, 4)}
            keyExtractor={(item) => item?.id?.toString()}
            renderItem={({ item }) => <VerticalCard event={item} />}
            contentContainerStyle={styles.flatListTrendingContainer}
            showsVerticalScrollIndicator={false}
          /> */}
          <ScrollView>
            {events.slice(0, 5).map((event) => (
              <VerticalCard event={event} key={event?.id} />
            ))}
          </ScrollView>
        </View>
        <TouchableOpacity
          onPress={createEvent}
          style={styles.createEventButton}>
          <Text style={styles.createEventButtonText}>Create Event</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
    paddingBottom: 80,
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
  inputIcons: {
    fontSize: 25,
    color: colors.text,
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
    color: colors.green,
    fontFamily: "medium",
  },
  otherEventsView: {
    paddingVertical: 20,
    paddingBottom: 100,
  },
  flatListTrendingContainer: {
    paddingTop: 10,
    flexGrow: 1,
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
});
