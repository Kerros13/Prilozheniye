import React from "react";
import { StyleSheet, Text, Dimensions, Image, View } from "react-native";

const { width, height } = Dimensions.get("screen");

const Box = ({tittle, image}) => {
  return (
    <View style={styles.caja}>
      <View style={styles.image}>
        <Image style={{width:200,height:200,borderRadius:10,}} source={image}/>
      </View>
      <View>
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
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      paddingTop:0,
      borderBottomColor:"#1e1e1e",
    },
    texto:{
      width: width*0.49,
      color:'#1E1E1E',
      top:'80%',
      position:"absolute",
      padding:5,
      fontSize:16,
      fontWeight:"bold",
  },
});

export default Box;