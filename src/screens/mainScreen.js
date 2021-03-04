import React from "react";
import { View,StyleSheet,Text, Image, Dimensions } from "react-native";
import { Button,Header } from 'react-native-elements';
import * as Font from "expo-font";
import Icon from 'react-native-vector-icons/FontAwesome';


const {width, height} = Dimensions.get("window");

const mainScreen = ({navigation}) => {

    return(
        <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Image style={styles.image} source={require("../../assets/qwerty.png")}/>
                    <Text style={styles.textTitulo}>PRILOZ</Text>
                </View>
                <View style={styles.signContainer}>
                    <Image style={styles.bgimage} source={require("../../assets/g44.png")}/>
                    <Button
                        buttonStyle={styles.signInBtn}
                        title="Sign-In"
                        titleStyle={{color:"#fff", fontFamily: "PlayfairDisplay", fontSize:22,}}
                        type="solid"
                        onPress={()=>{navigation.navigate("signin")}}
                        icon={
                            <Icon
                              name="sign-in"
                              size={25}
                              color="#fff"
                            />
                        }
                        iconLeft
                    />
                    <Button
                        buttonStyle={styles.signUpBtn}
                        title="Sign-Up"
                        titleStyle={{color:"#000", fontFamily: "PlayfairDisplay", fontSize:22,}}
                        type="solid"
                        onPress={()=>{navigation.navigate("signup")}}
                        icon={
                            <Icon
                              name="user-plus"
                              size={25}
                              color="#000"
                            />
                        }
                        iconLeft
                    />
                </View>
                <View style={styles.tabsContainer}>
                    <Button
                        buttonStyle={styles.tabsBtn}
                        title="Tabs"
                        titleStyle={{color:"#000", fontFamily: "PlayfairDisplay",}}
                        type="solid"
                        onPress={()=>{navigation.navigate("tab")}}
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
        backgroundColor:"#313030",
    },
    iconContainer: {
        marginRight:10,
    },
    titleContainer: {
        flexDirection:"row", 
        flex: 2, 
        justifyContent: "center", 
        alignItems: "center",
    },
    image:{
        top: "-6%",
        width: 39,
        height: 106,
        transform: [{ rotate: '20deg' }],
    },
    textTitulo:{
        color:"#BBFE1B",
        fontSize: 72,
        fontFamily: "mistral",
        alignContent:"center",
        alignItems: "center",
        marginBottom: 10,
    },
    imgContainer:{
        display: "flex",
        flex:3,
    },
    bgimage: {
        width: 140,
        height: height*0.6,
        position: "absolute",
        top: height*0.1,
        left: width*0.45,
    },
    signContainer: {
        display: "flex",
        flex:4,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    signInBtn: {
        width: width*0.55,
        height: height*0.12,
        borderRadius:50,
        borderColor:"#000",
        marginHorizontal: 3,
        backgroundColor: "#0159BB",
        marginBottom:15,
    },
    signUpBtn: {
        width: width*0.55,
        height: height*0.12,
        borderRadius:50,
        borderColor:"#000",
        marginHorizontal: 10,
        backgroundColor: "#BBFE1B",
    },
    tabsContainer: {
        display: "flex",
        flex:1,
        justifyContent:"flex-end",
        alignItems:"center",
        marginBottom:5,
    },
    tabsBtn:{
        width:width*0.95,
        height:height*0.06,
        borderRadius:50,
        backgroundColor: "#fff",
    },

})

export default mainScreen;