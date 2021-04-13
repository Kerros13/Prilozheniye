import React, {  useState } from "react";
import {StyleSheet,View,Text, TouchableOpacity, TextInput, Dimensions} from "react-native";

import { Button } from "react-native-elements";
import Logo from "../components/Logo.js"

const {width, height} = Dimensions.get("window");

const loginScreen = ({ navigation }) => {
    
    const [Usuario, setUsuario] = useState("");
    const [Contraseña, setContraseña] = useState({
        pass: "",
    });


    //"Base de datos" provisional
    const userList = "user";
    const passList = "pass";

    return (
        <View style={styles.container}>
            <Logo title="PRILOZ" />
            
            <View style={styles.textContainer}>
                <TextInput
                    placeholder="User"
                    name="userPH"
                    value={Usuario}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    name="passPH"
                    value={Contraseña.pass}
                    style={styles.input}
                    secureTextEntry={true}
                    autoCapitalize= "none"
                />
            </View>
            <Button buttonStyle={styles.signInBtn}
                    color="gray"
                    title="Sign-In"
                    titleStyle={{color:"#000", fontFamily: "PlayfairDisplay", fontSize:27,}}
                    type="solid"
            />
            <View style={{display:"flex", flexDirection:"column", marginTop:20, alignItems:"center", justifyContent:"center"}}>
                <View>
                    <TouchableOpacity>
                        <Text style={{color:"#BBFE1B", marginBottom:height*0.02}}>Forgot your password?</Text>
                    </TouchableOpacity>
                </View>
                <View style={{display:"flex",flexDirection:"row"}}>
                    <Text style={{color:"white"}}>Don't have an account?</Text>
                    <TouchableOpacity>
                        <Text style={{color:"#BBFE1B"}}>  Sign-Up</Text>
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