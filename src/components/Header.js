import React,{useContext} from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Logo from "./HeaderLogo.js";
import { ThemeContext } from "../theme";

const {width, height} = Dimensions.get("window");

export default function Header({ title, navigation, x }) {

  const {theme, ContextStyles} = useContext(ThemeContext);

  const openMenu = () => {
    navigation.openDrawer();
  }
  
  
  return (
    <View style={styles.header}>
      <MaterialIcons name='menu' size={width*0.075} onPress={openMenu} style={[styles.icon,ContextStyles[`iconheader${theme}`]]} />
      <View>
      {x==true ? <Text style={[styles.headerText,ContextStyles[`logo${theme}`]]}>{title}</Text> : <Logo title="PRILOZ" />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: width,
    height: height,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize:  width*0.05,
    letterSpacing: 1,
  },
  icon: {
    position: 'absolute',
    left: 16,
  }
});

