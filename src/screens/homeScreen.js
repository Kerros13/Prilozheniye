import React, { useEffect, useState } from "react";
import {StyleSheet,View,ScrollView,FlatList,StatusBar,Dimensions,ActivityIndicator} from "react-native";
import {Text,Image} from "react-native-elements";
import backend from "../api/backend";
import getEnvVars from "../../environment";
import {fetchTracks, fetchGenres,_fetchArtists } from "../api/index";
import Card from "../components/Card";
import Box from "../components/Box";
import { abs } from "react-native-reanimated";

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

    // const getArtists = async () => {
    //     try {
    //         const response = await backend.get(`chart.artists.get?page=1&page_size=10&country=us&apikey=${apikeyM}`);
    //         setArtists(response.data.message.body.artist_list);
    //         console.log(artists);
    //     } catch (error) {
    //         setError(true);
            
    //     }
    // }

    const getArtists = async () => {
        const newArtists = await _fetchArtists();
        setArtists(newArtists);
        console.log(newArtists);
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

        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
            <Text h2>Genres</Text>
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
            <Text h2>Top Artists</Text>
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
        </ScrollView>

    )


};


const styles = StyleSheet.create({

    container:{
        marginTop:StatusBar.currentHeight,
        backgroundColor:'#fff',
        flex:1,
    },
})


export default HomeScreen;