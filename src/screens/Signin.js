import React, {useContext} from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View, Text, Image} from "react-native";
import SigninForm from "../forms/SigninForm";
import Logo from "../components/Logo.js";
import * as Font from "expo-font";
import AppLoading from 'expo-app-loading';
import Images from 'react-native-scalable-image';
import { ThemeContext } from "../theme";

const { width, height } = Dimensions.get("screen");

const Login = ({ navigation }) => {

  const {theme, ContextStyles} = useContext(ThemeContext);

  return (
    <View style={[styles.container, ContextStyles[`main${theme}`]]}>
      <Images style={styles.fondo} source={theme == "dark" ? require("../../assets/g44.png"): require("../../assets/g47.png")} height={height*0.6}/>
      <Logo title="PRILOZ"/>
      <SigninForm navigation={navigation}/>
      <View style={{display:"flex", flexDirection:"column", marginTop:30, alignItems:"center", justifyContent:"center"}}>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("chpassword")}>
            <Text style={[ContextStyles[`hiper${theme}`],{marginBottom:height*0.03, fontSize:width*0.04}]}>¿Olvide mi contraseña?</Text>
          </TouchableOpacity>
        </View>
        <View style={{display:"flex",flexDirection:"row"}}>
          <Text style={ [theme == "dark" ? {color:"white"}:{color:"#2A2D2E"}, {fontSize:width*0.04}]}>¿No tienes una cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("signup")}>
            <Text style={[ContextStyles[`hiper${theme}`],{fontSize:width*0.04}]}>  Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    position:"relative",
  },
  fondo:{
    position: "absolute",
    bottom: 0, 
    right: 0,
  },
});

export default Login;
