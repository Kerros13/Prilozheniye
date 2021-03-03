import React, { useEffect, useState } from "react";
import {StyleSheet,View,ScrollView,Text, Image, TouchableOpacity, TextInput, Dimensions} from "react-native";
import * as Font from "expo-font";
//import {AppLoading} from "expo"
import AppLoading from 'expo-app-loading'
import { UserInterfaceIdiom } from "expo-constants";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-elements";

const {width, height} = Dimensions.get("window");

const loginScreen = ({ navigation }) => {
    
    const [Usuario, setUsuario] = useState([]);
    const [Contraseña, setContraseña] = useState([]);
    const [fontLoaded, setFontLoaded] = useState(false)

    const myOnChangeUser = async (e) =>{
        const {name, value} = await e.currentTarget;
        setUsuario(value);
    }

    const myOnChangePassword = async (e) =>{
        const {name, value} = await e.currentTarget;
        setContraseña(value);
    }

    const loadFonts = () => {
        return Font.loadAsync({
            "mistral": require("../../assets/Font/mistral.ttf"),
            "PlayfairDisplay": require("../../assets/Font/PlayfairDisplay-Italic.otf"),
        });
    }

    //"Base de datos" provisional
    const userList = "user";
    const passList = "pass";

    const onPress = () => {
       if (Usuario == userList && Contraseña == passList) {
            navigation.navigate("Home");
       }
       else {
           alert("Credenciales inválidas.");
       }
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
            <View style={{flexDirection:"row"}}>
                <Image style={styles.image} source={require("../../assets/qwerty.png")}/>
                <Text style={styles.textTitulo}>PRILOZ</Text>
            </View>
            <Image style={styles.fondo} source={require("../../assets/g47.png")}/>
            <View style={styles.textContainer}>
                <TextInput
                    placeholder=" User"
                    name={<Icon name="envelope" color="#ff0000" />}
                    style={styles.input}
                    onChange={myOnChangeUser}
                />
                <TextInput
                    placeholder=" Pass"
                    style={styles.input}
                    secureTextEntry={true}
                    autoCapitalize= "none"
                    onChange={myOnChangePassword}
                />
            </View>
            <Button buttonStyle={styles.button}
                    raised={true}
                    color="gray"
                    title={<Text style={styles.buttonText}>Login</Text>}
                    type="outline" 
                    onPress={onPress}
            />
            <View style={{flexDirection:"column", marginTop:20, alignContent:'center'}}>
                <Text style={{color:"white", marginBottom:20}}>Forgot your password?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("signup")}>
                    <Text style={{color:"white"}}>Don't have an account? Sign-Up</Text>
                </TouchableOpacity>
            </View>
           
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#313030",
    },
    image:{
        top: "-6%",
        width: 39,
        height: 106,
        transform: [{ rotate: '20deg' }],
    },
    textContainer: {
        display: "flex",
        flexDirection: "column",
    },
    input:{
        height: height*0.1,
        width: width*0.7,
        color:"#000", 
        backgroundColor: "white",
        fontSize:25,
        borderRadius:100,
        marginBottom: 20,
        paddingLeft: 5,
        alignContent:"center",
        alignItems: "center",
        fontFamily: "PlayfairDisplay",
    },
    textTitulo:{
        color:"#BBFE1B",
        fontSize: 72,
        fontFamily: "mistral",
        alignContent:"center",
        alignItems: "center",
        marginBottom: 10,
    },
    button: {
        backgroundColor: "rgb(195,195,195)",
        borderRadius: 50,
        justifyContent:"center",
        alignItems: "center",
        height: height*0.09,
        width: 100,
    },
    buttonText: {
        fontFamily: "PlayfairDisplay",
        fontSize: 25,
    },
    fondo:{
        width: 140,
        height: height*0.6,
        position: "absolute",
        top: height*0.4,
        left: width*0.6,
    },
});

export default loginScreen;