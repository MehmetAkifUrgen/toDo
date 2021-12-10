import {StyleSheet, Dimensions} from 'react-native';

export default {
  primary: StyleSheet.create({
    container: {
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: 'tomato',
      borderRadius: 10,
      padding: 10,
      marginTop: 10,
    },
    text: {
      color: 'tomato',
      fontWeight: 'bold',
    },
  }),
  secondary: StyleSheet.create({
    container: {
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: 'tomato',
      borderRadius: 10,
      padding: 10,
      marginTop: 10,
    },
    text: {
      color: 'green',
      fontWeight: 'bold',
    },
  }),
};
