import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../../globals/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

const CreateEvent = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date(Date.now() + 12 * 60 * 60 * 1000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [isFreeEvent, setIsFreeEvent] = useState(false);
  const [image, setImage] = useState(null);
  const [eventName, setEventName] = useState("");
  const [eventTags, setEventTags] = useState([]);
  const [eventDescription, setEventDescription] = useState("");

  const [eventNameValid, setEventNameValid] = useState(true);
  const [eventTagsValid, setEventTagsValid] = useState(true);
  const [eventDescriptionValid, setEventDescriptionValid] = useState(true);
  const [tagInput, setTagInput] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
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

  const validateInputs = () => {
    let valid = true;
    if (eventName.trim() === "") {
      setEventNameValid(false);
      valid = false;
    } else {
      setEventNameValid(true);
    }
    if (eventTags.length === 0) {
      setEventTagsValid(false);
      valid = false;
    } else {
      setEventTagsValid(true);
    }
    if (eventDescription.trim() === "") {
      setEventDescriptionValid(false);
      valid = false;
    } else {
      setEventDescriptionValid(true);
    }
    return valid;
  };

  const addTag = () => {
    if (tagInput.trim() !== "") {
      setEventTags([...eventTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (index) => {
    const newTags = [...eventTags];
    newTags.splice(index, 1);
    setEventTags(newTags);
  };

  const onNext = () => {
    if (!validateInputs()) {
      return;
    }

    const eventDetails = {
      image,
      name: eventName,
      tags: eventTags,
      date: moment(date).format("MM/DD/YYYY"),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
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

  const minimumDate = new Date(Date.now() + 12 * 60 * 60 * 1000);

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
          <View
            style={[
              styles.eventInputView,
              !eventNameValid && { borderColor: colors.red },
            ]}>
            <TextInput
              style={styles.eventInput}
              placeholder="Event Name*"
              value={eventName}
              onChangeText={setEventName}
            />
          </View>
          <View
            style={[
              styles.eventInputView,
              !eventTagsValid && { borderColor: colors.red },
            ]}>
            <TextInput
              style={styles.eventInput}
              placeholder="Enter tags (press Enter to add)*"
              value={tagInput}
              onChangeText={setTagInput}
              onSubmitEditing={addTag}
            />
          </View>
          <FlatList
            data={eventTags}
            renderItem={({ item, index }) => (
              <View style={styles.tagContainer}>
                <Text style={styles.tag}>{item}</Text>
                <TouchableOpacity onPress={() => removeTag(index)}>
                  <Ionicons name="close-circle" size={20} color={colors.red} />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            style={styles.tagsList}
          />
          <View style={styles.splitEventInputView}>
            <View style={styles.eventInputViewSplit}>
              <TouchableOpacity
                onPress={showDatepicker}
                style={styles.eventInput}>
                <Text style={styles.dateTimeText}>
                  Date: {moment(date).format("MM/DD/YYYY")}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.eventInputViewSplit}>
              <TouchableOpacity
                onPress={showTimepicker}
                style={styles.eventInput}>
                <Text style={styles.dateTimeText}>
                  Time:{" "}
                  {date.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
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
                minimumDate={minimumDate}
              />
            )}
          </View>

          <View
            style={[
              styles.eventInputView,
              !eventDescriptionValid && { borderColor: colors.red },
            ]}>
            <TextInput
              style={styles.eventInput}
              placeholder="Description*"
              multiline
              numberOfLines={6}
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
    backgroundColor: colors.background,
    paddingTop: 90,
  },
  uploadPictureButton: {
    height: Dimensions.get("window").height * 0.25,
    backgroundColor: colors.line,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 20,
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
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: colors.grey,
    justifyContent: "center",
    alignItems: "center",
  },
  rememberText: {
    color: colors.text,
    fontSize: 12,
    paddingHorizontal: 10,
  },
  checkmarkIcon: {
    fontSize: 20,
    color: colors.button,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 15,
  },
  buttonText: {
    fontSize: 18,
  },
  tagContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.line,
    borderRadius: 10,
    padding: 5,
    marginRight: 5,
  },
  tag: {
    marginRight: 5,
  },
  tagsList: {
    marginVertical: 10,
  },
});
