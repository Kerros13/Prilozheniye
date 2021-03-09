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
          <Image style={{width: width*0.49,height: height*0.23,borderRadius:10,}} source={image}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.prevButton} onPress={onPressPreview}>
            <Icon name='play' size={20} color='#fff' type='ionicon' containerStyle={styles.iconC}/>
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
      height:40,
      width:40,
      borderRadius:50,
      top:"-40%",
      left:"3%",
      backgroundColor:"#0159BB",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
    },
    iconC:{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
    },
    texto:{
      color:'#fff',
      backgroundColor:'#000',
      top:'73%',
      position:"absolute",
      padding:5,
      fontSize:16,
      fontWeight:"bold",
  },
});

export default BoxS;