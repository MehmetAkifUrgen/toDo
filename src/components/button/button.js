import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './button.style';
const Button = ({text, theme = 'primary', onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles[theme].container}>
      <Text style={styles[theme].text}> {text} </Text>
    </TouchableOpacity>
  );
};

export default Button;
