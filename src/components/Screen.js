import React, { useContext } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { ThemeContext } from "../theme";

const Screen = ({ children }) => {

  const {theme, ContextStyles} = useContext(ThemeContext);

  return <View style={[styles.container, ContextStyles[`music${theme}`]]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});

export default Screen;
