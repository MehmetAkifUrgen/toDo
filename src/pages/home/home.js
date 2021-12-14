import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './home.style';
import Button from '../../components/button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import Input from '../../components/input';

const Home = ({params}) => {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState('');
  const [itemvalue, setItemValue] = useState('');
  const [itemvisible, setItemVisible] = useState(false);
  const [itemData, setItemData] = useState([]);
  const [show, setShow] = useState(false);
  const user = auth().currentUser.uid;
  const ref = firestore().collection(user);
  const getData = async () => {
    const veri = await firestore().collection(user).get();
    console.log(veri._docs[0]._ref._documentPath);
    setData(veri._docs);
  };
  useEffect(() => {
    getData();
  }, [visible]);

  const ekle = async () => {
    const ref = firestore().collection(user);
    if (category != '') {
      ref
        .doc(category)
        .set({})
        .then(() => {
          console.log('User added!');
        });
      setVisible(false);
      setCategory('');
    } else {
      alert('Boş Bırakılamaz!');
    }
  };
  const detayEkle = async value => {
    const ref = await firestore().collection(user);
    const verii = await ref.doc(value).collection(value).get();
    console.log(verii._docs);
    setItemData(verii._docs);

    // .then(() => {
    //   console.log('User added!');
    // },

    setVisible(false);
    setCategory('');
    setItemValue('');
  };
  const itemRender = ({item, index}) => {
    console.log('veriiiiiiiiiiiiiii,', index);
    console.log('stateee', itemData[index]);
    return (
      <View>
        <Text style={styles.itemText}> {itemData[index]._data.name} </Text>
      </View>
    );
  };
  const itemPress = async datas => {
    const verii = await ref.doc(datas).collection(datas).get();

    await setItemData(verii._docs);
    // console.log('verşşş', itemData);
    setShow(!show);
  };
  const renderItem = ({item}) => {
    //console.log(item);
    return (
      <TouchableOpacity
        onPress={() => itemPress(item._ref._documentPath._parts[1])}
        style={styles.itemView}>
        <View style={styles.itemTextView}>
          <Text style={styles.itemText}>
            {item._ref._documentPath._parts[1]}
          </Text>
          <Icon
            onPress={() => setItemVisible(true)}
            name="plus"
            color={'tomato'}
            backgroundColor={'white'}
            size={50}
          />
        </View>
        {itemvisible && (
          <View>
            <View style={styles.inputView}>
              <TextInput
                value={itemvalue}
                onChangeText={text => setItemValue(text)}
                placeholder={'not ekleyin'}
                placeholderTextColor={'grey'}
                style={styles.input}
              />
              <Icon
                onPress={() => detayEkle(item._ref._documentPath._parts[1])}
                size={30}
                name="check"
                color={'tomato'}
              />
            </View>
          </View>
        )}
        {show && <FlatList data={itemData} renderItem={itemRender} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        <View style={styles.body}>
          <FlatList renderItem={renderItem} data={data} />

          <View style={styles.bottomView}>
            {visible && (
              <View style={styles.inputView}>
                <TextInput
                  placeholder="Kategori Girin"
                  value={category}
                  onChangeText={text => setCategory(text)}
                  style={styles.input}
                />
                <TouchableOpacity style={styles.iconButton}>
                  <Icon
                    onPress={ekle}
                    size={30}
                    name="check"
                    color={'tomato'}
                  />
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.buttonView}>
              <Button onPress={() => setVisible(true)} text={'Ekle'} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Home;
