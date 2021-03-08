import React, { useState } from "react";
import { View,StyleSheet,Text, Image, Dimensions } from "react-native";
import { Button,Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Font from "expo-font";
import AppLoading from 'expo-app-loading';
import Logo from "../components/Logo.js"


const {width, height} = Dimensions.get("window");

const mainScreen = ({navigation}) => {

    const [fontLoaded, setFontLoaded] = useState(false);

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

    return(
        <View style={styles.container}>
            <Image style={styles.bgimage} source={require("../../assets/g44.png")}/>
            <View style={styles.titleContainer}><Logo title="PRILOZ"/></View>
            
            <View style={styles.signContainer}>
                
                <Button
                    buttonStyle={styles.signInBtn}
                    title="Sign-In"
                    titleStyle={{color:"#fff", fontFamily: "PlayfairDisplay", fontSize:width*0.055,}}
                    type="solid"
                    onPress={()=>{navigation.navigate("signin")}}
                    icon={
                        <Icon
                            name="sign-in"
                            size={25}
                            color="#fff"
                        />
                    }
                    iconLeft
                />
                <Button
                    buttonStyle={styles.signUpBtn}
                    title="Sign-Up"
                    titleStyle={{color:"#000", fontFamily: "PlayfairDisplay", fontSize:width*0.055,}}
                    type="solid"
                    onPress={()=>{navigation.navigate("signup")}}
                    icon={
                        <Icon
                            name="user-plus"
                            size={25}
                            color="#000"
                        />
                    }
                    iconLeft
                />
            </View>
            
            <View style={styles.tabsContainer}>
                <Button
                    buttonStyle={styles.tabsBtn}
                    title="Tabs"
                    titleStyle={{color:"#000", fontFamily: "PlayfairDisplay",}}
                    type="solid"
                    onPress={()=>{navigation.navigate("App")}}
                />
            </View>
                
        </View>
    )

};


const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#313030",
        position:"relative",
    },
    iconContainer: {
        marginRight:10,
    },
    titleContainer: {
        flexDirection:"row", 
        justifyContent: "center", 
        alignItems: "center",
    },
    imgContainer:{
        display: "flex",
        flex:3,
    },
    bgimage: {
        width: width*0.4,
        height: height*0.6,
        position: "absolute",
        top: height*0.4,
        left: width*0.607,
        resizeMode:"contain"
    },
    signContainer: {
        width: width,
        display: "flex",
        position:"relative",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    signInBtn: {
        width: width*0.55,
        height: height*0.12,
        borderRadius:50,
        borderColor:"#000",
        marginHorizontal: 3,
        backgroundColor: "#0159BB",
        marginBottom:15,
    },
    signUpBtn: {
        width: width*0.55,
        height: height*0.12,
        borderRadius:50,
        borderColor:"#000",
        marginHorizontal: 10,
        backgroundColor: "#BBFE1B",
    },
    tabsContainer: {
        position:"absolute",
        bottom:'2%',
        justifyContent:"center",
        alignItems:"center",
    },
    tabsBtn:{
        width:width*0.95,
        height:height*0.06,
        borderRadius:50,
        backgroundColor: "#fff",
    },

})

export default mainScreen;