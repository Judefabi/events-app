import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../../globals/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";

const AddTickets = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { eventDetails } = route.params;
  const [tickets, setTickets] = useState([
    { name: "", price: "", quantity: "" },
  ]);

  const addTicket = () => {
    setTickets([...tickets, { name: "", price: "", quantity: "" }]);
  };

  const removeTicket = (index) => {
    const updatedTickets = tickets.filter((_, i) => i !== index);
    setTickets(updatedTickets);
  };

  const handleInputChange = (index, field, value) => {
    const updatedTickets = tickets.map((ticket, i) =>
      i === index ? { ...ticket, [field]: value } : ticket
    );
    setTickets(updatedTickets);
  };

  const onConfirmDetails = () => {
    const updatedEventDetails = { ...eventDetails, tickets };
    navigation.navigate("Add Location", {
      eventDetails: updatedEventDetails,
    });
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}>
        {tickets.map((ticket, index) => (
          <View key={index} style={styles.ticketInputView}>
            <TextInput
              style={styles.ticketInput}
              placeholder="Ticket Name"
              value={ticket.name}
              onChangeText={(value) => handleInputChange(index, "name", value)}
            />
            <TextInput
              style={styles.ticketInput}
              placeholder="Price"
              value={ticket.price}
              keyboardType="numeric"
              onChangeText={(value) => handleInputChange(index, "price", value)}
            />
            <TextInput
              style={styles.ticketInput}
              placeholder="Quantity"
              value={ticket.quantity}
              keyboardType="numeric"
              onChangeText={(value) =>
                handleInputChange(index, "quantity", value)
              }
            />

            <TouchableOpacity
              onPress={() => removeTicket(index)}
              style={styles.removeButton}>
              <Ionicons
                name="remove-circle-outline"
                size={24}
                color={colors.red}
              />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity onPress={addTicket} style={styles.addButton}>
          <Ionicons name="add-circle-outline" size={24} color={colors.green} />
          <Text style={styles.addButtonText}>Add Ticket</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onConfirmDetails}
          style={[styles.button, { backgroundColor: colors.button }]}>
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>
            Confirm Details
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddTickets;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
    paddingTop: 90,
  },
  ticketInputView: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  ticketInput: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
  },
  removeButton: {
    marginLeft: 10,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  addButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: colors.green,
  },
  button: {
    width: Dimensions.get("window").width * 0.9,
    alignSelf: "center",
    height: 50,
    marginVertical: 20,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 10,
    position: "absolute",
    bottom: 30,
    alignItems: "center",
  },
  buttonText: {
    alignSelf: "center",
    fontSize: 16,
  },
});
