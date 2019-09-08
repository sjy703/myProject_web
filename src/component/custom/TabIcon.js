import {
  Component,
  StatusBar,
  Text,
  View,
  StyleSheet,
  PixelRatio,
} from 'react-native';
import React from 'react';

//Create a dedicated class that will manage the tabBar icon
const TabIcon = ({ selected, title }) => {
  var color = selected ? '#00f240' : '#301c2a';

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: color, fontSize: 12 }}>{title}</Text>
    </View>
  );
};
export default TabIcon;
