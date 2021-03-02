import React, { useEffect, useState } from "react";
import {StyleSheet,View,ScrollView,FlatList,StatusBar,Dimensions,ActivityIndicator} from "react-native";
import {Text,Image} from "react-native-elements";
import backend from "../api/backend";
import getEnvVars from "../../environment";
import fetchTracks from "../api/index";
import Card from "../components/Card";
import Box from "../components/Box";
import { abs } from "react-native-reanimated";


const {apikeyM} = getEnvVars();
const {width, height} = Dimensions.get("window");


const HomeScreen = ({navigation}) => {

    const [tracks,setTracks] = useState(null);
    const [error,setError] = useState(false);


    const getTracks = async () => {
        const newTracks = await fetchTracks();
        console.log(newTracks);
        setTracks(newTracks);
    };

    useEffect(()=>{

        getTracks();

    },[])


    if(!tracks){
        return(
            <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                <ActivityIndicator size="large" color="blue"/>
            </View>
        )
    }
    
    return(

        <View style={styles.container}>
            <Text h2>Top Charts</Text>
            <FlatList
                data={tracks}
                horizontal={true}
                keyExtractor={(item)=>item.id.toString()}
                showsHorizontalScrollIndicator={false}

                renderItem={({item}) => {
                    return(
                        <Box tittle={item.title} image={{uri:item.album.cover_big}} />
                    )
                }
            }
            />  
        </View>

    )


};


const styles = StyleSheet.create({

    container:{
        marginTop:StatusBar.currentHeight+50,
        backgroundColor:'#fff',
        flex:1,
    },
})


export default HomeScreen;