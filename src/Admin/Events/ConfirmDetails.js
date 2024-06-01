import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../globals/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import SuccessModal from "../../../common/SuccessModal";
import { eventsRef, storage } from "../../../firebaseConfig";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useLoading } from "../../../contexts/loadingContext";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../../../contexts/authContext";

const ConfirmDetails = ({ route }) => {
  const navigation = useNavigation();
  const { eventDetails } = route.params;
  const { showLoader, hideLoader, showToast } = useLoading();
  const { user } = useAuth(user);

  const [isModalVisible, setModalVisible] = useState(false);
  const [uploading, setUploading] = useState(false);

  // const onCreateEvent = async () => {
  //   try {
  //     if (eventDetails.image) {
  //       const { image } = eventDetails;
  //       const uploadUrl = await uploadImageAsync(image);
  //       console.log(uploadUrl);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   } finally {
  //     setUploading(false);
  //   }
  // };

  // console.log("Event created with details:", user?.email);

  const onCreateEvent = async () => {
    try {
      setUploading(true);
      let uploadUrl = null;
      const eventId = uuidv4();

      if (eventDetails.image) {
        const { image } = eventDetails;
        uploadUrl = await uploadImageAsync(image, eventId);
      }

      const eventData = {
        ...eventDetails,
        image: uploadUrl,
        creatorId: user?.uid,
        creator: user?.email,
      };

      const eventDocRef = doc(eventsRef, uuidv4());
      await setDoc(eventDocRef, eventData);

      // setModalVisible(true);
      console.log("Event created with details:", eventData);
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    } finally {
      setUploading(false);
    }
  };

  async function uploadImageAsync(uri, eventId) {
    console.log("received", uri);
    setUploading(true);
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const fileRef = ref(getStorage(), `events/${eventId}`);
    const result = await uploadBytes(fileRef, blob);
    blob.close();
    return await getDownloadURL(fileRef);
  }

  const _maybeRenderUploadingOverlay = () => {
    if (uploading) {
      return (
        <View style={styles.uploadingOverlay}>
          <ActivityIndicator size="large" color={colors.green} />
        </View>
      );
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}>
        <View style={styles.imageContainer}>
          {eventDetails?.image ? (
            <Image source={{ uri: eventDetails?.image }} style={styles.image} />
          ) : (
            <Text>No image provided</Text>
          )}
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Event Details</Text>
          <Text style={styles.label}>Event Name:</Text>
          <Text style={styles.value}>{eventDetails?.name}</Text>

          <Text style={styles.label}>Category:</Text>
          <Text style={styles.value}>{eventDetails?.category}</Text>

          <Text style={styles.label}>Date and Time:</Text>
          <Text style={styles.value}>
            {eventDetails?.date?.toLocaleString()} {"  "}:{" "}
            {eventDetails?.time?.toLocaleString()}
          </Text>

          <Text style={styles.label}>Location:</Text>
          <Text style={styles.value}>{eventDetails?.location}</Text>

          <Text style={styles.label}>Description:</Text>
          <Text style={styles.value}>{eventDetails?.description}</Text>

          {eventDetails?.tickets?.length > 0 ? (
            <View>
              <Text style={styles.label}>Tickets:</Text>
              {eventDetails?.tickets?.map((ticket, index) => (
                <View key={index} style={styles.ticketContainer}>
                  <Text style={styles.ticketText}>
                    {ticket.name}: KES. {ticket.price}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
              }}>
              <Text style={styles.label}>Event is Free:</Text>
              <Ionicons
                name={
                  eventDetails?.isFreeEvent
                    ? "checkmark-circle"
                    : "close-circle"
                }
                style={styles.checkmarkIcon}
              />
            </View>
          )}
        </View>

        <TouchableOpacity
          onPress={onCreateEvent}
          style={[styles.button, { backgroundColor: colors.button }]}
          disabled={uploading}>
          {uploading ? (
            <ActivityIndicator size="large" color={colors.background} />
          ) : (
            <Text style={[styles.buttonText, { color: colors.buttonText }]}>
              Confirm and Create Event
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
      <SuccessModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default ConfirmDetails;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
    paddingTop: 100,
  },
  imageContainer: {
    marginTop: 20,
    height: Dimensions.get("window").height * 0.25,
    backgroundColor: colors.line,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  detailsContainer: {
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
    marginVertical: 5,
  },
  ticketContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  ticketText: {
    fontSize: 16,
  },
  checkmarkIcon: {
    fontSize: 20,
    color: colors.green,
    marginTop: 5,
  },
  button: {
    width: Dimensions.get("window").width * 0.9,
    alignSelf: "center",
    height: 50,
    marginVertical: 20,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 10,
    position: "absolute",
    bottom: 30,
    alignItems: "center",
  },
  buttonText: {
    alignSelf: "center",
    fontSize: 16,
  },
  uploadingOverlay: {
    position: "absolute",
    top: 70,
    left: 0,
    right: 10,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
