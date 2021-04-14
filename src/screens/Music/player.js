import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions,SafeAreaView,Image } from 'react-native';
import Screen from '../../components/Screen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import Images from 'react-native-scalable-image';
import PlayerButton from '../../components/PlayerButton';
import { AudioContext } from '../../context/AudioProvider';
import { pause, play, resume, playNext } from '../../misc/audioController';
import { storeAudioForNextOpening } from '../../misc/helper';
import { ThemeContext } from "../../theme";

const { width } = Dimensions.get('window');

const Player = () => {
  const context = useContext(AudioContext);
  const { playbackPosition, playbackDuration } = context;
  const {theme} = useContext(ThemeContext);




  const calculateSeebBar = () => {
    if (playbackPosition !== null && playbackDuration !== null) {
      return playbackPosition / playbackDuration;
    }
    return 0;
  };


  useEffect(() => {
    context.loadPreviousAudio();
  }, []);

  // useEffect(() => {
  //   console.log(context.image_uri);
  // }, [context]);

  // useEffect(() => {
  //   SetAudio()
  // },[context.soundObj]);

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
      image_uri:null
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
          <SafeAreaView style={{ alignItems:"center" }}>
            <Images style={styles.image} source={{uri:context.image_uri}} height={width*0.8}/>
          </SafeAreaView>  
          : 
          <MaterialCommunityIcons
            name='music-circle'
            size={300}
            //color circulo player
            color={context.isPlaying ? (theme == "dark" ? '#BBFE1B':'#7f69a5'): '#b6b8b9'}
          />}
          
        </View>
        <View style={styles.audioPlayerContainer}>
          <Text numberOfLines={1} style={[styles.audioTitle, theme == "dark" ? {color:"white"}:{color:"#002c3e"}]}>
            {context.currentAudio.artist ? context.currentAudio.title +" - " + context.currentAudio.artist.name : context.currentAudio.filename }
          </Text>
          <Slider
            style={{ width: width, height: width*0.09 }}
            minimumValue={0}
            maximumValue={1}
            value={calculateSeebBar()}
            thumbTintColor={theme == "dark" ? '#BBFE1B':'#7f69a5'}
            minimumTrackTintColor={theme == "dark" ? '#BBFE1B':'#7f69a5'}
            maximumTrackTintColor={theme == "dark" ? '#BBFE1B':'#7f69a5'}
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
    position:"absolute",
    right: '5%',
    top: '4%',
    color: '#b6b8b9',
    fontSize: width*0.04,
  },
  midBannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioTitle: {
    fontSize: width*0.045,
    padding: 15,
  },
});

export default Player;
