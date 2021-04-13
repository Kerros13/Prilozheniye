import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions,SafeAreaView,Image } from 'react-native';
import Screen from '../../components/Screen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import PlayerButton from '../../components/PlayerButton';
import { SongContext } from "../../context/SongContext";
import { AudioContext } from '../../context/AudioProvider';
import { pause, play, resume, playNext } from '../../misc/audioController';
import { storeAudioForNextOpening } from '../../misc/helper';

const { width } = Dimensions.get('window');

const Player = () => {
  const context = useContext(AudioContext);
  const { playbackPosition, playbackDuration } = context;
  const [{ currentVideoSnippet, audio }, dispatch] = useContext(
    SongContext
  );

  const setAudio = (data) => {
    dispatch({ type: 'setAudio', snippet: data });
  };

  const calculateSeebBar = () => {
    if (playbackPosition !== null && playbackDuration !== null) {
      return playbackPosition / playbackDuration;
    }
    return 0;
  };

  const SetAudio = () =>{
    setAudio()
    console.log(context.currentAudio);
  }

  useEffect(() => {
    context.loadPreviousAudio();
  }, []);

  // useEffect(() => {
  //   console.log(context.image_uri);
  // }, [context]);

  useEffect(() => {
    SetAudio()
  },[context.soundObj]);

  const handlePlayPause = async () => {
    // play
    if (context.soundObj === null) {
      const audio = context.currentAudio;
      const status = await play(context.playbackObj, audio.uri);
      context.playbackObj.setOnPlaybackStatusUpdate(
        context.onPlaybackStatusUpdate
      );
      return context.updateState(context, {
        soundObj: status,
        currentAudio: audio,
        isPlaying: true,
        currentAudioIndex: context.currentAudioIndex,
      });
    }
    // pause
    if (context.soundObj && context.soundObj.isPlaying) {
      const status = await pause(context.playbackObj);
      return context.updateState(context, {
        soundObj: status,
        isPlaying: false,
      });
    }
    // resume
    if (context.soundObj && !context.soundObj.isPlaying) {
      const status = await resume(context.playbackObj);
      return context.updateState(context, {
        soundObj: status,
        isPlaying: true,
      });
    }
  };

  const handleNext = async () => {
    const {isLoaded} = await context.playbackObj.getStatusAsync();
    const isLastAudio = 
      context.currentAudioIndex + 1 === context.totalAudioCount;
    let audio = context.audioFiles[context.currentAudioIndex + 1];
    let index;
    let status;

    if(!isLoaded && !isLastAudio){
      index = context.currentAudioIndex +1;
      status = await play(context.playbackObj, audio.uri);
    }

    if(isLoaded && !isLastAudio){
      index = context.currentAudioIndex +1;
      status = await playNext(context.playbackObj, audio.uri);
    }

    if(isLastAudio){
      index = 0;
      audio = context.audioFiles[index];
      if(isLoaded){
        status = await playNext(context.playbackObj, audio.uri);
      }else{
        status = await play(context.playbackObj, audio.uri);
      }
    }

    context.updateState(context, {
      currentAudio: audio,
      playbackObj: context.playbackObj,
      soundObj: status,
      isPlaying: true,
      currentAudioIndex: index,
      playbackPosition: null,
      playbackDuration: null,
      image_uri:null
    });
    storeAudioForNextOpening(audio, index);
  };

  const handlePrevius= async () => {
    const {isLoaded} = await context.playbackObj.getStatusAsync();
    const isFirstAudio = context.currentAudioIndex <= 0;
    let audio = context.audioFiles[context.currentAudioIndex - 1];
    let index;
    let status;

    if(!isLoaded && !isFirstAudio){
      index = context.currentAudioIndex - 1;
      status = await play(context.playbackObj, audio.uri);
    }

    if(isLoaded && !isFirstAudio){
      index = context.currentAudioIndex - 1;
      status = await playNext(context.playbackObj, audio.uri);
    }

    if(isFirstAudio){
      index = context.totalAudioCount - 1;
      audio = context.audioFiles[index];
      if(isLoaded){
        status = await playNext(context.playbackObj, audio.uri);
      }else{
        status = await play(context.playbackObj, audio.uri);
      }
    }

    context.updateState(context, {
      currentAudio: audio,
      playbackObj: context.playbackObj,
      soundObj: status,
      isPlaying: true,
      currentAudioIndex: index,
      playbackPosition: null,
      playbackDuration: null,
    });
    storeAudioForNextOpening(audio, index);
  }

  if (!context.currentAudio) return null;

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.audioCount}>{`${context.currentAudioIndex + 1} / ${
          context.totalAudioCount
        }`}</Text>
        <View style={styles.midBannerContainer}>
          {context.image_uri ? 
          <SafeAreaView style={{ height: 320,alignItems:"center" }}>
            <Image style={styles.image} source={{uri:context.image_uri}}/>
          </SafeAreaView>  
          : 
          <MaterialCommunityIcons
            name='music-circle'
            size={300}
            //color circulo player
            color={context.isPlaying ? '#5252ad' : '#636363'}
          />}
          
        </View>
        <View style={styles.audioPlayerContainer}>
          <Text numberOfLines={1} style={styles.audioTitle}>
            {context.currentAudio.artist ? context.currentAudio.title +" - " + context.currentAudio.artist.name : context.currentAudio.filename }
          </Text>
          <Slider
            style={{ width: width, height: 40 }}
            minimumValue={0}
            maximumValue={1}
            value={calculateSeebBar()}
            //color circulo lista
            minimumTrackTintColor={'#636363'}
            maximumTrackTintColor={'#5252ad'}
          />
          <View style={styles.audioControllers}>
            <PlayerButton iconType='PREV' onPress={handlePrevius} />
            <PlayerButton
              onPress={handlePlayPause}
              style={{ marginHorizontal: 25 }}
              iconType={context.isPlaying ? 'PLAY' : 'PAUSE'}
            />
            <PlayerButton iconType='NEXT' onPress={handleNext}
            />
          </View>
        </View>
      </View>
      <View style={{height:'10%'}}></View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  audioControllers: {
    width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  container: {
    flex: 1,
  },
  audioCount: {
    textAlign: 'right',
    padding: 15,
    color: '#b6b8b9',
    fontSize: 14,
  },
  midBannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioTitle: {
    fontSize: 16,
    color: "#000",
    padding: 15,
  },
  image:{
    height:320,
    width:320
  },
});

export default Player;
