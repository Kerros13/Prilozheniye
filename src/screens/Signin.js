import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View, Text, Image} from "react-native";
import SigninForm from "../forms/SigninForm";
import Logo from "../components/Logo.js"

const { width, height } = Dimensions.get("screen");

const Login = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Logo title="PRILOZ"/>
      <Image style={styles.fondo} source={require("../../assets/g44.png")}/>
      <SigninForm navigation={navigation}/>
      <View style={{display:"flex", flexDirection:"column", marginTop:30, alignItems:"center", justifyContent:"center"}}>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("signup")}>
            <Text style={{color:"#BBFE1B", marginBottom:height*0.03}}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
        <View style={{display:"flex",flexDirection:"row"}}>
          <Text style={{color:"white"}}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("signup")}>
            <Text style={{color:"#BBFE1B"}}>  Sign-Up</Text>
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
    backgroundColor:"#313030"
  },
  forgotPassword: {
    textAlign: "right",
  },
  fondo:{
    width: 140,
    height: height*0.6,
    position: "absolute",
    top: height*0.4,
    left: width*0.65,
  },
});

export default Login;
