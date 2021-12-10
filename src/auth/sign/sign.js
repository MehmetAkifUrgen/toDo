import React, {useState} from 'react';
import {Alert, Text, View} from 'react-native';
import styles from './sign.style';
import Input from '../../components/input';
import Button from '../../components/button';
import Header from '../../components/header';
import auth from '@react-native-firebase/auth';
const Sign = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [mail, setMail] = useState('');
  console.log(password, mail);
  const signUp = () => {
    if (password == repassword) {
      auth()
        .createUserWithEmailAndPassword(mail, password)
        .then(() => {
          Alert.alert('Kayıt Başarılı');
          navigation.navigate('LoginPage');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('Bu kullanıcı zaten kayıtlı');
          }

          if (error.code === 'auth/invalid-email') {
            Alert.alert('Yanlış mail veya şifre');
          }
        });
    } else {
      Alert.alert('Şifre uyuşmuyor.');
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.body}>
        <Input
          text="Mail"
          value={mail}
          onChangeText={text => setMail(text)}
          placeholder="Mail..."
          keyboardType="email-address"
        />
        <Input
          text="Şifre"
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="Şifre..."
          secureTextEntry={true}
        />
        <Input
          text="Şifre Tekrar"
          value={repassword}
          onChangeText={text => setRePassword(text)}
          placeholder="Şifre Tekrar..."
          secureTextEntry={true}
        />
        <Button onPress={signUp} text="Kayıt Ol" theme="secondary" />
      </View>
    </View>
  );
};

export default Sign;
