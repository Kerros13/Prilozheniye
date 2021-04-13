import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { AntDesign,Entypo,FontAwesome, FontAwesome5 } from '@expo/vector-icons';

const Tab = ({ color, tab, onPress, icon, icon2, icon3, icon4, size }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon && <AntDesign name={icon} size={size} color={color} />}
      {icon2 && <Entypo name={icon2} size={size} color={color} />}
      {icon3 && <FontAwesome name={icon3} size={size} color={color} />}
      {icon4 && <FontAwesome5 name={icon4} size={size} color={color} />}
      <Text style={{ color }}>{tab.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
});

export default Tab;