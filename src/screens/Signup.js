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
      <Logo title="PRILOZ" style={{flex:2}}/>
      <Image style={styles.fondo} source={require("../../assets/g44.png")}/>
      <SignupForm navigation={navigation}/>
      <View style={{display:"flex",flexDirection:"row", marginTop:30, alignItems:"center",justifyContent:"center"}}>
        <Text style={{color:"#fff"}}>Already got an account?</Text>
        <TouchableOpacity onPress={() => { navigation.navigate("signin") }}> 
          <Text style={{color:"#BBFE1B"}}>  Sign-in</Text>
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
    width: 140,
    height: height*0.6,
    position: "absolute",
    top: height*0.4,
    left: width*0.65,
  },

});

export default Signup;
