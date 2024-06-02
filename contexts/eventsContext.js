import React, { createContext, useContext, useEffect, useState } from "react";
import {
  doc,
  setDoc,
  getDocs,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "./authContext";
import { eventsRef } from "../firebaseConfig";
import { useUser } from "./userContext";

const EventsContext = createContext();

export const useEvents = () => useContext(EventsContext);

const EventsProvider = ({ children }) => {
  const [uploading, setUploading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const storage = getStorage();
  const { user } = useAuth();
  const { userProfile, loading: userLoading } = useUser();

  const uploadImageAsync = async (uri, eventId) => {
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
    } catch (e) {
      console.log(e);
      alert("Event creation failed, sorry :(");
    } finally {
      setUploading(false);
    }
  };

  const fetchEvents = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const confirmAttending = async (event) => {
    if (userLoading || !userProfile) {
      console.log("User profile is still loading or not available.");
      return;
    }

    setConfirming(true);
    const { id, name, date, time, location, description, image, tickets } =
      event;

    try {
      const userId = userProfile.uid;
      const userDocRef = doc(eventsRef, id);

      await updateDoc(userDocRef, {
        attendees: arrayUnion({
          userId: userId,
          name: userProfile.name,
          email: userProfile.email,
          image: userProfile?.photoURL || "",
        }),
      });

      setEvents((prevEvents) =>
        prevEvents.map((evt) =>
          evt.id === id ? { ...evt, attending: true } : evt
        )
      );
    } catch (error) {
      console.log(error);
    } finally {
      setConfirming(false);
    }
  };

  return (
    <EventsContext.Provider
      value={{
        onCreateEvent,
        uploading,
        modalVisible,
        setModalVisible,
        fetchEvents,
        events,
        loading,
        confirmAttending,
        confirming,
      }}>
      {children}
    </EventsContext.Provider>
  );
};

export default EventsProvider;
