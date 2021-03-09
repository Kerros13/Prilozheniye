import React from "react";
import { StyleSheet, Text, Dimensions, Image, View } from "react-native";

const { width, height } = Dimensions.get("screen");

const Box = ({tittle, image}) => {
  return (
    <View style={styles.caja}>
        <Image style={{width: width*0.49,height: height*0.23,borderRadius:10,}} source={image}/>
        <Text style={styles.texto}>{tittle}</Text>
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
      justifyContent: "center",
      alignContent: "center",
    },
    texto:{
      color:'#fff',
      backgroundColor:'#000',
      top:'78%',
      position:"absolute",
      padding:5,
      fontSize:16,
      fontWeight:"bold",
  },
});

export default Box;