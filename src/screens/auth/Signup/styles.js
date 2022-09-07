import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {theme} from '../../../assets/constants/theme';

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  mainCont: {
    flex: 1,
  },
  topCont: {
    height: width / 1.7,
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  topImage: {
    height: 130,
    width: width / 1.8,
    alignSelf: 'center',
    marginVertical: 30,
  },
  signIntext: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  signIn: {
    fontSize: theme.fontSize.title,
    color: 'black',
  },
  donthave: {
    color: 'black',
    fontSize: theme.fontSize.small,
  },
  forget: {
    color: 'black',
    fontSize: theme.fontSize.small,
    alignSelf: 'flex-start',
    marginTop: 10,
    width: '70%',
    zIndex: 0,
  },
  input: {width: theme.size.width, alignSelf: 'center', marginTop: 15},

  inputCont: {
    width: theme.size.width,
    height: 45,
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: 'center',
  },
  constStyleInput: {
    alignSelf: 'center',
    width: theme.size.width,
    backgroundColor: 'white',
    height: 45,
    borderRadius: 10,
    borderWidth: 1,
  },
  constTextInputPhone: {
    padding: 0,
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'white',
    textAlignVertical: 'center',
  },
  codePhoneText: {
    fontSize: 15,
    height: 20,
    alignSelf: 'center',
    textAlignVertical: 'center',
  },
});

export default styles;
