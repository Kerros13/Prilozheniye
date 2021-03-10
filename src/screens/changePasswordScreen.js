import React, { useState } from "react";
import { View,StyleSheet, TextInput,Dimensions,TouchableOpacity } from "react-native";
import { Text,Button } from "react-native-elements";
import { firebase } from "../firebase";
import Alert from "../components/Alert";
const { width, height } = Dimensions.get("screen");

const changePasswordScreen = ({navigation}) =>{

    const [email,setEmail] = useState("");
    const [title,setTitle] = useState("");
    const [type,setType] = useState("");

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
            setTitle("Ha ocurrido un error: "+error);
        });
    }


    return(
        
        <View style={styles.container}>
            <Alert type="error" title="Se envio un correo para que cambies tu contraseña!"/>
            {/* {type ? <Alert type={type} title={title}/>:null} */}
            <View style={{flex:0.2}}><Text style={{color:"#fff",margin:10, fontSize:width*0.06}}>Para cambiar tu contraseña:</Text></View>
            <TextInput
                placeholder="Ingresa tu correo"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <Button disabled={type == "success"?true:false} disabledStyle={styles.disabled} disabledTitleStyle={styles.disabledTxt} title="Enviar E-mail" onPress={handlePasswordChange} titleStyle={styles.titleBtn} buttonStyle={styles.signUpBtn}/>
            <View style={{display:"flex",flexDirection:"row", marginTop:30, alignItems:"center",justifyContent:"center"}}>
                <Text style={{color:"#fff", fontSize:width*0.04}}>¿Ya cambiaste tu contraseña?</Text>
                <TouchableOpacity onPress={() => { navigation.goBack() }}> 
                <Text style={{color:"#BBFE1B", fontSize:width*0.04}}>  Inicia Sesión</Text>
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
        backgroundColor: "#313030"
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
        backgroundColor: "#0159BB",
    },
    disabled:{
        backgroundColor:"#527ba8",
    },
    disabledTxt:{
        color:"#fff",
    },
})


export default changePasswordScreen;