import React, { useState, useContext } from "react";
import { View,StyleSheet,Text, Image, Dimensions,StatusBar } from "react-native";
import { Button,Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Font from "expo-font";
import AppLoading from 'expo-app-loading';
import Logo from "../components/Logo.js"
import Images from 'react-native-scalable-image';
import { ThemeContext } from "../theme";


const {width, height} = Dimensions.get("screen");

const mainScreen = ({navigation}) => {

    const [fontLoaded, setFontLoaded] = useState(false);
    const {theme, ContextStyles} = useContext(ThemeContext);

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
        <View style={[styles.container, ContextStyles[`main${theme}`]]}>
            <StatusBar 
                translucent
                backgroundColor={"transparent"}
                barStyle={'light-content'}
                hidden={false}/>
            <Images style={styles.fondo} source={theme == "dark" ? require("../../assets/g44.png"): require("../../assets/g47.png")} height={height*0.6}/>
            <View style={styles.titleContainer}><Logo title="PRILOZ"/></View>
            
            <View style={styles.signContainer}>
                
                <Button
                    buttonStyle={[styles.signInBtn,ContextStyles[`signin${theme}`]]}
                    title=" Iniciar Sesión"
                    titleStyle={[{color:"#fff", fontFamily: "PlayfairDisplay", fontSize:width*0.055,}]}
                    type="solid"
                    onPress={()=>{navigation.navigate("signin")}}
                    icon={
                        <Icon
                            name="sign-in"
                            size={width*0.055}
                            color="#fff"
                        />
                    }
                    iconLeft
                />
                <Button
                    buttonStyle={[styles.signUpBtn,ContextStyles[`signup${theme}`]]}
                    title=" Registrarse"
                    titleStyle={{color:ContextStyles[`signup${theme}`].color,fontFamily: "PlayfairDisplay", fontSize:width*0.055,}}
                    type="solid"
                    onPress={()=>{navigation.navigate("signup")}}
                    icon={
                        <Icon
                            name="user-plus"
                            size={width*0.055}
                            color={ContextStyles[`signup${theme}`].color}
                        />
                    }
                    iconLeft
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
    fondo:{
        position: "absolute",
        bottom: 0, 
        right: 0,
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
        width: width*0.5,
        height: height*0.11,
        borderRadius:width*0.5,
        marginHorizontal: 3,
        marginBottom:15,
    },
    signUpBtn: {
        width: width*0.5,
        height: height*0.11,
        borderRadius:width*0.5,
        marginHorizontal: 10,
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