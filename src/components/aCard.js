import React from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, Dimensions, Image, View } from "react-native";
import { acc } from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");

const BoxCard = ({tittle, image,accion}) => {
  return (
    <TouchableOpacity onPress={accion}>
      <View style={styles.caja}>
        <Image style={styles.img} source={image}/>
        <Text style={styles.texto}>{tittle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  caja:{
    height: height*0.25,
    width: width*0.38,
    marginTop:10,
    marginLeft: 35,
    justifyContent: "center",
    alignContent: "center",
    overflow: "hidden"
  },
  texto:{
    color:'#fff',
    backgroundColor:'rgba(0,0,0,0.7)',
    top:'68%',
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

export default BoxCard;