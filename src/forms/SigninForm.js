import React, { useState,useEffect } from "react";
import { StyleSheet, View, Text, Dimensions, TextInput } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { firebase } from "../firebase";
import { validate } from "email-validator";
import { CommonActions } from '@react-navigation/native';

const {width, height} = Dimensions.get("window");

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
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        onBlur={() => {
          handleVerify("email");
        }}
        errorMessage={
          emailError ? "Por favor ingresa una dirección de correo válida" : ""
        }
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
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
      <Button title="Sign-In" onPress={handleSignin} titleStyle={styles.titleBtn} buttonStyle={styles.signInBtn}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#313030",
  },
  input:{
    height: height*0.07,
    width: width*0.7,
    color:"#000", 
    backgroundColor: "white",
    fontSize:25,
    borderRadius:100,
    marginBottom: 20,
    paddingLeft: 25,
    alignContent:"center",
    alignItems: "center",
  },
  signInBtn: {
    width: width*0.7,
    height: height*0.07,
    borderRadius:50,
    marginHorizontal: 3,
    backgroundColor: "#0159BB",
  },
  titleBtn: {
    fontFamily: "PlayfairDisplay",
    fontSize: 25,
  },
});

export default SigninForm;
