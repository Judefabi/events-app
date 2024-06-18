import React, { createContext, useContext, useEffect, useState } from "react";
import {
  doc,
  setDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  deleteDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "./authContext";
import { eventsRef } from "../firebaseConfig";
import { useUser } from "./userContext";
import { useLocation } from "./locationContext";

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
  const { location } = useLocation();

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
        // createdAt: new Date(),
      };

      const eventDocRef = doc(eventsRef, uuidv4());
      await setDoc(eventDocRef, eventData);

      // Update local state with the new event
      setEvents((prevEvents) => [
        ...prevEvents,
        {
          id: eventId,
          // createdAt: new Date().toDateString(),
          ...eventData,
        },
      ]);

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

      // console.log(fetchedEvents.length);

      const currentDate = new Date();

      const parseDate = (dateString) => {
        const [day, month, year] = dateString.split("/");
        return new Date(year, month - 1, day);
      };

      // Filter out past events
      const upcomingEvents = fetchedEvents.filter(
        (event) => parseDate(event.date) > currentDate
      );

      // Sort events by proximity to user's location
      // if (location) {
      //   upcomingEvents.sort((a, b) => {
      //     const distanceA = calculateDistance(
      //       location.coords.latitude,
      //       location.coords.longitude,
      //       a.coordinates.lat,
      //       a.coordinates.lng
      //     );
      //     const distanceB = calculateDistance(
      //       location.coords.latitude,
      //       location.coords.longitude,
      //       b.coordinates.lat,
      //       b.coordinates.lng
      //     );
      //     return distanceA - distanceB;
      //   });
      // }

      setEvents(upcomingEvents);
    } catch (e) {
      console.log(e);
      alert("Failed to fetch events, sorry :(");
    } finally {
      setLoading(false);
    }
  };

  const confirmAttending = async (event) => {
    if (userLoading || !userProfile) {
      console.log("User profile is still loading or not available.");
      return;
    }

    setConfirming(true);
    const { id } = event;

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

      // Update local state immediately
      setEvents((prevEvents) =>
        prevEvents.map((evt) =>
          evt.id === id
            ? {
                ...evt,
                attendees: [
                  ...(evt.attendees || []),
                  {
                    userId: userId,
                    name: userProfile.name,
                    email: userProfile.email,
                    image: userProfile?.photoURL || "",
                  },
                ],
              }
            : evt
        )
      );
    } catch (error) {
      console.log(error);
    } finally {
      setConfirming(false);
    }
  };

  // Function to calculate distance between two coordinates
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Earth radius in km
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const deleteEvent = async (eventId) => {
    setLoading(true);
    try {
      await deleteDoc(doc(eventsRef, eventId));
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== eventId)
      );
      console.log("Event deleted successfully!");
    } catch (error) {
      console.error("Error deleting event:", error);
    } finally {
      setLoading(false);
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
        loading,
        confirmAttending,
        confirming,
        deleteEvent,
      }}>
      {children}
    </EventsContext.Provider>
  );
};

export default EventsProvider;
