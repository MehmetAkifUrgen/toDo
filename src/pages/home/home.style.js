import {StyleSheet, Dimensions} from 'react-native';
const widt = Dimensions.get('screen');
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato',
  },
  deneme: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
  },
  input: {
    backgroundColor: 'white',
    width: 200,
    color: 'black',
    height: 50,
    borderRadius: 10,
  },
  buttonView: {
    alignSelf: 'flex-end',
    width: 100,
    margin: 10,
  },
  bottomView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  iconButton: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 25,
    marginLeft: 10,
  },
  body: {
    flex: 1,
  },
  itemView: {
    backgroundColor: 'white',
    paddingLeft: 15,
    padding: 5,
    margin: 10,
    borderRadius: 20,
    marginTop: 20,
    flex: 1,
  },
  itemText: {
    color: 'tomato',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 5,
    width: widt.width * 0.6,
  },
  itemTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    padding: 10,
  },
  iconView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
});
