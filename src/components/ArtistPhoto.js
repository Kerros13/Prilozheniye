import React from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, Dimensions, Image, View } from "react-native";
import { acc } from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");

const Box = ({image,accion}) => {
  return (
    <TouchableOpacity onPress={accion}>
      <View style={styles.caja}>
        <Image style={styles.img} source={image}/>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  caja:{
    height: height*0.25,
    width: width*0.25,
    marginTop:0,
    marginLeft: 5,
    marginRight: 5,
    marginBottom:0,
    justifyContent: "center",
    alignContent: "center",
    overflow: "hidden"
  },
  img:{
    width: "100%",
    height: "100%",
    borderRadius:10,
    resizeMode:"contain",
  }
});

export default Box;