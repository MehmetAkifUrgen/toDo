import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, TextInput} from 'react-native';
import styles from './home.style';
import Button from '../../components/button';
import Axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Home = ({params}) => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState('');
  const getData = async () => {
    await Axios.get('http://192.168.1.5:3000/users')
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const renderItem = ({item}) => {
    return <Text> {item.name} </Text>;
  };

  useEffect(() => {
    getData();
  }, [insert]);

  const insert = () => {
    Axios.patch('http://192.168.1.5:3000/users/1', {'6:': {ad: 'dsadasfasfas'}})
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const post = () => {
    Axios.post('http://192.168.1.5:3000/users', {name: category})
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button onPress={insert} text={'Ekle'} />
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={text => setCategory(text)}
      />
      <FlatList data={data} renderItem={renderItem} />
      <Icon.Button
        onPress={post}
        name="plus"
        backgroundColor="red"></Icon.Button>
    </View>
  );
};

export default Home;
