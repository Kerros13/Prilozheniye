import React, { useState, useContext } from "react";
import { View,StyleSheet, TextInput,Dimensions,TouchableOpacity } from "react-native";
import { Text,Button } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import { firebase } from "../firebase";
import Alert from "../components/Alert";
import { ThemeContext } from "../theme";

const { width, height } = Dimensions.get("screen");

const changePasswordScreen = ({navigation}) =>{

    const [email,setEmail] = useState("");
    const [title,setTitle] = useState("");
    const [type,setType] = useState("");
    const {theme, ContextStyles} = useContext(ThemeContext);

    const handlePasswordChange = () =>{
        firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(function() {
            setType("success");
            setTitle("Se envio un correo para que cambies tu contraseña!");
        })
        .catch(function(error) {
            console.log(error);
            setType("error");
            setTitle("Ha ocurrido un error");
        });
    }


    return(
        
        <View style={[styles.container, ContextStyles[`main${theme}`]]}>
            <Ionicons name="arrow-back" size={width*0.09} color={theme == "dark" ? "white":"#2A2D2E"} onPress={() => {navigation.pop()}} style={{position:"absolute", left:'3%', top:'5%'}}/>
            {type ? <Alert type={type} title={title}/>:null}
            <Text style={ [theme == "dark" ? {color:"white"}:{color:"#2A2D2E"},{margin:10, fontSize:width*0.06}]}>Para cambiar tu contraseña:</Text>
            <TextInput
                placeholder="Ingresa tu correo"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />      
            <Button disabled={type == "success"?true:false} disabledStyle={theme == "dark" ? {backgroundColor:"#527ba8"}:{backgroundColor:"#f57a81"}} disabledTitleStyle={styles.disabledTxt} title="Enviar E-mail" onPress={handlePasswordChange} titleStyle={styles.titleBtn} buttonStyle={[styles.signUpBtn,ContextStyles[`change${theme}`]]}/>
            <View style={{display:"flex",flexDirection:"row", marginTop:30, alignItems:"center",justifyContent:"center"}}>
                <Text style={ [theme == "dark" ? {color:"white"}:{color:"#2A2D2E"}, {fontSize:width*0.04}]}>¿Ya cambiaste tu contraseña?</Text>
                <TouchableOpacity onPress={() => { navigation.goBack() }}> 
                <Text style={[ContextStyles[`hiper${theme}`],{fontSize:width*0.04}]}>  Inicia Sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    )


}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    input:{
        height: height*0.07,
        width: width*0.7,
        color:"#000", 
        backgroundColor: "white",
        fontSize:width*0.05,
        borderRadius:100,
        marginBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        alignContent:"center",
        alignItems: "center",
    },
    titleBtn:{
        fontFamily: "PlayfairDisplay",
        fontSize: width*0.055,
    },
    signUpBtn: {
        width: width*0.7,
        height: height*0.07,
        borderRadius:50,
        marginHorizontal: 3,
    },
    disabledTxt:{
        color:"#fff",
    },
})


export default changePasswordScreen;