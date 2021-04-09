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

import songs from "./data.json";
import Controller from "./Controller";
import { Audio } from 'expo-av';
import { SongContext } from "../context/SongContext";
import { youtubeSearch,musicAPI} from "../api/backend";

const { width, height } = Dimensions.get("window");

export default function Player({id}) {
  const scrollX = useRef(new Animated.Value(0)).current;

  const slider = useRef(null);
  const [songIndex, setSongIndex] = useState(0);
  const [sound, setSound] = useState();

  const [{ currentVideoSnippet, themeSelectValue }, dispatch] = useContext(
    SongContext
  );

  const setCurrentVideoSnippet = (data) => {
    dispatch({ type: 'setCurrentVideoSnippet', snippet: data });
  };

  const fetchAndSetCurrentVideoSnippet = (id) => {
    youtubeSearch
      .get('videos', {
        params: {
          id: id,
        },
      })
      .then((res) => {
        const item = res.data.items[0];
        // console.log(item);
        setCurrentVideoSnippet({
          id: item.id,
          title: item.snippet.title,
          channelTitle: item.snippet.channelTitle,
          maxThumbnail: `https://img.youtube.com/vi/${item.id}/maxresdefault.jpg`,
          sdThumbnail: `https://img.youtube.com/vi/${item.id}/sddefault.jpg`,
          // this is the url of the max resolution of thumbnail
        });
      });
  };

  const getAudio = async (data) => {
    const res = await musicAPI.get('/song', {
      params: { id: data },
    });
    playSound(res.data);
  }

  useEffect(()=>{

    scrollX.addListener(({ value }) => {
      const val = Math.round(value / width);

      setSongIndex(val);
    });

    fetchAndSetCurrentVideoSnippet(id);
    if(currentVideoSnippet){
      getAudio(currentVideoSnippet.id)
    }

    return () => {
      scrollX.removeAllListeners();
    };
  },[])

  // for tranlating the album art
  const position = useRef(Animated.divide(scrollX, width)).current;

  async function playSound(url) {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      {uri: url}
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); 
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); 
          // setSound(null);
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

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={{ height: 320 }}>
        <Animated.FlatList
          ref={slider}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          data={songs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
        />
      </SafeAreaView>
      {currentVideoSnippet.id ? 
      <View>
        <Text style={styles.title}>{currentVideoSnippet.title}</Text>
      </View>:null
      }
      

      <Controller onNext={goNext} pausePlay={()=>{getAudio(currentVideoSnippet.id)}} onPrv={goPrv} />
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
});