import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import VerticalCard from "../Components/VerticalCard";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { colors } from "../../../globals/colors";

const Tab = createMaterialTopTabNavigator();

const Events = ({ route }) => {
  const navigation = useNavigation();
  const { myEvents, events, search } = route.params;
  const [searchInput, setSearchInput] = useState(search || "");

  const filteredMyEvents = myEvents?.filter((event) =>
    event?.name?.toLowerCase().includes(searchInput.toLowerCase())
  );

  const filteredTrendingEvents = events?.filter((event) =>
    event?.name?.toLowerCase().includes(searchInput.toLowerCase())
  );

  const MyEventsScreen = () => (
    <View style={styles.tabContent}>
      <FlatList
        data={filteredMyEvents}
        renderItem={({ item }) => <VerticalCard event={item} />}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  const TrendingEventsScreen = () => (
    <View style={styles.tabContent}>
      <FlatList
        data={filteredTrendingEvents}
        renderItem={({ item }) => <VerticalCard event={item} />}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search events"
          value={searchInput}
          onChangeText={setSearchInput}
        />
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.text,
          tabBarInactiveTintColor: colors.grey,
          tabBarLabelStyle: {
            fontFamily: "bold",
            fontSize: 16,
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.text,
            height: 3,
          },
          tabBarStyle: {
            backgroundColor: colors.background,
            elevation: 0,
          },
        }}>
        <Tab.Screen name="My Events" component={MyEventsScreen} />
        <Tab.Screen name="Trending" component={TrendingEventsScreen} />
      </Tab.Navigator>
    </View>
  );
};

export default Events;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
    paddingTop: 100,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: colors.background,
    paddingVertical: 10,
  },
  searchIcon: {
    fontSize: 25,
    color: colors.text,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  tabContent: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: colors.background,
  },
  tabLabel: {
    fontFamily: "bold",
    fontSize: 16,
  },
  tabIndicator: {
    backgroundColor: colors.text,
    height: 3,
  },
  tabBar: {
    backgroundColor: colors.background,
    elevation: 0,
  },
});
