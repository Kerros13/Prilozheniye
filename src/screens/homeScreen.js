import React, { useEffect, useState } from "react";
import {StyleSheet,View,ScrollView,FlatList,StatusBar,Dimensions} from "react-native";
import {Text,Image} from "react-native-elements";
import backend from "../api/backend";
import getEnvVars from "../../environment";
import fetchTracks from "../api/index";
import Card from "../components/Card";
import { abs } from "react-native-reanimated";


const {apikeyM} = getEnvVars();
const {width, height} = Dimensions.get("window");


const HomeScreen = ({navigation}) => {

    const [tracks,setTracks] = useState(null);
    const [error,setError] = useState(false);

    // const getTracks = async() => {
    //     try {
    //         const response = await backend.get(`track.get?commontrack_id=5920049&apikey=${apikeyM}`);
    //         console.log(response.data.message.body);
    //         setTracks(response.data.message.body);
    //     } catch (error) {
    //         setError(true);
    //         console.log(error);
    //     }
        
        
    // }

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
            <View style={styles.container}>
                <Text>No se han encontrado canciones</Text>
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
                        <Card>
                            <Image
                                style={{width:200,height:200}}
                                source={{uri:item.album.cover_big}}
                            
                            />
                            <Text style={styles.texto}>{item.title}</Text>
                        </Card>
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


})


export default HomeScreen;