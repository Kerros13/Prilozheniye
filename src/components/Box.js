import React from "react";
import { StyleSheet, Text, Dimensions, Image, View } from "react-native";

const { width, height } = Dimensions.get("screen");

const Box = ({tittle, image}) => {
  return (
    <View style={styles.caja}>
        <Image style={styles.img} source={image}/>
        <Text style={styles.texto}>{tittle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  caja:{
    height: height*0.25,
    width: width*0.49,
    marginTop:10,
    marginLeft: 5,
    marginBottom:20,
    justifyContent: "center",
    alignContent: "center",
    overflow: "hidden"
  },
  texto:{
    color:'#fff',
    backgroundColor:'rgba(0,0,0,0.7)',
    top:'78%',
    left:'5.5%',
    position:"absolute",
    padding:5,
    fontSize:width*0.04,
    borderRadius:5,
  },
  img:{
    width: "100%",
    height: "100%",
    borderRadius:10,
    resizeMode:"contain",
  }
});

export default Box;