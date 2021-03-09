import React, { useEffect, useState } from "react";
import {StyleSheet,View,ScrollView,FlatList,StatusBar,Dimensions,ActivityIndicator} from "react-native";
import {Text,Image} from "react-native-elements";
import backend from "../api/backend";
import getEnvVars from "../../environment";
import {fetchTracks, fetchGenres,_fetchArtists} from "../api/index";
import Card from "../components/Card";
import Box from "../components/Box";
import BoxS from "../components/Box Song";
import { abs } from "react-native-reanimated";
import Header from '../components/Header.js';

const {apikeyM} = getEnvVars();

const {width, height} = Dimensions.get("window");


const HomeScreen = ({navigation}) => {

    const [tracks,setTracks] = useState(null);
    const [genres,setGenres] = useState(null);
    const [artists,setArtists] = useState(null);
    const [error,setError] = useState(false);


    const getTracks = async () => {
        const newTracks = await fetchTracks();
        setTracks(newTracks);
    };

    const getGenres = async () => {
        const newGenres = await fetchGenres();
        setGenres(newGenres);
        // console.log(newGenres);
    };

    const getArtists = async () => {
        const newArtists = await _fetchArtists();
        setArtists(newArtists);
        //console.log(newArtists);
    }
    
    useEffect(()=>{

        getTracks();
        getGenres();
        getArtists();

    },[])

    if(!tracks || !genres || !artists){
        return(
            <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                <ActivityIndicator size="large" color="blue"/>
            </View>
        )
    }
    
    return(
        <View   style={styles.container}>
            <ScrollView  showsVerticalScrollIndicator={false}>
                <View style={styles.sections}>
                    <Text h2 style={{marginLeft: 10, color:"#fff"}}>Top Canciones</Text>
                    <FlatList
                        data={tracks}
                        horizontal={true}
                        keyExtractor={(item)=>item.id.toString()}
                        showsHorizontalScrollIndicator={false}

                        renderItem={({item}) => {
                            return(
                                <BoxS tittle={item.title} image={{uri:item.album.cover_big}}  />
                            )
                        }
                    }
                    />
                </View>
                <View style={styles.sections}>
                    <Text h2 style={{marginLeft: 10, color:"#fff"}}>Géneros</Text>
                    <FlatList
                        
                        data={genres}
                        horizontal={true}
                        keyExtractor={(item)=>item.id.toString()}
                        showsHorizontalScrollIndicator={false}

                        renderItem={({item}) => {
                            return(
                                <Box tittle={item.name} image={{uri:item.picture_big}}/>
                            )
                        }
                    }
                    />
                </View>
                <View style={styles.sections}>
                    <Text h2 style={{marginLeft: 10, color:"#fff"}}>Top Artistas</Text>
                    <FlatList
                        data={artists}
                        horizontal={true}
                        keyExtractor={(item)=>item.artist.artist_id.toString()}
                        showsHorizontalScrollIndicator={false}

                        renderItem={({item}) => {
                            return(
                                
                                <Box tittle={
                                item.artist.artist_credits.artist_list.length > 0 ? 
                                item.artist.artist_credits.artist_list[0].artist.artist_name : 
                                item.artist.artist_name
                                        } 
                                image={{uri:item.image_url}}
                                />
                                
                            )
                        }
                    }
                    />  
                </View>
            </ScrollView>
        </View>
    )


};


const styles = StyleSheet.create({

    container:{
        marginTop:0,
        backgroundColor:'#1E1E1E',
        flex:1,
    },
    sections: {
        marginTop: 10,
    },
})


export default HomeScreen;