import React, { useContext, useEffect, useState } from "react";
import {StyleSheet,View,ScrollView,FlatList,StatusBar,Dimensions,ActivityIndicator,Modal} from "react-native";
import {Text,Image} from "react-native-elements";
import backend, { youtubeSearch } from "../api/backend";
import getEnvVars from "../../environment";
import {fetchTracks, fetchGenres,_fetchArtists} from "../api/index";
import Card from "../components/Card";
import Box from "../components/Box";
import { Audio } from 'expo-av';
import { ThemeContext } from "../theme";
import { AudioContext } from '../context/AudioProvider';
import { pause, play, resume, playNext } from '../misc/audioController';
import Player from "../player/Player";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Context } from "../context/AuthContext";

const {apikeyM} = getEnvVars();

const {width, height} = Dimensions.get("window");



const HomeScreen = ({navigation}) => {

    const [tracks,setTracks] = useState(null);
    const [item,setItem] = useState(null);
    const [genres,setGenres] = useState(null);
    const [artists,setArtists] = useState(null);
    const [error,setError] = useState(false);

    const {theme, ContextStyles} = useContext(ThemeContext); 
    const context = useContext(AudioContext);

    const [open,setOpen] = useState(false);

    const openModal = () =>{
        setOpen(true);
    };

    const closeModal = () =>{
        setItem(null);
        setOpen(false);
    }

    const handleAudioPress = async(audio) => {
        const {
            soundObj,
            playbackObj,
            currentAudio,
            updateState,
            audioFiles,
        } = context;
        // playing audio for the first time.
        if (soundObj === null) {
            const playbackObj = new Audio.Sound();
            const status = await play(playbackObj, audio.preview);
            updateState(context, {
              currentAudio: audio,
              playbackObj: playbackObj,
              soundObj: status,
              isPlaying: true,
              image_uri: audio.album.cover_big
            });
            playbackObj.setOnPlaybackStatusUpdate(context.onPlaybackStatusUpdate);
        }
    
        // select another audio
        if (soundObj.isLoaded && currentAudio.id !== audio.id) {
            const status = await playNext(playbackObj, audio.preview);
            updateState(context, {
            currentAudio: audio,
            soundObj: status,
            isPlaying: true,
            image_uri: audio.album.cover_big
            });
            
        }
    };

    // const getSong = async (name) => {
    //     const res = await youtubeSearch.get('/search', {
    //       params: {
    //         q: name,
    //         maxResults: 1,
    //       },
    //     });
    //     setSongId(res.data.items[0].id.videoId);
    //     //console.log(songId);
    //     openModal();
    // };

    const getSong = async (item) => {
        setItem(item);
        openModal();
    };

    const getTracks = async () => {
        const newTracks = await fetchTracks();
        setTracks(newTracks);
        //console.log(tracks);
    };

    const getGenres = async () => {
        const newGenres = await fetchGenres();
        setGenres(newGenres);
        //console.log(newGenres);
    };

    const getArtists = async () => {
        const newArtists = await _fetchArtists();
        setArtists(newArtists);
        // console.log(newArtists);
    }
    
    useEffect(()=>{

        getTracks();
        getGenres();
        getArtists();

    },[])

    if(!tracks || !genres || !artists){
        return(
            <View style={[{flex:1,alignItems:"center",justifyContent:"center"},ContextStyles[`container${theme}`]]}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        )
    }
    
    return(
        <View   style={[styles.container,ContextStyles[`container${theme}`]]}>
            <StatusBar 
                translucent
                backgroundColor={"transparent"}
                barStyle={theme == "dark" ? "light-content" : "dark-content"}
                hidden={false}/>
            <ScrollView  showsVerticalScrollIndicator={false}>
                <View style={styles.sections}>
                    <Text h2 style={[styles.text,ContextStyles[`text${theme}`]]}>Top Canciones</Text>
                    <FlatList
                        contentContainerStyle={styles.list}
                        data={tracks}
                        horizontal={true}
                        keyExtractor={(item)=>item.id.toString()}
                        showsHorizontalScrollIndicator={false}

                        renderItem={({item}) => {
                            return(
                                <Box style={0}tittle={item.title} accion={()=>{handleAudioPress(item)}} image={{uri:item.album.cover_big}}  />
                            )
                        }
                    }
                    />
                </View>
                <View style={styles.sections}>
                    <Text h2 style={[styles.text,ContextStyles[`text${theme}`]]}>Géneros</Text>
                    <FlatList
                        contentContainerStyle={styles.list}
                        data={genres}
                        horizontal={true}
                        keyExtractor={(item)=>item.id.toString()}
                        showsHorizontalScrollIndicator={false}

                        renderItem={({item}) => {
                            return(
                                <TouchableOpacity onPress={() => navigation.navigate("genre", {data: item})}>
                                    <Box style={0} tittle={item.name} image={{uri:item.picture_big}}/>
                                </TouchableOpacity>
                            )
                        }
                    }
                    />
                </View>
                <View style={styles.sections}>
                    <Text h2 style={[styles.text,ContextStyles[`text${theme}`]]}>Top Artistas</Text>
                    <FlatList
                        contentContainerStyle={styles.list}
                        data={artists}
                        horizontal={true}
                        keyExtractor={(item)=>item.artist.artist_id.toString()}
                        showsHorizontalScrollIndicator={false}
                        
                        renderItem={({item}) => {
                            return(
                                <TouchableOpacity onPress={() => navigation.navigate("artist", {data: item})}>
                                    <Box tittle={
                                        item.artist.artist_credits.artist_list.length > 0 ? 
                                        item.artist.artist_credits.artist_list[0].artist.artist_name : 
                                        item.artist.artist_name
                                                } 
                                        image={{uri:item.image_url}}
                                        style={0}
                                    />
                                </TouchableOpacity>
                            )
                        }
                    }
                    />  
                </View>
                <View style={{height:height*0.08}}></View>  
            </ScrollView>
            {item ? 
                <Modal animationType="slide" visible={open} style={{flex:1}} transparent={false}>
                    <Icon name="chevron-down" size={25} color={theme == "dark" ? "#fff" : "#000"} style={{position:'absolute', zIndex:2,margin:5,padding:15}} onPress={()=>closeModal()} />
                    <Player item={item}/>
                </Modal>:null
            }
            
        </View>
    )


};


const styles = StyleSheet.create({

    container:{
        marginTop:0,
        flex:1,
    },
    sections: {
        marginTop: 10,
    },
    text:{
        marginLeft:10
    },
    list: {
        justifyContent: 'center',
        flexDirection: 'row',
      }
})


export default HomeScreen;