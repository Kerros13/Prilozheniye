import React, { useState } from "react";
import { StyleSheet, View, Dimensions, TextInput,Image } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { firebase } from "../firebase";
import { validate } from "email-validator";

const {width, height} = Dimensions.get("window");

const SignupForm = ({ navigation }) => {
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
    }
  };

  const handleSignup = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        // Obtener el Unique Identifier generado para cada usuario
        // Firebase -> Authentication
        const uid = response.user.uid;

        // Construir el objeto que le enviaremos a la collección de "users"
        const data = {
          id: uid,
          email,
          fullname,
        };

        // Obtener la colección desde Firebase
        const usersRef = firebase.firestore().collection("users");

        // Almacenar la información del usuario que se registra en Firestore
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            navigation.navigate("App");
          })
          .catch((error) => {
            console.log(error);
            setError(error.message);
          });
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <Image style={styles.fondo} source={require("../../assets/g44.png")}/>
      <TextInput
        placeholder="Nombre"
        value={fullname}
        onChangeText={setFullname}
        style={styles.input}
        onBlur={() => {
          handleVerify("fullname");
        }}
        errorMessage={
          fullnameError ? "Por favor ingresa tu nombre completo" : ""
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
      <Button title="Crear Cuenta" titleStyle={styles.titleBtn} onPress={handleSignup} buttonStyle={styles.signUpBtn}/>
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
  },
  titleBtn: {
    fontFamily: "PlayfairDisplay",
    fontSize: width*0.055,
  },
  fondo:{
    width: width*0.4,
    height: height*0.6,
    position: "absolute",
    top: 50,
    left: width*0.62,
    resizeMode:"contain"
  },
});

export default SignupForm;
