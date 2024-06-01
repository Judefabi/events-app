import React, { createContext, useState, useEffect, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db, userRef } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [type, setType] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("type").then((value) => {
      if (value == null) {
        setType("attendee");
      } else {
        setType(value);
      }
    });
  }, [type]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      return { success: true, msg: response };
    } catch (error) {
      setLoading(false);
      let msg;
      switch (error.code) {
        case "auth/invalid-credential":
          msg = "Wrong username or password";
          break;
        case "auth/invalid-email":
          msg = "Invalid email address format";
          break;
        case "auth/weak-password":
          msg = "Password should be at least 6 characters long";
          break;
        default:
          msg = "Registration failed. Please try again later.";
      }
      return { success: false, msg: msg };
    }
  };

  const register = async (email, password, name, phone, type) => {
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(userRef, user?.uid), {
        name,
        email,
        phone,
        type,
        activeAs: type,
      });

      setLoading(false);
      return { success: true, data: user };
    } catch (error) {
      setLoading(false);
      let msg;
      switch (error.code) {
        case "auth/email-already-in-use":
          msg = "Email address is already in use";
          break;
        case "auth/invalid-email":
          msg = "Invalid email address format";
          break;
        case "auth/weak-password":
          msg = "Password should be at least 6 characters long";
          break;
        default:
          msg = "Registration failed. Please try again later.";
      }
      return { success: false, msg: msg };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, msg: error.message, error: e };
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, type, user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
