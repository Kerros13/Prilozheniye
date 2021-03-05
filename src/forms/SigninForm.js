import React, { useState,useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { firebase } from "../firebase";
import { validate } from "email-validator";
import { CommonActions } from '@react-navigation/native';

const SigninForm = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleVerify = (input) => {
     if (input === "email") {
      // Verificar el correo electrónico
      if (!email) setEmailError(true);
      else if (!validate(email)) setEmailError(true);
      else setEmailError(false);
    } else if (input === "password") {
      // Verificar la contraseña
      if (!password) setPasswordError(true);
      else setPasswordError(false);
    }
  };


  const handleSignin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email,password)
      .then(() => {
        console.log("success");
        navigation.dispatch(
          CommonActions.reset({index: 0,routes: [
              {
                name: 'App',
              },
            ],
          })
        );
        navigation.navigate("App");

      })
      .catch((error) => setError(error.message));
  };

  return (
    <View>
      <Input
        placeholder="Email"
        leftIcon={<Icon name="envelope" color="white" />}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        onBlur={() => {
          handleVerify("email");
        }}
        errorMessage={
          emailError ? "Por favor ingresa una dirección de correo válida" : ""
        }
      />
      <Input
        placeholder="Password"
        leftIcon={<Icon name="lock" color="white" />}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        onBlur={() => {
          handleVerify("password");
        }}
        errorMessage={
          passwordError
            ? "Por favor ingresa una contraseña de mínimo 6 caracteres"
            : ""
        }
      />
      <Button title="Sign-In" onPress={handleSignin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#313030",
}
});

export default SigninForm;
