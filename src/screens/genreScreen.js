import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View, Text, StatusBar, FlatList, ScrollView, ActivityIndicator, RefreshControlBase} from "react-native";
import {fetchTracks, getNewArtists, _fetchAlbums} from "../api/index";
import Box from "../components/ArtistPhoto";
import BoxCard from "../components/aCard";
import BoxCard1 from "../components/genreCard";
import { ThemeContext } from "../theme";
import getEnvVars from "../../environment";
const {apikeyM} = getEnvVars();

const { width, height } = Dimensions.get("screen");

const genreScreen = ({route, navigation}) => {

    const [artists,setArtists] = useState(null);
    const [newArtists,setNewArtists] = useState(null);
    const [items,setItems] = useState(null);

    const {data} = route.params;

    const {theme, ContextStyles} = useContext(ThemeContext); 

    const [open,setOpen] = useState(false);


    // const openModal = () =>{
    //     setOpen(true);
    // };

    // const closeModal = () =>{
    //     setItem(null);
    //     setOpen(false);
    // }
    
    // const getSong = async (item) => {
    //     setItem(item);
    //     openModal();
    // };

    const cleanArray =()=>{
        let array = [];
        newArtists.forEach((element)=>{
            if(typeof(element.artist) !== "undefined"){
                array.push(element)
            }
        })

        // console.log(array.length);
        // console.log(newArtists.length);

        setItems(array);
    }

    const getNArtists = async(array)=>{
        const nArtists = await getNewArtists(array);
        setNewArtists(nArtists);
    }

    const getArtists = async (id) => {
        const endpoint = `https://api.deezer.com/genre/${id}/artists`;
    
        const response = await fetch(endpoint);
        const data = await response.json();

        setArtists(data.data)
    };
    
    useEffect(()=>{

        getArtists(data.id);

    },[])

    useEffect(()=>{
        if(artists){
            getNArtists(artists)
        }        
    },[artists])

    useEffect(()=>{
        if(newArtists){
            cleanArray()
        }        
    },[newArtists])




    if(!items){
        return(
            <View style={[{flex:1,alignItems:"center",justifyContent:"center"},ContextStyles[`container${theme}`]]}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar 
                translucent
                backgroundColor={"transparent"}
                barStyle={'light-content'}
                hidden={false}/>
            <View style={styles.info}>
                <BoxCard1 tittle={data.name} image={{uri:data.picture_big}}/>
            </View>
            <View style={styles.songBox}>
                <Text style={styles.albumsTitle}>Artistas</Text>
                <FlatList
                        data={items}
                        horizontal={false}
                        numColumns={2}
                        keyExtractor={(item)=>item.artist.artist_id.toString()}
                        showsHorizontalScrollIndicator={false}

                        renderItem={({item}) => {
                            return(
                                <BoxCard tittle={item.artist.artist_name} accion={()=>{navigation.navigate("artist", {data: item})}} numberOfLines={1} image={{uri:item.image_url}}  />
                            )
                        }
                    }
                    />
            </View>
            <View style={{height:'10%'}}></View>
        </View>
    );
};

const styles = StyleSheet.create({

    container:{
        marginTop:0,
        flex:10,
        backgroundColor:"#333",
        
    },
    info:{
        width: width,
        flex: 3,
        backgroundColor: "#777",
        justifyContent: 'center',
        alignItems: 'center',
    },
    songBox:{
        flex: 7,
    },
    albumsTitle: {
        marginLeft: 10,
        color: "#fff",
        fontSize: 33,
        fontWeight: 'bold',
    },
})

export default genreScreen;