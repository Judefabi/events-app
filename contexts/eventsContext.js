import React, { createContext, useContext, useEffect, useState } from "react";
import {
  doc,
  setDoc,
  collection,
  getFirestore,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "./authContext";
import { eventsRef } from "../firebaseConfig";

const EventsContext = createContext();

export const useEvents = () => useContext(EventsContext);

const EventsProvider = ({ children }) => {
  const [uploading, setUploading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [events, setEvents] = useState([]);

  const storage = getStorage();
  const { user } = useAuth();

  const uploadImageAsync = async (uri, eventId) => {
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

    const fileRef = ref(storage, `events/${eventId}`);
    const result = await uploadBytes(fileRef, blob);
    blob.close();
    return await getDownloadURL(fileRef);
  };

  const onCreateEvent = async (eventDetails) => {
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
        createdAt: new Date(),
      };

      const eventDocRef = doc(eventsRef, uuidv4());
      await setDoc(eventDocRef, eventData);

      setModalVisible(true);
      console.log("Event created with details:", eventData);
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    } finally {
      setUploading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      const querySnapshot = await getDocs(eventsRef);
      const fetchedEvents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(fetchedEvents);
    } catch (e) {
      console.log(e);
      alert("Failed to fetch events, sorry :(");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventsContext.Provider
      value={{
        onCreateEvent,
        uploading,
        modalVisible,
        setModalVisible,
        fetchEvents,
        events,
      }}>
      {children}
    </EventsContext.Provider>
  );
};

export default EventsProvider;
