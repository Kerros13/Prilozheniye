import React, { useContext } from 'react';
import { Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ThemeContext } from "../theme";

const { width } = Dimensions.get('window');

const PlayerButton = props => {
  const {theme} = useContext(ThemeContext);
  const { iconType, size = width*0.11, iconColor = theme == "dark" ? "#e1e1e1":"#002c3e", onPress } = props;
  const getIconName = type => {
    switch (type) {
      case 'PLAY':
        return 'pausecircle';
      case 'PAUSE':
        return 'playcircleo';
      case 'NEXT':
        return 'forward';
      case 'PREV':
        return 'banckward';
    }
  };
  return (
    <AntDesign
      {...props}
      onPress={onPress}
      name={getIconName(iconType)}
      size={size}
      color={iconColor}
    />
  );
};

export default PlayerButton;
