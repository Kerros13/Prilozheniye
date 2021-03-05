import React from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import SigninForm from "../forms/SigninForm";
import Logo from "../components/Logo.js"

const { width, height } = Dimensions.get("screen");

const Login = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Logo title="Priloz"/>
      <SigninForm navigation={navigation}/>
      <View style={{displat:"flex", flexDirection:"column", marginTop:20, alignContent:"center", justifyContent:"center"}}>
                <Text style={{color:"white", marginBottom:height*0.02}}>Forgot your password?</Text>
                <View style={{display:"flex",flexDirection:"row"}}>
                    <Text style={{color:"white"}}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("signup")}>
                        <Text style={{color:"#006BE1"}}> Sign-Up</Text>
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
    padding: 10,
    backgroundColor:"#313030"
  },
  forgotPassword: {
    textAlign: "right",
  },
});

export default Login;
