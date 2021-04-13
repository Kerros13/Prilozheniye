import React, { useState, useContext } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Tab from './Tab';
import { ThemeContext } from "../theme";

const {width, height} = Dimensions.get("window");

const TabBar = ({ state, navigation }) => {
  const [selected, setSelected] = useState('Home');
  const {theme, ContextStyles} = useContext(ThemeContext);
  const { routes } = state;
  const renderColor = currentTab => (currentTab === selected ? (theme == 'dark' ? '#0159BB' : '#F7444E') : 'white');

  const handlePress = (activeTab, index) => {
    if (state.index !== index) {
      setSelected(activeTab);
      navigation.navigate(activeTab);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={[styles.container,ContextStyles[`bottomtab${theme}`]]}>
        {routes.map((route, index) => (
          <Tab
            tab={route}
            icon={route.params.icon}
            icon2={route.params.icon2}
            icon3={route.params.icon3}
            icon4={route.params.icon4}
            size={height*0.03}
            onPress={() => handlePress(route.name, index)}
            color={renderColor(route.name)}
            key={route.key}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 20,
    width:width,
    alignItems: 'center',
    justifyContent: 'center',
    borderEndColor:"#fff",
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width*0.7,
    borderRadius: 100,
    elevation: 2,
  },
});

export default TabBar;