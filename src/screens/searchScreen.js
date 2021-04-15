import React,{useEffect,useState,useContext} from "react";
import {View,FlatList,ActivityIndicator,StatusBar,Dimensions,StyleSheet} from "react-native";
import {Text} from "react-native-elements";
import { backend } from "../api/backend";
import getEnvVars from "../../environment";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { ThemeContext } from "../theme";
import { AudioContext } from '../context/AudioProvider';
import Box from "../components/Box";
import Icon from "react-native-vector-icons/FontAwesome";
import { Audio } from 'expo-av';
import { play, playNext } from '../misc/audioController';

const {width, height} = Dimensions.get("window");
const {apikeyM} = getEnvVars();

const searchScreen = ({navigation}) => {

    const [tracks,setTracks] = useState(null);
    const [search,setSearch] = useState("");
    const [genres,setGenres] = useState(null);
    const [artists,setArtists] = useState(null);
    const [isloading,setIsLoading] = useState("");


    //Context Variables
    const {theme, ContextStyles} = useContext(ThemeContext); 
    const context = useContext(AudioContext);

    //Funciones
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

    const artistSearch = async(input) =>{
        const q_artists = await backend.get(`artist.search?q_artist=${input}&apikey=${apikeyM}`);
        setArtists(q_artists.data.message.body.artist_list[0]);
    }

    const trackSearch = async(input) =>{
        const endpoint = `https://api.deezer.com/search?q=${input}`;
  
        const response = await fetch(endpoint);
        const data = await response.json();
    
        setTracks(data.data)
        setIsLoading(false)
    }

    const handleSearch = () =>{
        if(search){
            trackSearch(search);
            setIsLoading(true);
        }
    }

    useEffect(()=>{
        if(!search){
            setTracks(null)
        }
    },[search])

    if(isloading){
        return(
            
            <View style={[{flex:1,alignItems:"center"},ContextStyles[`container${theme}`]]}>
                <View style={{flexDirection:"row",marginTop:StatusBar.currentHeight+height*0.02}}>
                    <TextInput placeholderTextColor="#000" style={{color:"#000",borderRadius:width*0.01,width:width*0.8,backgroundColor:"white",height:height*0.075, fontSize: width*0.05}} placeholder="Busqueda..."/>
                    <TouchableOpacity>
                        <View style={{marginLeft:5,width:width*0.14,height:width*0.14,borderRadius:50,alignItems:"center",backgroundColor:ContextStyles[`iconheader${theme}`].color}}>
                            <Icon name="search" color="white" size={width*0.08} style={{marginTop:height*0.01}} />
                        </View>
                    </TouchableOpacity>                
                </View>
                <View style={{flex:2,alignItems:"center",justifyContent:"center"}}>
                    <ActivityIndicator size="large" color="blue" />
                </View>
            </View>
        )
    }

    if(!tracks && !isloading){
        return(
            
            <View style={[{flex:1,alignItems:"center"},ContextStyles[`container${theme}`]]}>
                <View style={{flexDirection:"row",marginTop:StatusBar.currentHeight+height*0.02}}>
                    <TextInput placeholderTextColor="#000" onChangeText={setSearch} value={search} style={{color:"#000",borderRadius:width*0.01,width:width*0.8,backgroundColor:"white",height:height*0.075, fontSize: width*0.05}} placeholder="Busqueda..."/>
                    <TouchableOpacity onPress={handleSearch}>
                        <View style={{marginLeft:5,width:width*0.13,height:width*0.13,borderRadius:50,alignItems:"center",backgroundColor:ContextStyles[`iconheader${theme}`].color}}>
                            <Icon name="search" color="white" size={width*0.08} style={{marginTop:height*0.01}} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{flex:2,alignItems:"center",justifyContent:"center"}}>
                <Text h4 style={[styles.text,ContextStyles[`text${theme}`]]}>Busca Canciones, Artistas, etc...</Text>
                </View>
            </View>
        )
    }


    return(
        
        
        <View style={[{flex:1,alignContent:"center",justifyContent:"center"},ContextStyles[`container${theme}`]]}>
            <View style={{flexDirection:"row",marginTop:StatusBar.currentHeight+height*0.02}}>
                <TextInput placeholderTextColor="#000" onChangeText={setSearch} value={search} style={{color:"#000",borderRadius:width*0.01,width:width*0.8,backgroundColor:"white",height:height*0.075, fontSize: width*0.05}} placeholder="Busqueda..."/>
                <TouchableOpacity onPress={handleSearch}>
                    <View style={{marginLeft:5,width:width*0.13,height:width*0.13,borderRadius:50,alignItems:"center",backgroundColor:ContextStyles[`iconheader${theme}`].color}}>
                        <Icon name="search" color="white" size={width*0.08} style={{marginTop:height*0.01}} />
                    </View>
                </TouchableOpacity>            
            </View>
            <FlatList
                numColumns={2}  
                data={tracks}
                style={{marginTop:10}}
                keyExtractor={(item)=>item.id.toString()}
                showsHorizontalScrollIndicator={false}

                renderItem={({item}) => {
                    return(
                        <TouchableOpacity onPress={()=>{handleAudioPress(item)}}>
                            <Box style={0} tittle={item.title} image={{uri:item.album.cover_big}}/>
                        </TouchableOpacity>
                    )
                    }
                }
            />
        </View>
    )

};

const styles = StyleSheet.create({
    text:{
        marginLeft:10
    }
})


export default searchScreen;