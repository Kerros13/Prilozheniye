import React, {useState} from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import SignupForm from "../forms/SignupForm";
import AppLoading from 'expo-app-loading';
import Logo from "../components/Logo.js"

const { width, height } = Dimensions.get("screen");

const Signup = ({ navigation }) => {
  
  const [fontLoaded, setFontLoaded] = useState(false)
  
  const loadFonts = () => {
    return Font.loadAsync({
        "mistral": require("../../assets/Font/mistral.ttf"),
        "PlayfairDisplay": require("../../assets/Font/PlayfairDisplay-Italic.otf"),
    });
  }


  if(!fontLoaded){    
    return (
        <AppLoading
            startAsync={loadFonts}
            onFinish={() => setFontLoaded(true)}
            onError={(err) => console.log(err)}
        />
    );
  }

  return (
    <View style={styles.container}>
      <Logo title="PRILOZ"/>
      <SignupForm navigation={navigation}/>
      <View style={{display:"flex",flexDirection:"row", marginTop:30, alignItems:"center",justifyContent:"center"}}>
        <Text style={{color:"#fff", fontSize:width*0.04}}>Already got an account?</Text>
        <TouchableOpacity onPress={() => { navigation.navigate("signin") }}> 
          <Text style={{color:"#BBFE1B", fontSize:width*0.04}}>  Sign-in</Text>
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
});

export default Signup;
