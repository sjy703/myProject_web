import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useState } from 'react';

const CustomButton = ({
  buttonColor = '#000',
  title = '',
  titleColor = '#fff',
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: buttonColor }]}
      onPress={onPress}
    >
      <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 15,
  },
});

export default CustomButton;
