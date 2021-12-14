import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './home.style';
import Button from '../../components/button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState('');
  const [itemvalue, setItemValue] = useState('');
  const [itemvisible, setItemVisible] = useState(false);
  const [itemData, setItemData] = useState([]);
  const [show, setShow] = useState(false);
  const [indexx, setIndex] = useState(null);
  const [temp, setTemp] = useState('');
  const user = auth().currentUser.uid;
  const ref = firestore().collection(user);
  const [updatevisible, setUpdateVisible] = useState(false);
  const [inputindex, setInputIndex] = useState(null);
  const [itemindex, setItemIndex] = useState(null);
  const getData = async () => {
    const veri = await firestore().collection(user).get();
    // console.log(veri._docs[0]._ref._documentPath);
    setData(veri._docs);
  };
  const signOut = async () => {
    await auth().signOut();
    navigation.navigate('LoginPage');
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'TODO',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'tomato',
      },
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 25,
      },
      headerLeft: () => (
        <Icon onPress={signOut} color={'white'} size={30} name="exit-to-app" />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    getData();
  }, [visible]);
  useEffect(() => {
    getData();
  }, [updatevisible]);

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
    setShow(!show);
  };
  const detayEkle = async value => {
    const ref = await firestore().collection(user);
    const verii = await ref.doc(value).collection(value).get();
    // console.log(verii._docs);
    setItemData(verii._docs);

    if (itemvalue != '') {
      ref.doc(value).collection(value).add({
        name: itemvalue,
      });
    } else {
      alert('Boş Bırakılamaz!');
    }
    setItemVisible(false);
    setVisible(false);
    setCategory('');
    setItemValue('');
  };
  const update = async (item, dataa) => {
    // console.log(item, 'asddf', dataa);
    firestore().doc(`${user}/${item}/${item}/${dataa}`).update({
      name: temp,
    });
    setUpdateVisible(!updatevisible);
    setShow(!show);
  };
  const deleteListItem = (item, dataa) => {
    firestore().doc(`${user}/${item}/${item}/${dataa}`).update({
      name: '',
    });
    setUpdateVisible(!updatevisible);
    setShow(!show);
  };
  const itemRender = ({item, index}) => {
    return (
      <KeyboardAvoidingView behavior="height" enabled={false}>
        <TouchableOpacity
          onPress={() => {
            setUpdateVisible(!updatevisible), setItemIndex(index);
          }}>
          {!updatevisible && (
            <View style={styles.listItemView}>
              <Text style={styles.itemText}>
                - {itemData[index]._data.name}{' '}
              </Text>
              <Icon
                onPress={() =>
                  deleteListItem(
                    itemData[index]._ref._documentPath._parts[1],
                    itemData[index]._ref._documentPath._parts[3],
                  )
                }
                size={30}
                name="delete"
                color={'tomato'}
              />
            </View>
          )}
          {updatevisible && index == itemindex && (
            <View style={styles.inputView}>
              <TextInput
                value={temp}
                onChangeText={text => setTemp(text)}
                placeholder={'Yeni değeri girin...'}
                placeholderTextColor={'tomato'}
                style={styles.input}
              />
              <Icon
                onPress={() =>
                  update(
                    itemData[index]._ref._documentPath._parts[1],
                    itemData[index]._ref._documentPath._parts[3],
                  )
                }
                size={30}
                name="check"
                color={'tomato'}
              />
            </View>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  };
  const itemPress = async (datas, index) => {
    const verii = await ref.doc(datas).collection(datas).get();

    await setItemData(verii._docs);
    // console.log('verşşş', itemData);
    setIndex(index);
    setShow(!show);
  };

  const deleteCategory = item => {
    firestore().doc(`${user}/${item}`).delete();
    setUpdateVisible(!updatevisible);
    setShow(!show);
  };

  const renderItem = ({item, index}) => {
    //console.log(item);
    return (
      <TouchableOpacity
        onPress={() => itemPress(item._ref._documentPath._parts[1], index)}
        style={styles.itemView}>
        <View style={styles.itemTextView}>
          <Text style={styles.itemText}>
            {item._ref._documentPath._parts[1]}
          </Text>
          <View style={styles.iconView}>
            <Icon
              onPress={() => deleteCategory(item._ref._documentPath._parts[1])}
              backgroundColor={'white'}
              color={'tomato'}
              name="delete"
              size={30}
            />
            <Icon
              onPress={() => {
                setItemVisible(true);
                setInputIndex(index);
              }}
              name="plus"
              color={'tomato'}
              backgroundColor={'white'}
              size={40}
            />
          </View>
        </View>
        {itemvisible && index == inputindex && (
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
        {show && index == indexx && (
          <FlatList data={itemData} renderItem={itemRender} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          setVisible(false);
          setItemVisible(false);
        }}>
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
