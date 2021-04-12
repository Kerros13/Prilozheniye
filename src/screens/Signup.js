import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { Text } from "react-native-elements";
import SignupForm from "../forms/SignupForm";
import Logo from "../components/Logo.js";
import Images from 'react-native-scalable-image';


const { width, height } = Dimensions.get("screen");

const Signup = ({ navigation }) => {


  return (
    <View style={styles.container}>
      <Images style={styles.fondo} source={require("../../assets/g44.png")} height={height*0.6}/>
      <Logo title="PRILOZ"/>
      <SignupForm navigation={navigation}/>
      <View style={{display:"flex",flexDirection:"row", marginTop:30, alignItems:"center",justifyContent:"center"}}>
        <Text style={{color:"#fff", fontSize:width*0.04}}>¿Ya tienes una cuenta?</Text>
        <TouchableOpacity onPress={() => { navigation.navigate("signin") }}> 
          <Text style={{color:"#BBFE1B", fontSize:width*0.04}}>  Inicia Sesión</Text>
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
