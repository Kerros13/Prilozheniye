import React from "react";
import { StyleSheet, Text, Dimensions, Image, View, } from "react-native";
import {Button, } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get("screen");

const BoxS = ({tittle, image}) => {
  return (
    <View style={styles.caja}>
      <View style={styles.image}>
        <Image style={{width:200,height:200,borderRadius:10,}} source={image}/>
        <Button buttonStyle={styles.prevButton} iconContainerStyle={styles.icon} icon={{
            name: "arrow-right",
            size: 30,
            color: "white"
          }} iconRight
        ></Button>
        <Text style={styles.texto}>{tittle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    caja:{
      height: height*0.25,
      width: width*0.49,
      marginTop:10,
      marginLeft: 10,
      marginBottom:20,
      alignContent: "center",
    },
    image:{
      paddingTop:0,
      borderBottomColor:"#1e1e1e",
    },
    prevButton:{
      height:40,
      width:40,
      borderRadius:50,
      top:"-25%",
      left:"20%",
      backgroundColor:"#BBFE1B"
    },
    icon:{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      height:40,
      width:40,
    },
    texto:{
      width: width*0.49,
      color:'#1E1E1E',
      top:'82%',
      position:"absolute",
      padding:5,
      fontSize:16,
      fontWeight:"bold",
  },
});

export default BoxS;