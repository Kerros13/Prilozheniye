import React, { useEffect, useState } from "react";
import {StyleSheet,View,ScrollView,Text, Image, TouchableOpacity, TextInput, Dimensions} from "react-native";
import * as Font from "expo-font";
import AppLoading from 'expo-app-loading';
import { UserInterfaceIdiom } from "expo-constants";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-elements";
import Logo from "../components/Logo.js"

const {width, height} = Dimensions.get("window");

const loginScreen = ({ navigation }) => {
    
    const [Usuario, setUsuario] = useState("");
    const [Contraseña, setContraseña] = useState({
        pass: "",
    });
    const [fontLoaded, setFontLoaded] = useState(false)

    const myOnChangeUser = (e) =>{
        const {value} = e.currentTarget;
        setUsuario(value);
    }

    const myOnChangePassword = (e) =>{
        const {value} = e.currentTarget;
        setContraseña({...Contraseña, pass:value});
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
       if (Usuario == userList && Contraseña.pass == passList) {
            navigation.navigate("Home");
       }
       else {
           alert("Credenciales inválidas.");
           alert(Usuario);
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
            <Logo title="PRILOZ" />
            <Image style={styles.fondo} source={require("../../assets/g44.png")}/>
            <View style={styles.textContainer}>
                <TextInput
                    placeholder="User"
                    name="userPH"
                    value={Usuario}
                    style={styles.input}
                    onChange={myOnChangeUser}
                />
                <TextInput
                    placeholder="Contraseña"
                    name="passPH"
                    value={Contraseña.pass}
                    style={styles.input}
                    secureTextEntry={true}
                    autoCapitalize= "none"
                    onChange={myOnChangePassword}
                />
            </View>
            <Button buttonStyle={styles.signInBtn}
                    color="gray"
                    title="Sign-In"
                    onPress={onPress}
                    titleStyle={{color:"#000", fontFamily: "PlayfairDisplay", fontSize:27,}}
                    type="solid"
            />
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
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#313030",
    },
    textContainer: {
        display: "flex",
        flexDirection: "column",
    },
    input:{
        height: height*0.07,
        width: width*0.7,
        color:"#000", 
        backgroundColor: "white",
        fontSize:25,
        borderRadius:100,
        marginBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
        alignContent:"center",
        alignItems: "center",
    },
    signInBtn: {
        width: width*0.7,
        height: height*0.07,
        borderRadius:50,
        marginHorizontal: 3,
        backgroundColor: "#0159BB",
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
        left: width*0.65,
    },
});

export default loginScreen;