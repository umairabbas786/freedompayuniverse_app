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
    color: theme.colors.primary,
    fontSize: theme.fontSize.small,
    alignSelf: 'center',
    marginTop: 10,
  },
});

export default styles;
