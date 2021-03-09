import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Tab from './Tab';

const {width, height} = Dimensions.get("window");

const TabBar = ({ state, navigation }) => {
  const [selected, setSelected] = useState('Home');
  const { routes } = state;
  const renderColor = currentTab => ((currentTab === selected && selected == 'Home') ? '#0159BB' : 
  (currentTab === selected && selected == 'Search') ? '#BCFC1E' :  
  (currentTab === selected && selected == 'Prueba') ? '#C3C3C3' : 'white'  );

  const handlePress = (activeTab, index) => {
    if (state.index !== index) {
      setSelected(activeTab);
      navigation.navigate(activeTab);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {routes.map((route, index) => (
          <Tab
            tab={route}
            icon={route.params.icon}
            icon2={route.params.icon2}
            icon3={route.params.icon3}
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
    backgroundColor: '#322E2E',
    width: 250,
    borderRadius: 100,
    elevation: 2,
  },
});

export default TabBar;