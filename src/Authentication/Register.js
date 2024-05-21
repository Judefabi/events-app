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
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import googleicon from "../../assets/googleicon.png";
import { colors } from "../../globals/colors";

const Register = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [isName, setIsName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const onNext = () => {
    navigation.navigate("Login");
  };

  return (
    <ScrollView
      style={[styles.mainContainer, { backgroundColor: colors.background }]}>
      <View style={styles.topView}>
        <Text style={[styles.pageTitle, { color: colors.text }]}>
          Register.
        </Text>
        <Text style={[styles.pageDescription, { color: colors.text }]}>
          Enter your details and start having fun with our events space.
        </Text>
      </View>

      <View style={[styles.inputCover, isName && styles.inputCoverActive]}>
        <Ionicons name="person" style={styles.inputIcon} />
        <TextInput
          style={[
            styles.inputView,
            { borderBottomColor: colors.grey, color: colors.text },
          ]}
          value={name}
          placeholder="Enter your Name"
          placeholderTextColor={colors.border}
          onChangeText={(value) => setName(value)}
          onFocus={() => setIsName(true)}
          onBlur={() => setIsName(false)}
        />
      </View>

      <View style={[styles.inputCover, isEmail && styles.inputCoverActive]}>
        <Ionicons name="mail" style={styles.inputIcon} />
        <TextInput
          style={[
            styles.inputView,
            { borderBottomColor: colors.grey, color: colors.text },
          ]}
          value={email}
          placeholder="Enter your Email"
          placeholderTextColor={colors.border}
          onChangeText={(value) => setEmail(value)}
          onFocus={() => setIsEmail(true)}
          onBlur={() => setIsEmail(false)}
        />
      </View>

      <View style={[styles.inputCover, isPhone && styles.inputCoverActive]}>
        <Ionicons name="call" style={styles.inputIcon} />
        <TextInput
          style={[
            styles.inputView,
            { borderBottomColor: colors.grey, color: colors.text },
          ]}
          value={phone}
          placeholder="Enter Phone Number"
          placeholderTextColor={colors.grey}
          onChangeText={(value) => setPhone(value)}
          onFocus={() => setIsPhone(true)}
          onBlur={() => setIsPhone(false)}
        />
      </View>

      <View style={[styles.inputCover, isPassword && styles.inputCoverActive]}>
        <Ionicons name="lock-closed" style={styles.inputIcon} />
        <TextInput
          style={[
            styles.inputView,
            { borderBottomColor: colors.grey, color: colors.card },
          ]}
          secureTextEntry={!isPasswordVisible}
          value={password}
          placeholder="Enter Password"
          placeholderTextColor={colors.grey}
          onChangeText={(value) => setPassword(value)}
          onFocus={() => setIsPassword(true)}
          onBlur={() => setIsPassword(false)}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Ionicons
            name={isPasswordVisible ? "eye-off" : "eye"}
            style={styles.inputIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.navigationView}>
        <TouchableOpacity
          onPress={onNext}
          style={[styles.button, { backgroundColor: colors.button }]}>
          {loading && <ActivityIndicator color={colors.background} />}
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>
            Register
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.loginButton}>
          <Text style={[styles.loginButtonText, { color: colors.text }]}>
            Already have an account?<Text style={styles.loginText}> Login</Text>
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
      </View>
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
});
