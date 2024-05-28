import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../../globals/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

const CreateEvent = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [isFreeEvent, setIsFreeEvent] = useState(false);
  const [image, setImage] = useState(null);
  const [eventName, setEventName] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const onNext = () => {
    const eventDetails = {
      image,
      name: eventName,
      category: eventCategory,
      date: date.toLocaleString()?.split(",")[0],
      time: date.toLocaleString()?.split(",")[1]?.slice(0, 6),
      description: eventDescription,
      isFreeEvent,
    };

    if (isFreeEvent) {
      const updatedEventDetails = { ...eventDetails, tickets: [] };
      navigation.navigate("Add Location", {
        eventDetails: updatedEventDetails,
      });
    } else {
      navigation.navigate("Add Tickets", { eventDetails });
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}>
        <TouchableOpacity
          onPress={pickImage}
          style={styles.uploadPictureButton}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <>
              <Ionicons
                style={styles.addIcon}
                name="add-circle-outline"
                size={50}
              />
              <Text style={styles.uploadPictureButtonText}>
                Upload a picture/poster/banner
              </Text>
              <Text style={styles.uploadPictureButtonDesc}>
                A captivating picture goes a long way to pushing your event
              </Text>
            </>
          )}
        </TouchableOpacity>
        <View style={styles.inputsView}>
          <View style={styles.eventInputView}>
            <TextInput
              style={styles.eventInput}
              placeholder="Event Name*"
              value={eventName}
              onChangeText={setEventName}
            />
          </View>
          <View style={styles.eventInputView}>
            <TextInput
              style={styles.eventInput}
              placeholder="Event Category*"
              value={eventCategory}
              onChangeText={setEventCategory}
            />
          </View>
          <View style={styles.splitEventInputView}>
            <View style={styles.eventInputViewSplit}>
              <TouchableOpacity
                onPress={showDatepicker}
                style={styles.eventInput}>
                <Text style={styles.dateTimeText}>
                  Date: {date.toLocaleString()?.split(",")[0]}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.eventInputViewSplit}>
              <TouchableOpacity
                onPress={showTimepicker}
                style={styles.eventInput}>
                <Text style={styles.dateTimeText}>
                  Time: {date.toLocaleString()?.split(",")[1]?.slice(0, 6)}
                </Text>
              </TouchableOpacity>
            </View>

            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
                minimumDate={new Date()}
              />
            )}
          </View>

          <View style={styles.eventInputView}>
            <TextInput
              style={styles.eventInput}
              placeholder="Description*"
              multiline
              numberOfLines={8}
              textAlignVertical="top"
              value={eventDescription}
              onChangeText={setEventDescription}
            />
          </View>
          <View style={styles.rememberView}>
            <TouchableOpacity
              style={styles.rememberButton}
              onPress={() => setIsFreeEvent(!isFreeEvent)}>
              {isFreeEvent ? (
                <Ionicons name="checkmark" style={styles.checkmarkIcon} />
              ) : null}
            </TouchableOpacity>
            <Text style={styles.rememberText}>This event is free</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={onNext}
          style={[styles.button, { backgroundColor: colors.button }]}>
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>
            {isFreeEvent ? "Add Location" : "Add Tickets"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CreateEvent;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  uploadPictureButton: {
    marginTop: 100,
    height: Dimensions.get("window").height * 0.25,
    backgroundColor: colors.line,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  uploadPictureButtonText: {
    color: colors.grey,
    fontSize: 16,
    paddingHorizontal: 20,
  },
  uploadPictureButtonDesc: {
    textAlign: "center",
    color: colors.grey,
    fontSize: 12,
    paddingHorizontal: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  addIcon: {
    color: colors.grey,
  },
  inputsView: {
    paddingVertical: 20,
  },
  eventInputView: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  eventInputViewSplit: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: "48%",
  },
  eventInput: {
    flex: 1,
    fontSize: 16,
  },
  dateTimeText: {
    fontSize: 16,
    color: colors.grey,
  },
  splitEventInputView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rememberView: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
  },
  rememberButton: {
    borderWidth: 1,
    borderRadius: 5,
    height: 25,
    width: 25,
    marginRight: 10,
    marginLeft: 10,
  },
  checkmarkIcon: {
    color: colors.green,
    fontSize: 20,
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
});
