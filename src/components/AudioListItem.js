import React, { useContext } from 'react';
import { View,StyleSheet,Text,Dimensions,TouchableWithoutFeedback, } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { ThemeContext } from "../theme";

const getThumbnailText = filename => filename[0];

const convertTime = minutes => {
  if (minutes) {
    const hrs = minutes / 60;
    const minute = hrs.toString().split('.')[0];
    const percent = parseInt(hrs.toString().split('.')[1].slice(0, 2));
    const sec = Math.ceil((60 * percent) / 100);

    if (parseInt(minute) < 10 && sec < 10) {
      return `0${minute}:0${sec}`;
    }

    if (parseInt(minute) < 10) {
      return `0${minute}:${sec}`;
    }

    if (sec < 10) {
      return `${minute}:0${sec}`;
    }

    return `${minute}:${sec}`;
  }
};

const renderPlayPauseIcon = (isPlaying, theme) => {
  if (isPlaying)
    return (
      <Entypo name='controller-paus' size={width*0.085} color={theme == "dark" ? "#303d49":"#fff"} />
    );
  return <Entypo name='controller-play' size={width*0.085} color={theme == "dark" ? "#303d49":"#fff"} />;
};

const AudioListItem = ({ title, duration, onAudioPress, isPlaying, activeListItem, }) => {

  const {theme} = useContext(ThemeContext);

  return (
    <>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onAudioPress}>
          <View style={styles.leftContainer}>
            <View
              style={[
                styles.thumbnail,
                {
                  backgroundColor: activeListItem
                    ? (theme == "dark" ? '#BBFE1B':'#7f69a5')
                    : '#b6b8b9'
                },
              ]}
            >
              <Text style={styles.thumbnailText}>
                {activeListItem
                  ? renderPlayPauseIcon(isPlaying,theme)
                  : getThumbnailText(title)}
              </Text>
            </View>
            <View style={styles.titleContainer}>
              <Text numberOfLines={1} style={[theme == "dark" ? {color:"white"}:{color:"#002c3e"},styles.title]}>
                {title}
              </Text>
              <Text style={[theme == "dark" ? {color:"white"}:{color:"#002c3e"},styles.timeText]}>{convertTime(duration)}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={[theme == "dark" ? {backgroundColor:"#E1E1E1"}:{backgroundColor:"#1E1E1E"},styles.separator]} />
    </>
  );
};
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: width*0.9,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  thumbnail: {
    height: width*0.13,
    flexBasis: width*0.13,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  thumbnailText: {
    fontSize: width*0.06,
    fontWeight: 'bold',
    color: '#303d49',
  },
  titleContainer: {
    width: width*0.7,
    paddingLeft: 10,
  },
  title: {
    fontSize: width*0.05,
  },
  separator: {
    width: width*0.9,
    opacity: 0.3,
    height: 0.5,
    alignSelf: 'center',
    marginTop: 10,
  },
  timeText: {
    fontSize: width*0.04,
  },
});

export default AudioListItem;
