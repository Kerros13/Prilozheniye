import React, { useEffect, useState } from "react";
import {StyleSheet,View,ScrollView,Text, Image, TouchableOpacity, TextInput} from "react-native";

const loginScreen = ({ navigation }) => {
    
    const [Usuario, setUsuario] = useState([]);
    const [Contraseña, setContraseña] = useState([]);

    const myOnChangeUser = async (e) =>{
        const {name, value} = await e.currentTarget;
        setUsuario(value);
    }

    const myOnChangePassword = async (e) =>{
        const {name, value} = await e.currentTarget;
        setContraseña(value);
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

    return (
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                <Image
                    style={styles.tinyLogo}
                    source={require("../../assets/user1.png")}
                />
            </View>
            <View style={styles.textContainer}>
                <Text>Usuario</Text>
                <TextInput
                    type="text"
                    id="user"
                    name="user"
                    style={styles.input}
                    onChange={myOnChangeUser}
                />
                <Text>Contraseña</Text>
                <TextInput
                    type="text"
                    id="pass"
                    name="pass"
                    style={styles.input}
                    secureTextEntry={true}
                    onChange={myOnChangePassword}
                />
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.button} onPress={onPress}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#007ACC",
    },
    imgContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    tinyLogo: {
        width: 100,
        height: 100,
    },
    textContainer: {
        display: "flex",
        flexDirection: "column",
    },
    input:{
        height: 40,
        width: 200,
        color:"#fff", 
        borderColor:"#000", 
        borderWidth: 1, 
        marginBottom: 10, 
        paddingLeft: 5,
    },
    btnContainer: {
        marginTop: 5,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        width: 200,
    },
});

export default loginScreen;