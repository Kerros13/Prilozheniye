import React,{useEffect,useState,useContext} from 'react';
import { Dimensions, StyleSheet, View, Text,ActivityIndicator,Image,StatusBar,FlatList} from "react-native";
import { ThemeContext } from "../theme";
import Screen from "../components/Screen";
import {Header} from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { AudioContext } from '../context/AudioProvider';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { pause, play, resume, playNext } from '../misc/audioController';

const { width, height } = Dimensions.get("screen");


const Component = ({image,title,theme,ContextStyles}) =>{
    return(
        <>
        <View style={styles.containerComponent}>
            <Image style={styles.image} source={{uri:image}}/>
            <View style={styles.rightcontainer}>
                <Text style={[styles.title,ContextStyles[`text${theme}`]]} numberOfLines={1}>{title}</Text>
            </View>
        </View>
        <View style={[theme == "dark" ? {backgroundColor:"#E1E1E1"}:{backgroundColor:"#1E1E1E"},styles.separator]} />
        </>
    );
}

const songsbyAlbumScreen = ({route,navigation}) => {

    const {data} = route.params;
    const [tracks,setTracks] = useState(null);

    const {theme,ContextStyles} = useContext(ThemeContext);
    const context = useContext(AudioContext);

    const getTrackList = async() => {
        const endpoint = data.tracklist;
  
        const response = await fetch(endpoint);
        const data2 = await response.json();
    
        setTracks(data2.data);
        
    };

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
              image_uri: data.cover_big
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
            image_uri: data.cover_big
            });
            
        }
    };

    useEffect(()=>{
        getTrackList()
    },[])

    // useEffect(()=>{
    //     console.log(tracks);
    // },[tracks])

    if(!tracks){
        return(
            <View style={[{flex:1,alignItems:'center',justifyContent:'center'},ContextStyles[`container${theme}`]]}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        )
    }

    return(
        <Screen style={{flex:1}}>
            <Header
            statusBarProps={{ backgroundColor: ContextStyles[`header${theme}`].backgroundColor, barStyle:theme == "dark" ? "light-content":"dark-content" }}
            leftComponent={<Ionicons name="arrow-back" size={width*0.085} color={ContextStyles[`iconheader${theme}`].color} onPress={()=>{navigation.pop()}}/>}
            centerComponent={<Text style={{fontSize:width*0.06,color:theme=="dark"? "#fff":"#000"}}>{data.title}</Text>}
            containerStyle={{
                backgroundColor: ContextStyles[`header${theme}`].backgroundColor ,
                justifyContent: 'space-around',
                borderBottomColor:null
            }}
            />
            <FlatList
            data={tracks}
            horizontal={false}
            keyExtractor={(item)=>item.id.toString()}
            showsHorizontalScrollIndicator={false}

            renderItem={({item}) => {
                return(
                    <TouchableOpacity onPress={()=>{handleAudioPress(item)}}>
                         <Component
                        title={item.title_short}
                        image={data.cover_big}
                        theme={theme}
                        ContextStyles={ContextStyles}
                        />
                    </TouchableOpacity>
                   
                )
                }
            }
            />
            <View style={{height:'10%'}}></View>
        </Screen>
        
    );

}


const styles = StyleSheet.create({
    containerComponent:{
        flexDirection:"row",
        marginLeft:15
    },
    image:{
        marginTop:5,
        width:width*0.2,
        height:width*0.2,
    },
    rightcontainer:{
        justifyContent:'space-around',
        marginLeft:15
    },
    title:{
        fontSize:width*0.05
    },
    separator: {
        width: width*0.9,
        opacity: 0.3,
        height: 0.5,
        alignSelf: 'center',
        marginTop: 10,
    },
})

export default songsbyAlbumScreen;