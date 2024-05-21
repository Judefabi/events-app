import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { fonts } from "../../globals/fonts";
import { useNavigation, useTheme } from "@react-navigation/native";

const Register = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [loading, setLoading] = useState(false);

  const onNext = () => {
    navigation.navigate("Login");
  };

  return (
    <View
      style={[styles.mainContainer, { backgroundColor: colors.background }]}>
      <View style={styles.topView}>
        <Text style={[styles.pageTitle, { color: colors.text }]}>
          Register.
        </Text>
        <Text style={[styles.pageDescription, { color: colors.text }]}>
          Enter your number and start having fun with our space.{" "}
        </Text>
      </View>
      <View style={styles.phoneNumberInputCover}>
        <TouchableOpacity style={styles.countryCodeView}>
          <Text style={[styles.countryCode, { color: colors.text }]}>+254</Text>
        </TouchableOpacity>
        <TextInput
          style={[
            styles.inputView,
            { borderBottomColor: colors.grey, color: colors.text },
          ]}
          placeholder="Phone Number"
          placeholderTextColor={colors.grey}
        />
      </View>
      <View style={styles.navigationView}>
        <TouchableOpacity
          // onPress={() => navigation.navigate('Email')}
          onPress={onNext}
          style={[styles.button, { backgroundColor: colors.button }]}>
          {loading && <ActivityIndicator color={colors.background} />}
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>
            Next
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.loginButton}>
          <Text style={[styles.loginButtonText, { color: colors.text }]}>
            Already have an account?<Text style={styles.loginText}> Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
    paddingVertical: 50,
  },
  pageTitle: {
    fontFamily: "bold",
    fontSize: 30,
  },
  pageDescription: {
    fontFamily: "regular",
  },
  inputViewCover: {
    marginVertical: 5,
  },
  inputView: {
    padding: 10,

    borderBottomWidth: 0.5,
    // backgroundColor: colors.line,
    width: Dimensions.get("window").width * 0.75,
    fontSize: 20,
  },
  phoneNumberInputCover: {
    flexDirection: "row",
    alignContent: "center",
  },
  countryCodeView: {
    justifyContent: "center",
    width: Dimensions.get("window").width * 0.2,
    alignItems: "center",
  },
  countryCode: {
    fontSize: 20,
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
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
  },
});
