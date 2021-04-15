import React, { useState,useContext,useEffect } from "react";
import { StyleSheet, View, Dimensions, TextInput,Image } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { validate } from "email-validator";
import { Context as AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../theme";
import Images from 'react-native-scalable-image';
import Alert from "../components/Alert"
import getEnvVars from "../../environment";
import * as Google from 'expo-google-app-auth';

const {width, height} = Dimensions.get("window");
const {googleSignInKey,googleSignInKeyIOS} = getEnvVars();

const SignupForm = ({ navigation }) => {
  const { state, signup, onSignIn, clearErrorMessage } = useContext(AuthContext);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullnameError, setFullnameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [hidePass1, setHidePass1] = useState(true);
  const [hidePass2, setHidePass2] = useState(true);
  const [error, setError] = useState("");
  const {theme, ContextStyles} = useContext(ThemeContext);
  
  useEffect(() => {
    if (state.errorMessage) clearErrorMessage();
  }, []);

  useEffect(() => {
    if (state.errorMessage) setError(state.errorMessage);
  }, [state.errorMessage]);

  // useEffect(() => {
  //   if (state.registered) navigation.navigate("App");
  // }, [state]);

  // Verifica que los datos ingresados sean correctos
  const handleVerify = (input) => {
    if (input === "fullname") {
      // Verificar el nombre del usuario
      if (!fullname) setFullnameError(true);
      else setFullnameError(false);
    } else if (input === "email") {
      // Verificar el correo electrónico
      if (!email) setEmailError(true);
      else if (!validate(email)) setEmailError(true);
      else setEmailError(false);
    } else if (input === "password") {
      // Verificar la contraseña
      if (!password) setPasswordError(true);
      else if (password.length < 6) setPasswordError(true);
      else setPasswordError(false);
    } else if (input === "confirmPassword") {
      // Verificar la confirmación de la contraseña
      if (!confirmPassword) setConfirmPasswordError(true);
      else if (confirmPassword !== password) setConfirmPasswordError(true);
      else setConfirmPasswordError(false);
    }else if (input === "signup") {
      if (
        !fullnameError &&
        !emailError &&
        !passwordError &&
        !confirmPasswordError &&
        fullname &&
        email &&
        password &&
        confirmPassword
      )
        signup(fullname, email, password);
      else setError("All fields are required!");
    }
  };

  const googleLogIn = async() => {
  
    try {
      const result = await Google.logInAsync({
        androidClientId: googleSignInKey,
        iosClientId: googleSignInKeyIOS,
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        onSignIn(result);
      } else {
        console.log(result);
      }
    } catch (e) {
      console.log(e);
    }
  }


  return (
    <View style={styles.container}>
      {error ? <Alert type="error" title={error} /> : null}
      <TextInput
        placeholder="Nombre"
        value={fullname}
        onChangeText={setFullname}
        style={styles.input}
        onBlur={() => {
          handleVerify("fullname");
        }}
        errorMessage={
          fullnameError ? "Por favor ingresa tu nombre" : ""
        }
      />
      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        onBlur={() => {
          handleVerify("email");
        }}
        errorMessage={
          emailError ? "Por favor ingresa una dirección de correo válida" : ""
        }
      />
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          style={styles.inputP}
          secureTextEntry={hidePass1 ? true : false}
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
          name={hidePass1 ? 'eye-slash' : 'eye'}
          style={styles.passwordIcon}
          size={width*0.07}
          color="grey"
          onPress={() => setHidePass1(!hidePass1)}
        />
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Confirmar Contraseña"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.inputP}
          secureTextEntry={hidePass2 ? true : false}
          autoCapitalize="none"
          onBlur={() => {
            handleVerify("confirmPassword");
          }}
          errorMessage={
            confirmPasswordError
              ? "Por favor reingresa la contraseña y verifica que es correcta"
              : ""
          }
        />
        <Icon
          name={hidePass2 ? 'eye-slash' : 'eye'}
          style={styles.passwordIcon}
          size={width*0.07}
          color="grey"
          onPress={() => setHidePass2(!hidePass2)}
        />
      </View>
      <Button title="Crear Cuenta" titleStyle={styles.titleBtn} onPress={() => handleVerify("signup")} buttonStyle={[styles.signUpBtn, ContextStyles[`signin${theme}`]]}/>
      <Button 
          title="      Google Sign-In" 
          onPress={googleLogIn} 
          titleStyle={[styles.titleBtn,{color:ContextStyles[`signup${theme}`].color}]} 
          buttonStyle={[styles.signInBtn,ContextStyles[`signup${theme}`]]}
          icon={
            <Images
              source={require("../../assets/google2.png")}
              height={height*0.05}
            />
        }
        iconLeft
      />
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
  signUpBtn: {
      width: width*0.7,
      height: height*0.07,
      borderRadius:50,
      marginHorizontal: 3,
      backgroundColor: "#0159BB",
      marginBottom: '2%',
  },
  titleBtn: {
    fontFamily: "PlayfairDisplay",
    fontSize: width*0.055,
  },
  signInBtn: {
    width: width*0.7,
    height: height*0.07,
    borderRadius:50,
    marginHorizontal: 3,
    marginBottom: '2%',
  },
});

export default SignupForm;
