import {StyleSheet, Dimensions} from 'react-native';
const screen = Dimensions.get('window');
export default {
  primary: StyleSheet.create({
    container: {margin: 5},
    input: {
      padding: 5,
      borderWidth: 2,
      width: screen.width * 0.8,
      borderRadius: 5,
      color: 'white',
      borderColor: 'white',
    },
    text: {
      fontSize: 25,
      marginBottom: 10,
      color: 'white',
    },
  }),
  secondary: StyleSheet.create({
    container: {margin: 5},
    input: {
      backgroundColor: 'white',
      padding: 10,
      borderWidth: 2,
      width: screen.width * 0.8,
      borderRadius: 5,
      color: 'tomato',
      borderColor: 'tomato',
    },
    text: {
      fontSize: 25,
      marginBottom: 10,
      color: 'tomato',
    },
  }),
};
