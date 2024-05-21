import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { fonts } from "../../globals/fonts";

const Login = ({ route }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [pinArray, setPinArray] = useState([]);
  const [firstFilled, setFirstFilled] = useState(false);
  const [secondFilled, setSecondFilled] = useState(false);
  const [thirdFilled, setThirdFilled] = useState(false);
  const [fourthFilled, setFourthFilled] = useState(false);
  const [count, setCount] = useState(0);
  const [pinError, setPinError] = useState(false);

  const PIN = pinArray.join("");

  const signIn = () => {
    if (pinArray.length === 4) {
      //pin logic
      navigation.navigate("Bottom");
    }
  };

  const pushToArray = (value) => {
    if (value !== "00") {
      if (pinArray.length >= 0 && pinArray.length <= 3) {
        setCount(count + 1);
        if (count === 0) {
          setFirstFilled(true);
        } else if (count === 1) {
          setSecondFilled(true);
        } else if (count === 2) {
          setThirdFilled(true);
        } else if (count === 3) {
          setFourthFilled(true);
        }
        pinArray.push(value);
        console.log(pinArray);
      } else {
        console.log("Cant go past", pinArray.length);
      }
    } else {
      if (pinArray.length >= 1 && pinArray.length <= 4) {
        pinArray.pop();
        setPinError(false);
        setCount(count - 1);
        if (count === 1) {
          setFirstFilled(false);
        } else if (count === 2) {
          setSecondFilled(false);
        } else if (count === 3) {
          setThirdFilled(false);
        } else if (count === 4) {
          setFourthFilled(false);
        }
        console.log("Array after deletion", pinArray);
      } else {
        console.log("Cant go past", pinArray.length);
      }
    }
  };

  return (
    <ScrollView
      style={[styles.mainContainer, { backgroundColor: colors.background }]}>
      <View style={styles.topView}>
        <Text style={[styles.pageTitle, { color: colors.text }]}>Login.</Text>
        <Text style={[styles.pageDescription, { color: colors.text }]}>
          Input yur four-digt PIN to continue. Take a dive into the world of
          fiancial inclusion
        </Text>
      </View>
      {pinError ? (
        <View>
          <Text style={[styles.errorText, { color: colors.red }]}>
            Enter a four digit PIN to continue
          </Text>
          <View style={styles.mainInputView}>
            {[...Array(4)].map((index) => {
              return (
                <View
                  key={index}
                  style={[styles.outerCircle, { borderColor: colors.line }]}>
                  <View
                    key={index}
                    style={[
                      styles.errorCircle,
                      { backgroundColor: colors.red },
                    ]}></View>
                </View>
              );
            })}
          </View>
        </View>
      ) : (
        <View style={styles.mainInputView}>
          <View style={[styles.outerCircle, { borderColor: colors.line }]}>
            <Text style={[styles.inputNumber, { color: colors.text }]}>
              {pinArray[0]}
            </Text>
          </View>
          <View style={[styles.outerCircle, { borderColor: colors.line }]}>
            <Text style={[styles.inputNumber, { color: colors.text }]}>
              {pinArray[1]}
            </Text>
          </View>
          <View style={[styles.outerCircle, { borderColor: colors.line }]}>
            <Text style={[styles.inputNumber, { color: colors.text }]}>
              {pinArray[2]}
            </Text>
          </View>
          <View style={[styles.outerCircle, { borderColor: colors.line }]}>
            <Text style={[styles.inputNumber, { color: colors.text }]}>
              {pinArray[3]}
            </Text>
          </View>
        </View>
      )}

      <View style={styles.keyBoardView}>
        <View style={styles.keyboardRowView}>
          <TouchableOpacity
            style={[styles.keyButton, { borderBottomColor: colors.line }]}
            onPress={() => pushToArray("1")}>
            <Text style={[styles.keyButtonText, { color: colors.text }]}>
              1
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.keyButton, { borderBottomColor: colors.line }]}
            onPress={() => pushToArray("2")}>
            <Text style={[styles.keyButtonText, { color: colors.text }]}>
              2
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.keyButton, { borderBottomColor: colors.line }]}
            onPress={() => pushToArray("3")}>
            <Text style={[styles.keyButtonText, { color: colors.text }]}>
              3
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.keyboardRowView}>
          <TouchableOpacity
            style={[styles.keyButton, { borderBottomColor: colors.line }]}
            onPress={() => pushToArray("4")}>
            <Text style={[styles.keyButtonText, { color: colors.text }]}>
              4
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.keyButton, { borderBottomColor: colors.line }]}
            onPress={() => pushToArray("5")}>
            <Text style={[styles.keyButtonText, { color: colors.text }]}>
              5
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.keyButton, { borderBottomColor: colors.line }]}
            onPress={() => pushToArray("6")}>
            <Text style={[styles.keyButtonText, { color: colors.text }]}>
              6
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.keyboardRowView}>
          <TouchableOpacity
            style={[styles.keyButton, { borderBottomColor: colors.line }]}
            onPress={() => pushToArray("7")}>
            <Text style={[styles.keyButtonText, { color: colors.text }]}>
              7
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.keyButton, { borderBottomColor: colors.line }]}
            onPress={() => pushToArray("8")}>
            <Text style={[styles.keyButtonText, { color: colors.text }]}>
              8
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.keyButton, { borderBottomColor: colors.line }]}
            onPress={() => pushToArray("9")}>
            <Text style={[styles.keyButtonText, { color: colors.text }]}>
              9
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.keyboardRowView}>
          <TouchableOpacity
            style={[styles.keyButton, { borderBottomColor: colors.line }]}
            onPress={() => pushToArray("00")}>
            <Ionicons name="backspace-outline" size={25} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.keyButton, { borderBottomColor: colors.line }]}
            onPress={() => pushToArray("0")}>
            <Text style={[styles.keyButtonText, { color: colors.text }]}>
              0
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.keyButton, { borderBottomColor: colors.line }]}
            onPress={signIn}>
            <Text style={[styles.keyButtonText, { color: colors.text }]}>
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Forgotpin")}
        style={styles.loginButton}>
        <Text style={[styles.loginButtonText, { color: colors.text }]}>
          Forgot PIN?<Text style={styles.loginText}> Reset</Text>
        </Text>
      </TouchableOpacity>

      <View
        style={{
          height: 50,
        }}
      />
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
    paddingVertical: 50,
  },
  pageTitle: {
    fontFamily: "bold",
    fontSize: 30,
  },
  pageDescription: {
    fontFamily: "regular",
  },
  info: {
    // color: colors.text,
    // width: Dimensions.get('window').width * 0.7,
    paddingTop: 20,
  },
  errorCircle: {
    height: 20,
    width: 20,

    borderRadius: 100,
    textAlign: "center",
    fontSize: 14,
  },
  inputCircle: {
    // color: colors.text,
    fontFamily: "bold",
    textAlign: "center",
    height: 40,
    width: 40,
    fontSize: 14,
  },
  outerCircle: {
    height: 60,
    width: 60,
    borderWidth: 1,

    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  inputNumber: {
    fontSize: 20,
    fontFamily: "bold",
  },
  keyBoardView: {},
  keyboardRowView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 15,
  },
  keyButton: {
    borderBottomWidth: 0.5,
    width: Dimensions.get("window").width * 0.15,
    height: Dimensions.get("window").width * 0.15,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  keyButtonText: {
    fontSize: 20,
    fontFamily: "regular",
  },
  errorText: {
    fontSize: 10,
    textAlign: "center",
  },
  mainInputView: {
    paddingVertical: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
});
