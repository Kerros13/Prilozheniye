import React from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, Dimensions, Image, View } from "react-native";
import { acc } from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");

const Box = ({tittle, image, accion, style }) => {
  let estilo = style == 0 ? styles.caja : (style == 1 ? styles.genres : (style == 2 ? styles.artist : (style == 3 ? styles.artistPhoto : styles.caja)))
  return (
    <TouchableOpacity onPress={accion}>
      <View style={estilo}>
        <Image style={ styles.img} source={image}/>
        {style == 3 ? null :<Text style={styles.texto} numberOfLines={1}>{tittle}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  caja:{
    height: height*0.25,
    width: width*0.49,
    marginTop:5,
    marginBottom:15,
    justifyContent: "center",
    alignContent: "center",
    overflow: "hidden"
  },
  genres:{
    height: width*0.32,
    width: width*0.32,
    marginLeft: 5,
    justifyContent: "center",
    alignContent: "center",
    overflow: "hidden"
  },
  artist:{
    height: width*0.45,
    width: width*0.45,
    resizeMode:"contain",
    marginTop:10,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center",
    alignContent: "center",
    overflow: "hidden"
  },
  artistPhoto:{
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