import React, { Component } from "react";
import {View,Text,ScrollView,Dimensions} from "react-native";
import { AudioContext } from "../../context/AudioProvider";
import { RecyclerListView, LayoutProvider } from 'recyclerlistview';
import AudioListItem from '../../components/AudioListItem';
import Screen from '../../components/Screen';
import { Audio } from 'expo-av';
import { play, pause, resume, playNext } from '../../misc/audioController';
import { storeAudioForNextOpening } from '../../misc/helper';

const {width, height} = Dimensions.get("screen");

export class list extends Component {

    static contextType = AudioContext;

    constructor(props) {
        super(props);
        this.state = {
          optionModalVisible: false,
        };
    
        this.currentItem = {};
      }

    layoutProvider = new LayoutProvider(
        i => 'audio', 
        (type, dim) => {
            switch(type){
                case 'audio':
                    dim.width = width;
                    dim.height = height*0.11;
                break;
                default:
                    dim.width = 0;
                    dim.height = 0;
            }
            
        }
    );
    
    handleAudioPress = async audio => {
    const {
        soundObj,
        playbackObj,
        currentAudio,
        updateState,
        audioFiles,
    } = this.context;
    // playing audio for the first time.
    if (soundObj === null) {
        const playbackObj = new Audio.Sound();
        const status = await play(playbackObj, audio.uri);
        const index = audioFiles.indexOf(audio);
        updateState(this.context, {
          currentAudio: audio,
          playbackObj: playbackObj,
          soundObj: status,
          isPlaying: true,
          currentAudioIndex: index,
        });
        playbackObj.setOnPlaybackStatusUpdate(this.context.onPlaybackStatusUpdate);
        return storeAudioForNextOpening(audio, index);
    }

    // pause audio
    if (
        soundObj.isLoaded &&
        soundObj.isPlaying &&
        currentAudio.id === audio.id
    ) {
        const status = await pause(playbackObj);
        return updateState(this.context, { soundObj: status, isPlaying: false });
    }

    // resume audio
    if (
        soundObj.isLoaded &&
        !soundObj.isPlaying &&
        currentAudio.id === audio.id
    ) {
        const status = await resume(playbackObj);
        return updateState(this.context, { soundObj: status, isPlaying: true });
    }

    // select another audio
    if (soundObj.isLoaded && currentAudio.id !== audio.id) {
        const status = await playNext(playbackObj, audio.uri);
        const index = audioFiles.indexOf(audio);
        updateState(this.context, {
        currentAudio: audio,
        soundObj: status,
        isPlaying: true,
        currentAudioIndex: index,
        });
        return storeAudioForNextOpening(audio, index);
    }
    };

    componentDidMount() {
    this.context.loadPreviousAudio();
    }

    rowRenderer = (type, item, index, extendedState) => {
        return (
          <AudioListItem
            title={item.filename}
            isPlaying={extendedState.isPlaying}
            activeListItem={this.context.currentAudioIndex === index}
            duration={item.duration}
            onAudioPress={() => this.handleAudioPress(item)}
          />
        );
    };

    render() {
        return (
          <AudioContext.Consumer>
            {({ dataProvider, isPlaying }) => {
              if (!dataProvider._data.length) return null;
              return (
                <Screen>
                  <RecyclerListView
                    dataProvider={dataProvider}
                    layoutProvider={this.layoutProvider}
                    rowRenderer={this.rowRenderer}
                    extendedState={{ isPlaying }}
                  />
                  <View style={{height:'10%'}}></View>
                </Screen>
              );
            }}
          </AudioContext.Consumer>
        );
      }
}

export default list;