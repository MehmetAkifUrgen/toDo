import React, {useState} from 'react';
import {Text, View, Modal, KeyboardAvoidingView} from 'react-native';
import Input from '../../components/input';
import styles from './login.style';
import Button from '../../components/button';
import Header from '../../components/header';
import auth from '@react-native-firebase/auth';
const Login = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [mail, setMail] = useState('');

  function gotoSign() {
    navigation.navigate('SignPage');
  }
  function login() {
    auth()
      .signInWithEmailAndPassword(mail, password)
      .then(() => {
        console.log('Hoşgeldiniz!');
        setMail('');
        setPassword('');
        navigation.navigate('HomePage');
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          Alert.alert('Yanlış mail veya şifre');
        }
      });
  }

  console.log(mail);
  return (
    <KeyboardAvoidingView
      behavior="height"
      enabled={false}
      style={styles.container}>
      <Header />
      <View style={styles.body}>
        <Input
          text="Mail"
          value={mail}
          onChangeText={text => setMail(text)}
          placeholder="Mail"
          keyboardType="email-address"
        />
        <Input
          text="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="Password"
          secureTextEntry={true}
        />
        <View style={styles.buttonView}>
          <Button onPress={login} text="Giriş Yap" />
          <Button onPress={gotoSign} text="Kayıt Ol" theme="secondary" />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
