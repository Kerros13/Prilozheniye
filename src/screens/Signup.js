import React, { useContext } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { Text } from "react-native-elements";
import SignupForm from "../forms/SignupForm";
import Logo from "../components/Logo.js";
import { Ionicons } from '@expo/vector-icons';
import Images from 'react-native-scalable-image';
import { ThemeContext } from "../theme";

const { width, height } = Dimensions.get("screen");

const Signup = ({ navigation }) => {

  const {theme, ContextStyles} = useContext(ThemeContext);

  return (
    <View style={[styles.container, ContextStyles[`main${theme}`]]}>
      <Ionicons name="arrow-back" size={width*0.09} color={theme == "dark" ? "white":"#2A2D2E"} onPress={() => {navigation.pop()}} style={{position:"absolute", left:'3%', top:'5%'}}/>
      <Images style={styles.fondo} source={theme == "dark" ? require("../../assets/g44.png"): require("../../assets/g47.png")} height={height*0.6}/>
      <Logo title="PRILOZ"/>
      <SignupForm navigation={navigation}/>
      <View style={{display:"flex",flexDirection:"row", marginTop:30, alignItems:"center",justifyContent:"center"}}>
        <Text style={ [theme == "dark" ? {color:"white"}:{color:"#2A2D2E"}, {fontSize:width*0.04}]}>¿Ya tienes una cuenta?</Text>
        <TouchableOpacity onPress={() => { navigation.navigate("signin") }}> 
          <Text style={[ContextStyles[`hiper${theme}`],{fontSize:width*0.04}]}>  Inicia Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#313030",
    flex: 1,
    justifyContent: "center",
  },
  fondo:{
    position: "absolute",
    bottom: 0, 
    right: 0,
  },
});

export default Signup;
