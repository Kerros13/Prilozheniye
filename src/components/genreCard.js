import React from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, Dimensions, Image, View } from "react-native";
import { acc } from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");

const BoxCard1 = ({tittle, image,accion}) => {
  return (
    <View>
        <View style={styles.caja}>
            <Image style={styles.img} source={image}/>
            <Text style={styles.texto}>{tittle}</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  caja:{
    height: height*0.2,
    width: width*0.3,
    marginBottom:5,
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "column",
    overflow: "hidden"
  },
  texto:{
    color:'#fff',
    backgroundColor:'rgba(0,0,0,0.7)',
    top: '-10%',
    padding:5,
    fontSize:width*0.04,
    borderRadius:5,
    textAlign:"center",
  },
  img:{
    width: "100%",
    height: "100%",
    borderRadius:10,
    resizeMode:"contain",
  }
});

export default BoxCard1;