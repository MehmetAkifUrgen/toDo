import React from 'react';
import {Text, View, TextInput} from 'react-native';
import styles from './input.style';
const Input = ({
  value,
  onChangeText,
  placeholder,
  text,
  secureTextEntry,
  placeholderTextColor,
  keyboardType,
  theme = 'secondary',
}) => {
  return (
    <View style={styles[theme].container}>
      <Text style={styles[theme].text}> {text} </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles[theme].input}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default Input;
