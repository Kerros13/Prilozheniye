import React, { useContext } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { ThemeContext } from "../theme";

const Screen = ({ children, style }) => {

  const {theme, ContextStyles} = useContext(ThemeContext);

  return <View style={[!style ? styles.container: style, ContextStyles[`music${theme}`]]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});

export default Screen;
