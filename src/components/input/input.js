import React from 'react';
import {Text, View, TextInput} from 'react-native';
import styles from './input.style';
const Input = ({
  value,
  onChangeText,
  placeholder,
  text,
  secureTextEntry,
  keyboardType,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> {text} </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.input}
        placeholderTextColor={'white'}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default Input;
