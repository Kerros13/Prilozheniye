import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import SignupForm from "../forms/SignupForm";

const { width, height } = Dimensions.get("screen");

const Signup = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SignupForm />
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text>Already got an account? Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },


});

export default Signup;
