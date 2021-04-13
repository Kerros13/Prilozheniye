import React, { useEffect, useState, useContext } from "react";
import {StyleSheet,View,Text, Image, Dimensions} from "react-native";
import * as Font from "expo-font";
import AppLoading from 'expo-app-loading';
import { ThemeContext } from "../theme";

const {width, height} = Dimensions.get("window");

const Logo = ({title}) => {

    const [fontLoaded, setFontLoaded] = useState(false);
    const {theme, ContextStyles} = useContext(ThemeContext);

    // useEffect(()=>{

    //     console.log(theme);

    // },[theme])

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
        <View style={styles.titleContainer}>
            <Image style={styles.image} source={theme == "dark" ? require("../../assets/qwerty.png"): require("../../assets/qwertylight.png")}/>
            <Text style={[styles.textTitulo,ContextStyles[`logo${theme}`]]}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    image:{
        top: "-5%",
        width: width*0.1,
        height: height*0.2,
        transform: [{ rotate: '22deg' }],
        resizeMode:"contain"
    },
    textTitulo:{
        fontSize:width*0.2,
        fontFamily: "mistral",
        alignContent:"center",
        alignItems: "center",
        marginBottom: 10,
    },
    titleContainer: {
        flexDirection:"row",
        justifyContent: "center", 
        alignItems: "center",
    },
});

export default Logo;