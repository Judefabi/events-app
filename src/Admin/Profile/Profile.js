import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HorizontalCard from "../Components/HorizontalCard";
import userProfile from "../../../models/adminModel";
import events from "../../../models/eventsModel";
import { colors } from "../../../globals/colors";

const Tab = createMaterialTopTabNavigator();

const Profile = () => {
  const { name, email, profileImage, bio, location, interests, socialLinks } =
    userProfile;

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        <Text style={styles.profileName}>{name}</Text>
        <Text style={styles.profileEmail}>{email}</Text>
        <Text style={styles.profileLocation}>{location}</Text>
        <Text style={styles.profileBio}>{bio}</Text>
        <View style={styles.interestsContainer}>
          {interests.map((interest, index) => (
            <Text key={index} style={styles.interest}>
              {interest}
            </Text>
          ))}
        </View>
        <View style={styles.socialLinks}>
          <TouchableOpacity onPress={() => console.log("Open Twitter")}>
            <Ionicons name="logo-twitter" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Open LinkedIn")}>
            <Ionicons name="logo-linkedin" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Open Instagram")}>
            <Ionicons name="logo-instagram" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
    marginTop: 100,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontFamily: "bold",
    color: colors.text,
  },
  profileEmail: {
    fontSize: 16,
    color: colors.grey,
  },
  profileLocation: {
    fontSize: 16,
    fontFamily: "medium",
    color: colors.text,
  },
  profileBio: {
    fontSize: 14,
    fontFamily: "medium",
    color: colors.grey,
    textAlign: "center",
    marginVertical: 10,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 10,
  },
  interest: {
    backgroundColor: colors.line,
    padding: 5,
    borderRadius: 5,
    margin: 5,
    fontFamily: "medium",
    color: colors.text,
  },
  socialLinks: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
    marginTop: 10,
  },
  eventsContainer: {
    paddingHorizontal: 20,
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

export default Profile;
