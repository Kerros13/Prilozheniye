import React, { useState,useEffect } from "react";
import { StyleSheet, View, Text, Dimensions, TextInput, Image } from "react-native";
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
  const [hidePass, setHidePass] = useState(true);

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
      <Image style={styles.fondo} source={require("../../assets/g44.png")}/>
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
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.inputP}
          secureTextEntry={hidePass ? true : false}
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
        <Icon
          name={hidePass ? 'eye-slash' : 'eye'}
          style={styles.passwordIcon}
          size={width*0.07}
          color="grey"
          onPress={() => setHidePass(!hidePass)}
        />
      </View>
      <Button title="Sign-In" onPress={handleSignin} titleStyle={styles.titleBtn} buttonStyle={styles.signInBtn}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    display: "flex",
    position:"relative",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  passwordContainer: {
    flexDirection: 'row',
    position:"relative",
    justifyContent:"center",
  },
  passwordIcon: {
    position:"absolute",
    top: height*0.015,
    right:width*0.05,
  },
  input:{
    height: height*0.07,
    width: width*0.7,
    color:"#000", 
    backgroundColor: "white",
    fontSize:width*0.05,
    borderRadius:100,
    marginBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    alignContent:"center",
    alignItems: "center",
  },
  inputP:{
    height: height*0.07,
    width: width*0.7,
    color:"#000", 
    backgroundColor: "white",
    fontSize:width*0.05,
    borderRadius:100,
    marginBottom: 20,
    paddingLeft: 20,
    paddingRight: "15%",
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
    fontSize: width*0.055,
  },
  fondo:{
    width: width*0.4,
    height: height*0.6,
    position: "absolute",
    top: height*0.01, // bluestacks height*(-0.022),
    left: width*0.607,
    resizeMode:"contain"
  },
});

export default SigninForm;
