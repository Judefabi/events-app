import React, { createContext, useState, useEffect, useContext } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, userRef } from "../firebaseConfig"; // Adjust the path as needed
import { useAuth } from "./authContext";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      if (user?.uid) {
        const userId = user.uid;
        const userDocRef = doc(userRef, userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserProfile({ ...userDoc.data(), uid: userId });
        } else {
          console.log("No such user!");
        }
        setLoading(false);
      }
    };

    fetchUser();
  }, [user]); // Add user as a dependency

  const updateUser = async (userData) => {
    try {
      const userId = user.uid;
      const userDocRef = doc(userRef, userId);
      await updateDoc(userDocRef, userData);
      setUserProfile((prev) => ({ ...prev, ...userData }));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <UserContext.Provider value={{ userProfile, updateUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
