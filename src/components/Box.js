import React from "react";
import { StyleSheet, Text, Dimensions, Image, View } from "react-native";

const { width } = Dimensions.get("screen");

const Box = ({tittle, image}) => {
  return (
    <View style={styles.caja}>
      <Image style={{width:200,height:200}} source={image}/>
      <Text style={styles.texto}>{tittle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    caja:{
      height:200,
      width: 200,
      marginTop:10,
      marginLeft: 5,
      marginBottom:20,
      justifyContent: "center",
      alignContent: "center",
    },
    texto:{
      color:'#fff',
      backgroundColor:'#000',
      color:'#fff',
      top:'80%',
      position:"absolute",
      paddingTop:5,
      paddingBottom:5,
      paddingRight:5,
      paddingLeft:5
  },
});

export default Box;