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
import { colors } from "../../../globals/colors";
import { useAuth } from "../../../contexts/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../../../contexts/userContext";
import { useNavigation } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();

const Profile = () => {
  const { userProfile } = useUser();
  const { logout } = useAuth();
  const navigation = useNavigation();

  if (!userProfile) {
    return null;
  }

  const { name, email, profileImage, bio, location, interests, socialLinks } =
    userProfile;

  const onLogOut = async () => {
    const response = await logout();
    if (!response.success) {
      Alert.alert("Logout Failed", response.msg);
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }
  };

  // const onSwitchUser = async () => {
  //   await AsyncStorage.setItem("type", "attendee");
  //   navigation.reset({
  //     index: 0,
  //     routes: [{ name: "Login" }],
  //   });
  // };
  const onSwitchUser = async () => {
    await AsyncStorage.setItem("type", "attendee");
    await AsyncStorage.setItem("switching", "true");
    handleAutoLogin();
  };

  const handleAutoLogin = async () => {
    try {
      AsyncStorage.getItem("type").then((value) => {
        navigation.reset({
          index: 0,
          routes: [
            { name: value === "creator" ? "Admin Stack" : "User Stack" },
          ],
        });
      });
    } catch (error) {
      console.log("Auto Login error: ", error);
      await AsyncStorage.removeItem("switching"); // Remove the switching flag if login fails
    }
  };

  const getInitials = (name) => {
    const nameArray = name.split(" ");
    const initials = nameArray.map((n) => n[0]).join("");
    return initials.toUpperCase();
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.profileHeader}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View style={styles.initialsContainer}>
            <Text style={styles.initialsText}>{getInitials(name)}</Text>
          </View>
        )}
        <Text style={styles.profileName}>{name}</Text>
        <Text style={styles.profileEmail}>{email}</Text>
        <Text style={styles.profileLocation}>{location}</Text>
        <Text style={styles.profileBio}>{bio}</Text>
        <View style={styles.interestsContainer}>
          {interests?.map((interest, index) => (
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
        <View style={{ paddingVertical: 20 }}>
          <TouchableOpacity onPress={onLogOut}>
            <Text>Log Out</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingVertical: 20 }}>
          <TouchableOpacity onPress={onSwitchUser}>
            <Text>Switch to Normal Account</Text>
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
    paddingTop: 100,
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
  initialsContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.text,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  initialsText: {
    color: colors.background,
    fontSize: 30,
    fontWeight: "bold",
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
