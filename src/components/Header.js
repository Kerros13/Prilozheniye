import React from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Logo from "../components/Header Logo.js"

const {width, height} = Dimensions.get("window");

export default function Header({ title, navigation }) {

  const openMenu = () => {
    navigation.openDrawer();
  }
  
        //<Text style={styles.headerText}>{title}</Text>
  return (
    <View style={styles.header}>
      <MaterialIcons name='menu' size={28} onPress={openMenu} style={styles.icon} />
      <View>
        <Logo title="PRILOZ" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: width,
    height: height*0.07,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    left: 16,
    color:"#0159BB",
  }
});

