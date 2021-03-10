import React from "react";
import { StyleSheet, Text, Dimensions, Image, View, TouchableOpacity, Linking, } from "react-native";
import {Button, } from "react-native-elements";
import { Icon } from 'react-native-elements'

const { width, height } = Dimensions.get("screen");

const BoxS = ({tittle, image, artist}) => {

  
  const urlPreview = "https://cdns-preview-2.dzcdn.net/stream/c-269bb724b66c421cc60de7bd302b1015-10.mp3";
  const urlYoutube = "https://www.youtube.com/watch?v=niqrrmev4mA";

  const onPressYoutube = () => {
    Linking.openURL(urlYoutube);
  }

  const onPressPreview = () => {
    Linking.openURL(urlPreview);
  }

  return (
    <View style={styles.caja}>
        <TouchableOpacity onPress={onPressYoutube}>
          <Image style={styles.img} source={image}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.prevButton} onPress={onPressPreview}>
            <Icon name='play' size={width*0.08} color='#fff' type='ionicon' containerStyle={styles.iconC}/>
        </TouchableOpacity>
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
    alignContent: "center",
  },
  prevButton:{
    height:width*0.1,
    width:width*0.1,
    borderRadius:50,
    top: -(height*0.22)/2,
    left: -width*0.15,
    alignSelf:"center",
    justifyContent:"center",
    backgroundColor:"#0159BB",
  },
  iconC:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
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

export default BoxS;