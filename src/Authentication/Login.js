import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import googleicon from "../../assets/googleicon.png";
import { colors } from "../../globals/colors";

const Login = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isRemember, setIsRemember] = useState(false);

  console.log(isRemember);

  const onLogin = () => {
    navigation.navigate("Home Stack");
  };
  const onRegister = () => {
    navigation.navigate("Register");
  };

  const onGoogle = () => {};

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
          isEmail && styles.loginInputCoverActive,
        ]}>
        <Ionicons name="mail" style={styles.inputIcons} />
        <TextInput
          style={[
            styles.inputView,
            {
              borderBottomColor: colors.grey,
              color: colors.card,
            },
          ]}
          value={email}
          placeholder="Email"
          placeholderTextColor={colors.grey}
          onChangeText={(value) => {
            setEmail(value);
          }}
          onFocus={() => setIsEmail(true)}
          onBlur={() => setIsEmail(false)}
        />
      </View>
      <View
        style={[
          styles.loginInputCover,
          isPassword && styles.loginInputCoverActive,
        ]}>
        <Ionicons name="lock-closed" style={styles.inputIcons} />
        <TextInput
          style={[
            styles.inputView,
            { borderBottomColor: colors.grey, color: colors.card },
          ]}
          secureTextEntry={!isPasswordVisible}
          value={password}
          placeholder="Password"
          placeholderTextColor={colors.grey}
          onChangeText={(value) => {
            setPassword(value);
          }}
          onFocus={() => setIsPassword(true)}
          onBlur={() => setIsPassword(false)}
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
        {/* <View style={styles.rememberView}>
          <TouchableOpacity
            style={styles.rememberButton}
            onPress={() => setIsRemember(!isRemember)}>
            {isRemember ? (
              <Ionicons name="checkmark" style={styles.checkmarkIcon} />
            ) : null}
          </TouchableOpacity>
          <Text style={styles.rememberText}>Remember Me</Text>
        </View> */}
        <TouchableOpacity onPress={onForgotPass} style={styles.forgotView}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.navigationView}>
        <TouchableOpacity
          onPress={onLogin}
          style={[styles.button, { backgroundColor: colors.button }]}>
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onRegister} style={styles.loginButton}>
          <Text style={[styles.loginButtonText, { color: colors.text }]}>
            Don't have an account?
            <Text style={styles.loginText}> Register</Text>
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
  loginInputCoverActive: {
    borderBottomColor: colors.text,
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
  rememberView: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberButton: {
    borderWidth: 1,
    borderRadius: 5,
    height: 25,
    width: 25,
  },
  checkmarkIcon: {
    color: colors.green,
    fontSize: 20,
    fontFamily: "black",
  },
  rememberText: {
    marginHorizontal: 5,
    fontFamily: "bold",
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
