import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import googleicon from "../../assets/googleicon.png";
import { colors } from "../../globals/colors";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../../contexts/authContext";
import { useLocation } from "../../contexts/locationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ route }) => {
  const navigation = useNavigation();

  const { login, loading } = useAuth();
  const { location, errorMsg } = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [type, setType] = useState("");

  if (errorMsg) {
    Alert.alert("Location Error", errorMsg);
  }

  useEffect(() => {
    AsyncStorage.getItem("type").then((value) => {
      if (value == null) {
        setType("attendee");
      } else {
        setType(value);
      }
    });
  }, []);

  const validateEmail = (email) => {
    // Basic email validation
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePassword = (password) => {
    // Basic password validation (at least 6 characters)
    return password.length >= 6;
  };

  const handleLogin = async () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      setIsEmailValid(isEmailValid);
      setIsPasswordValid(isPasswordValid);
      return;
    }

    try {
      const response = await login(email, password);
      if (!response.success) {
        Alert.alert("Sign In", response.msg);
      }
    } catch (error) {
      console.log("Login error: ", error);
      // Handle login error (e.g., display error message)
    }
  };

  const onRegister = () => {
    navigation.navigate("Register");
  };

  const onGoogle = () => {
    // Implement Google login here
  };

  const onForgotPass = () => {
    navigation.navigate("Forgot Password");
  };

  return (
    <ScrollView
      style={[styles.mainContainer, { backgroundColor: colors.background }]}>
      <View style={styles.topView}>
        <Text style={[styles.pageTitle, { color: colors.text }]}>Login.</Text>
        <Text style={[styles.pageDescription, { color: colors.text }]}>
          Login to your account to explore events near you
        </Text>
      </View>
      <View
        style={[
          styles.loginInputCover,
          !isEmailValid && styles.loginInputCoverError,
        ]}>
        <Ionicons name="mail" style={styles.inputIcons} />
        <TextInput
          style={[
            styles.inputView,
            {
              borderBottomColor: isEmailValid ? colors.grey : colors.errorText,
              color: colors.card,
            },
          ]}
          value={email}
          placeholder="Email"
          placeholderTextColor={colors.grey}
          onChangeText={(value) => {
            setEmail(value);
            setIsEmailValid(true); // Reset error state on change
          }}
          onBlur={() => setIsEmailValid(validateEmail(email))}
        />
      </View>
      <View
        style={[
          styles.loginInputCover,
          !isPasswordValid && styles.loginInputCoverError,
        ]}>
        <Ionicons name="lock-closed" style={styles.inputIcons} />
        <TextInput
          style={[
            styles.inputView,
            {
              borderBottomColor: isPasswordValid
                ? colors.grey
                : colors.errorText,
              color: colors.card,
            },
          ]}
          secureTextEntry={!isPasswordVisible}
          value={password}
          placeholder="Password"
          placeholderTextColor={colors.grey}
          onChangeText={(value) => {
            setPassword(value);
            setIsPasswordValid(true); // Reset error state on change
          }}
          onBlur={() => setIsPasswordValid(validatePassword(password))}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Ionicons
            name={isPasswordVisible ? "eye-off" : "eye"}
            style={styles.inputIcons}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.userOptions}>
        <TouchableOpacity onPress={onForgotPass} style={styles.forgotView}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.navigationView}>
        <TouchableOpacity
          onPress={handleLogin}
          style={[
            styles.button,
            {
              backgroundColor: colors.button,
              opacity: isEmailValid && isPasswordValid ? 1 : 0.5,
            },
          ]}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color={colors.background} />
          ) : (
            <Text style={[styles.buttonText, { color: colors.buttonText }]}>
              Login
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={onRegister} style={styles.loginButton}>
          <Text style={[styles.loginButtonText, { color: colors.text }]}>
            Don't have an account?{" "}
            <Text style={styles.loginText}>Register</Text>
          </Text>
        </TouchableOpacity>
        <View style={styles.orView}>
          <View style={styles.sideLines} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.sideLines} />
        </View>
        <TouchableOpacity onPress={onGoogle} style={styles.googleButton}>
          <Image style={styles.googleImage} source={googleicon} />
          <Text style={[styles.buttonText, styles.googleButtonText]}>
            Continue with Google
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;

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
  loginInputCover: {
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
  loginInputCoverError: {
    borderColor: colors.red,
  },
  inputView: {
    flex: 1,
    fontSize: 16,
  },
  inputIcons: {
    fontSize: 25,
    color: colors.line,
    marginRight: 10,
  },
  userOptions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  forgotView: {},
  forgotText: {
    fontFamily: "bold",
    color: colors.red,
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
});
