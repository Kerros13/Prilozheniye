import React, { useRef, useEffect, useState,useContext } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  FlatList,
  Dimensions,
  Animated,
  StyleSheet,
} from "react-native";

//import songs from "./data.json";
import Controller from "./Controller";
import { Audio } from 'expo-av';

import { SongContext } from "../context/SongContext";
import { youtubeSearch,musicAPI} from "../api/backend";
import { ActivityIndicator } from "react-native-paper";

const { width, height } = Dimensions.get("window");

export default function Player({item,bandera}) {
  const scrollX = useRef(new Animated.Value(0)).current;

  const slider = useRef(null);
  const [songIndex, setSongIndex] = useState(0);
  const [sound, setSound] = useState(null);
  const [state,setState] = useState("");  

  const [{ currentVideoSnippet, audio }, dispatch] = useContext(
    SongContext
  );

  // for tranlating the album art
  const position = useRef(Animated.divide(scrollX, width)).current;

  const setCurrentVideoSnippet = (data) => {
    dispatch({ type: 'setCurrentVideoSnippet', snippet: data });
  };
  const setAudio = (data) => {
    dispatch({ type: 'setAudio', snippet: data });
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

  const SetCurrentVideoSnippet = (item) => {
    setCurrentVideoSnippet({
      id: item.id,
      title: item.title,
      artist: item.artist.name,
      image: item.album.cover_big,
      preview:item.preview
    });
  };

  const playSound = async(url) => {
    console.log('Loading Sound');
    audio.length ? await audio.unloadAsync() :null; 
    const { sound } = await Audio.Sound.createAsync(
      {uri: url}
    );
    
    setSound(sound);

    
    console.log('Playing Sound');
    await sound.playAsync();
    setState("playing");
    

  }

  const playPause = async () =>{
    if(audio.length!=0){
     if(state=="playing"){
      await sound.pauseAsync();
      setState("paused");
     }else{
      await sound.playAsync();
      setState("playing");
     }
    }
  }

  // const getAudio = async (data) => {
  //   const res = await musicAPI.get('/song', {
  //     params: { id: data },
  //   });
  //   playSound(res.data);
  // }

  useEffect(()=>{


    scrollX.addListener(({ value }) => {
      const val = Math.round(value / width);

      setSongIndex(val);
    });
    SetCurrentVideoSnippet(item);

    //fetchAndSetCurrentVideoSnippet(id);
    
    return () => {
      scrollX.removeAllListeners();
    };
  },[])

  useEffect(()=>{
  
    playSound(currentVideoSnippet.preview);

  },[currentVideoSnippet])

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
          //setAudio(sound);
        }
      : undefined;
    
  }, [sound]);

  const goNext = () => {
    slider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
  };
  const goPrv = () => {
    slider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
  };

  const renderItem = ({ index, item }) => {
    return (
      <Animated.View
        style={{
          alignItems: "center",
          width: width,
          transform: [
            {
              translateX: Animated.multiply(
                Animated.add(position, -index),
                -100
              ),
            },
          ],
        }}
      >
        <Animated.Image
          source={{uri:item.artwork}}
          style={{ width: 320, height: 320, borderRadius: 5 }}
        />
      </Animated.View>
    );
  };

  if(!currentVideoSnippet){
    return(
      <View style={styles.container}>
        <ActivityIndicator size={25} color="blue"/>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={{ height: 320,alignItems:"center" }}>
        <Image style={styles.image} source={{uri:currentVideoSnippet.image}}/>
      </SafeAreaView>
      
      <View>
        <Text style={styles.title}>{currentVideoSnippet.title}</Text>
        <Text style={styles.artist}>{currentVideoSnippet.artist}</Text>
      </View>
      
      <Controller onNext={goNext} pausePlay={playPause} onPrv={goPrv} />
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
    maxHeight: 600,
  },
  image:{
    height:320,
    width:320
  }
});