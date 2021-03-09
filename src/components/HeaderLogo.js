import React, { useEffect, useState } from "react";
import {StyleSheet,View,Text, Image, Dimensions} from "react-native";
import * as Font from "expo-font";
import AppLoading from 'expo-app-loading';

const {width, height} = Dimensions.get("window");

const Logo = ({title}) => {

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

    return (
        <View style={styles.titleContainer}>
            <Image style={styles.image} source={require("../../assets/qwerty.png")}/>
            <Text style={styles.textTitulo}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    image:{
        top: "-5%",
        width: width*0.05,
        height: height*0.1,
        transform: [{ rotate: '22deg' }],
        resizeMode:"contain"
    },
    textTitulo:{
        color:"#BBFE1B",
        fontSize:40,
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