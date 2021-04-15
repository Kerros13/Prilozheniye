import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View, Text, StatusBar, FlatList, ScrollView, ActivityIndicator, RefreshControlBase} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import {_fetchArtists, _fetchAlbums} from "../api/index";
import Box from "../components/Box";
import { ThemeContext } from "../theme";

const { width, height } = Dimensions.get("screen");

const artistScreen = ({route, navigation}) => {

    const [artists,setArtists] = useState(null);
    const [album,setAlbum] = useState(null);
    const [newAlbums,setNewAlbums] = useState(null);

    const {data} = route.params;

    const artist_name = data.artist.artist_credits.artist_list.length > 0 ? 
    data.artist.artist_credits.artist_list[0].artist.artist_name : 
    data.artist.artist_name;

    const getArtists = async () => {
        const newArtists = await _fetchArtists();
        setArtists(newArtists);
    }

    const getAlbum = async (name) => {
        const endpoint = `https://api.deezer.com/search?q=${name}`;
  
        const response = await fetch(endpoint);
        const data2 = await response.json();
    
        setAlbum(data2.data);
        
    };

    const setArray = ()=>{
        let array =[]
        album.forEach((a)=>{
            if(array.length==0){
                array.push(a.album)
            }
            else{
                let bandera=0;
                array.forEach((b)=>{
                    if(a.album.id==b.id){
                        bandera=1;
                    }
                })
                if(bandera==0){
                    array.push(a.album)
                }
               
            }
        })

        setNewAlbums(array);
        // console.log(newAlbums);
  
    }

    const {theme, ContextStyles} = useContext(ThemeContext);

    useEffect(()=>{
        getArtists();
        getAlbum(artist_name);
    },[])

    useEffect(()=>{
        if(album){
            setArray(); 
        }
    },[album])

    if((!artists && !newAlbums) || !data){
        return(
            <View style={[{flex:1,alignItems:"center",justifyContent:"center"},ContextStyles[`container${theme}`]]}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        )
    }

    return (
        <View style={[styles.container,ContextStyles[`container${theme}`]]}>
            <StatusBar 
                translucent
                backgroundColor={"transparent"}
                barStyle={'light-content'}
                hidden={false}
            />
            
            <View style={styles.info}>
            <Ionicons name="arrow-back" size={width*0.09} color={theme == "dark" ? "white":"#2A2D2E"} onPress={() => {navigation.pop()}} style={{position:"absolute", left:'3%', top:'20%'}}/>   
                <Box image={{uri:data.image_url}} style={3}/>
                <View style={styles.info2}>
                        <View style={styles.info1}>
                            <Text style={styles.name}>{data.artist.artist_name}</Text>
                            <Text style={styles.data}>Rating: {data.artist.artist_rating}</Text>
                            <Text style={styles.data}>País: {data.artist.artist_country}</Text>
                            <Text style={styles.data}>Nacimiento: {data.artist.begin_date}</Text>
                        </View>
                </View>
            </View>
                <View style={styles.extra}>
                    <Text style={[theme == 'dark' ? {color:'#fff'}:{color:'#000'},styles.albumsTitle]}>Álbumes</Text>
                    <FlatList
                        data={newAlbums}
                        columnWrapperStyle={{justifyContent:'space-between', }}
                        horizontal={false}
                        numColumns={2}
                        keyExtractor={(item)=>item.id.toString()}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item}) => {
                            return(
                                <Box tittle={item.title} accion={()=>{navigation.navigate("songsbyalbum",{data:item})}}
                                    image={{uri:item.cover_big}} style={2}
                                />                           
                            )
                        }}
                    />
                    <View style={{marginBottom:'18%'}}></View>
                </View>
        </View>
    );
};


const styles = StyleSheet.create({

    container:{
        flex: 9,
    },
    aaa:{
        height: height*0.03,
        backgroundColor: '#bbb',
    },
    info:{
        flex: 2,
        color: '#fff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#777',
    },
    info1:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 10,
    },
    info2:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    name:{
        fontSize: height*0.035,
        color: '#fff',
    },
    data:{
        fontSize: height*0.02,
        color: '#fff',
    },
    extra:{
        flex: 7,
    },
    albums:{
    },
    albumsTitle: {
        marginLeft: 10,
        fontSize: 33,
        fontWeight: 'bold',
    },
    artits:{
    },
    artitsTitle: {
        marginLeft: 10,
        color: "#fff",
        fontSize: 33,
        fontWeight: 'bold',
    },
})


export default artistScreen;