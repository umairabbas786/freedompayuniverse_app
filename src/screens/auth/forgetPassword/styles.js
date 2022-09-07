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
  title: {
    fontSize: theme.fontSize.title,
    color: 'black',
    alignSelf: 'center',
  },
  des: {
    color: 'black',
    fontSize: theme.fontSize.small,
    marginTop: 4,
    width: '70%',
    alignSelf: 'center',
  },
  forget: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.small,
    alignSelf: 'center',
    marginTop: 10,
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
