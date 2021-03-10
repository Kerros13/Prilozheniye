import React, { useState } from "react";
import { View,StyleSheet, Text,TextInput,Dimensions,TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
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
            setTitle("Ha ocurrido un error:"+error);
        });
    }


    return(

        <View style={styles.container}>
            {type ? <Alert type={type} title={title}/>:null}
            <TextInput
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <Button title="Reset Password Email" onPress={handlePasswordChange} buttonStyle={styles.signUpBtn}/>
            <View style={{display:"flex",flexDirection:"row", marginTop:30, alignItems:"center",justifyContent:"center"}}>
                <Text style={{color:"#fff", fontSize:width*0.04}}>Already reset your password?</Text>
                <TouchableOpacity onPress={() => { navigation.goBack() }}> 
                <Text style={{color:"#BBFE1B", fontSize:width*0.04}}>  Sign-in</Text>
                </TouchableOpacity>
            </View>
        </View>
    )


}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
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
    signUpBtn: {
        width: width*0.7,
        height: height*0.07,
        borderRadius:50,
        marginHorizontal: 3,
        backgroundColor: "#0159BB",
    }
})


export default changePasswordScreen;