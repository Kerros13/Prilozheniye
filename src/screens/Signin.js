import React from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { Input, Button } from "react-native-elements";
import SigninForm from "../forms/SigninForm";

const { width, height } = Dimensions.get("screen");

const Login = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <SigninForm navigation={navigation}/>
      <Text style={styles.forgotPassword}>Forgot your password?</Text>
      <TouchableOpacity onPress={() => navigation.navigate("signup")}>
        <Text>Don't have an account? Sign-Up</Text>
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
  forgotPassword: {
    textAlign: "right",
  },
});

export default Login;
