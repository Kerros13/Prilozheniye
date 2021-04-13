import React, { useRef, useEffect, useState,useContext } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  StyleSheet,
} from "react-native";

//import songs from "./data.json";
import { Audio } from 'expo-av';

import { SongContext } from "../context/SongContext";
import { AudioContext } from '../context/AudioProvider';
import { ThemeContext } from "../theme";
import { youtubeSearch,musicAPI} from "../api/backend";
import { ActivityIndicator } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { pause, play, resume, playNext } from '../misc/audioController';

const { width, height } = Dimensions.get("window");

export default function Player({item,bandera}) {
  const [sound, setSound] = useState(null);
  const [state,setState] = useState("");  

  const [{ currentVideoSnippet, audio }, dispatch] = useContext(
    SongContext
  );

  const {theme, ContextStyles} = useContext(ThemeContext); 

  const {isPlaying} = useContext(AudioContext);
  const context = useContext(AudioContext);

  const setCurrentVideoSnippet = (data) => {
    dispatch({ type: 'setCurrentVideoSnippet', snippet: data });
  };
 
  // const fetchAndSetCurrentVideoSnippet = (id) => {
  //   youtubeSearch
  //     .get('videos', {
  //       params: {
  //         id: id,
  //       },
  //     })
  //     .then((res) => {
  //       const item = res.data.items[0];
  //       // console.log(item);
  //       setCurrentVideoSnippet({
  //         id: item.id,
  //         title: item.snippet.title,
  //         channelTitle: item.snippet.channelTitle,
  //         maxThumbnail: `https://img.youtube.com/vi/${item.id}/maxresdefault.jpg`,
  //         sdThumbnail: `https://img.youtube.com/vi/${item.id}/sddefault.jpg`,
  //         // this is the url of the max resolution of thumbnail
  //       });
  //       console.log(currentVideoSnippet);
  //     });
  // };

  // const getAudio = async (data) => {
  //   const res = await musicAPI.get('/song', {
  //     params: { id: data },
  //   });
  //   playSound(res.data);
  // }

  const SetCurrentVideoSnippet = (item) => {
    setCurrentVideoSnippet({
      id: item.id,
      title: item.title,
      artist: item.artist.name,
      image: item.album.cover_big,
      preview:item.preview
    });
  };

  const handleifPlaying = async() =>{
    if (context.soundObj && context.soundObj.isPlaying) {
      const status = await pause(context.playbackObj);
      return context.updateState(context, {
        soundObj: status,
        isPlaying: false,
      });
    }
  }

  const playSound = async(url) => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        {uri: url}
      );
      setSound(sound);
      await sound.playAsync();
      setState("playing");
    } catch (error) {
      
    }
  }

  const playPause = async () =>{
     if(state=="playing"){
      await sound.pauseAsync();
      setState("paused");
     }else{
      await sound.playAsync();
      setState("playing");
     }
  }

  // const getAudio = async (data) => {
  //   const res = await musicAPI.get('/song', {
  //     params: { id: data },
  //   });
  //   playSound(res.data);
  // }

  useEffect(()=>{
    SetCurrentVideoSnippet(item);
    handleifPlaying()
    //fetchAndSetCurrentVideoSnippet(id);
  },[])

  useEffect(()=>{
  
    playSound(currentVideoSnippet.preview);

  },[currentVideoSnippet])

  // useEffect(()=>{
  //   if(context.soundObj.isPlaying){
  //     const status = await pause(context.playbackObj);
  //     return context.updateState(context, {
  //       soundObj: status,
  //       isPlaying: false,
  //     });
  //   }
  // },[context])


  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
          //setAudio(sound);
        }
      : undefined;
    
  }, [sound]);


  if(!currentVideoSnippet){
    return(
      <View style={styles.container}>
        <ActivityIndicator size={25} color="blue"/>
      </View>
    )
  }

  return (
    <SafeAreaView style={[styles.container,ContextStyles[`container${theme}`]]}>
      <SafeAreaView style={{ height: 320,alignItems:"center" }}>
        <Image style={styles.image} source={{uri:currentVideoSnippet.image}}/>
      </SafeAreaView>
      
      <View>
        <Text style={[styles.title,ContextStyles[`text${theme}`]]}>{currentVideoSnippet.title}</Text>
        <Text style={[styles.artist,ContextStyles[`text${theme}`]]}>{currentVideoSnippet.artist}</Text>
      </View>
      
      <View style={[styles.containerController,ContextStyles[`container${theme}`]]}>
        <TouchableOpacity>
          <MaterialIcons name={state == "playing" ? "pause": "play-arrow"} onPress={playPause} size={45} color={theme == "dark" ? "#fff" : "#000"}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    textAlign: "center",
    textTransform: "capitalize",
  },
  artist: {
    fontSize: 18,
    textAlign: "center",
    textTransform: "capitalize",
  },
  container: {
    justifyContent: "center",
    height: height,
  },
  image:{
    height:320,
    width:320
  },
  containerController: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});