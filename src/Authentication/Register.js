import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import googleicon from "../../assets/googleicon.png";
import { colors } from "../../globals/colors";
import { useAuth } from "../../contexts/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = ({ route }) => {
  const navigation = useNavigation();
  const { register, loading } = useAuth();

  const [type, setType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("type").then((value) => {
      if (value == null) {
        setType("attendee");
      } else {
        setType(value);
      }
    });
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateFields = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError("Name is required");
      isValid = false;
    } else {
      setNameError(null);
    }

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email address");
      isValid = false;
    } else {
      setEmailError(null);
    }

    if (!phone.trim()) {
      setPhoneError("Phone number is required");
      isValid = false;
    } else {
      setPhoneError(null);
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      isValid = false;
    } else {
      setPasswordError(null);
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Confirm Password is required");
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmPasswordError(null);
    }

    return isValid;
  };

  const handleRegister = async () => {
    if (!validateFields()) {
      return;
    }

    try {
      let response = await register(email, password, name, phone, type);
      console.log(response);
      if (!response.success) {
        Alert.alert("Sign Up", response.msg);
      }
      // navigation.navigate("Login", { userData: route.params });
    } catch (error) {
      console.log("Registration error: ", error);
    }
  };

  const onLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <ScrollView
      style={[styles.mainContainer, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled">
      <View style={styles.topView}>
        <Text style={[styles.pageTitle, { color: colors.text }]}>
          Register.
        </Text>
        <Text style={[styles.pageDescription, { color: colors.text }]}>
          Enter your details and start having fun with our events space.
        </Text>
      </View>

      <View style={[styles.inputCover, nameError && styles.inputCoverError]}>
        <Ionicons name="person" style={styles.inputIcon} />
        <TextInput
          style={[styles.inputView, { color: colors.text }]}
          value={name}
          placeholder="Name"
          placeholderTextColor={colors.border}
          onChangeText={(value) => setName(value)}
        />
      </View>
      {nameError && <Text style={styles.errorText}>{nameError}</Text>}

      <View style={[styles.inputCover, emailError && styles.inputCoverError]}>
        <Ionicons name="mail" style={styles.inputIcon} />
        <TextInput
          style={[styles.inputView, { color: colors.text }]}
          value={email}
          placeholder="Email"
          placeholderTextColor={colors.border}
          onChangeText={(value) => setEmail(value)}
        />
      </View>
      {emailError && <Text style={styles.errorText}>{emailError}</Text>}

      <View style={[styles.inputCover, phoneError && styles.inputCoverError]}>
        <Ionicons name="call" style={styles.inputIcon} />
        <TextInput
          style={[styles.inputView, { color: colors.text }]}
          value={phone}
          placeholder="Phone Number"
          placeholderTextColor={colors.grey}
          onChangeText={(value) => setPhone(value)}
        />
      </View>
      {phoneError && <Text style={styles.errorText}>{phoneError}</Text>}

      <View
        style={[styles.inputCover, passwordError && styles.inputCoverError]}>
        <Ionicons name="lock-closed" style={styles.inputIcon} />
        <TextInput
          style={[styles.inputView, { color: colors.card }]}
          secureTextEntry={!showPassword}
          value={password}
          placeholder="Password"
          placeholderTextColor={colors.grey}
          onChangeText={(value) => setPassword(value)}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.iconButton}>
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color={colors.text}
          />
        </TouchableOpacity>
      </View>
      {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

      <View
        style={[
          styles.inputCover,
          confirmPasswordError && styles.inputCoverError,
        ]}>
        <Ionicons name="lock-closed" style={styles.inputIcon} />
        <TextInput
          style={[styles.inputView, { color: colors.card }]}
          secureTextEntry={!showPassword}
          value={confirmPassword}
          placeholder="Confirm Password"
          placeholderTextColor={colors.grey}
          onChangeText={(value) => setConfirmPassword(value)}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.iconButton}>
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color={colors.text}
          />
        </TouchableOpacity>
      </View>
      {confirmPasswordError && (
        <Text style={styles.errorText}>{confirmPasswordError}</Text>
      )}

      <TouchableOpacity
        onPress={handleRegister}
        style={[styles.button, { backgroundColor: colors.button }]}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color={colors.background} />
        ) : (
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>
            Register
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={onLogin} style={styles.loginButton}>
        <Text style={[styles.loginButtonText, { color: colors.text }]}>
          Already have an account? <Text style={styles.loginText}>Login</Text>
        </Text>
      </TouchableOpacity>

      <View style={styles.orView}>
        <View style={styles.sideLines} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.sideLines} />
      </View>

      <TouchableOpacity style={styles.googleButton}>
        <Image style={styles.googleImage} source={googleicon} />
        <Text style={[styles.buttonText, styles.googleButtonText]}>
          Continue with Google
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  topView: {
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },
  pageTitle: {
    fontFamily: "bold",
    fontSize: 30,
  },
  pageDescription: {
    fontFamily: "regular",
    fontSize: 16,
    marginTop: 10,
  },
  inputCover: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  inputCoverError: {
    borderColor: colors.red,
  },
  inputCoverActive: {
    borderBottomColor: colors.text,
  },
  inputView: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  inputIcon: {
    fontSize: 25,
    color: colors.line,
  },
  button: {
    width: Dimensions.get("window").width * 0.9,
    alignSelf: "center",
    height: 50,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
  },
  loginButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  loginButtonText: {
    fontFamily: "regular",
  },
  loginText: {
    fontFamily: "bold",
  },
  navigationView: {
    marginTop: 30,
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  orView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  sideLines: {
    height: 1,
    backgroundColor: colors.line,
    flex: 1,
    marginHorizontal: 20,
  },
  orText: {
    fontFamily: "bold",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.google,
    width: Dimensions.get("window").width * 0.9,
    alignSelf: "center",
    height: 50,
    borderRadius: 10,
    marginTop: 10,
  },
  googleImage: {
    height: 40,
    width: 40,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 16,
    fontFamily: "medium",
    color: colors.text,
  },
  errorText: {
    color: colors.red,
    fontSize: 8,
    paddingHorizontal: 20,
  },
});
