import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { fonts } from "../../globals/fonts";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../globals/colors";

const Email = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [isEmail, setIsEmail] = useState(false);

  const onConfirm = () => {
    navigation.navigate("Login");
  };

  return (
    <View
      style={[styles.mainContainer, { backgroundColor: colors.background }]}>
      <View style={styles.topView}>
        <Text style={[styles.pageTitle, { color: colors.text }]}>
          Forgot Password.
        </Text>
        <Text style={[styles.pageDescription, { color: colors.text }]}>
          Enter your email to reset password
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
          placeholder="Enter Email"
          placeholderTextColor={colors.grey}
          onChangeText={(value) => {
            setEmail(value);
          }}
          onFocus={() => setIsEmail(true)}
          onBlur={() => setIsEmail(false)}
        />
      </View>
      <View style={styles.navigationView}>
        <TouchableOpacity
          onPress={onConfirm}
          style={[styles.button, { backgroundColor: colors.button }]}>
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>
            Confirm
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.loginButton}>
          <Text style={[styles.loginButtonText, { color: colors.text }]}>
            Go back?<Text style={styles.loginText}> Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Email;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  topView: {
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingVertical: 20,
  },
  pageTitle: {
    fontFamily: "bold",
    fontSize: 30,
  },
  pageDescription: {
    fontFamily: "regular",
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
  emailInputCover: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  button: {
    width: Dimensions.get("window").width * 0.9,
    alignSelf: "center",

    height: 50,
    marginVertical: 20,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonText: {
    alignSelf: "center",
    fontSize: 16,
  },
  loginButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
});
