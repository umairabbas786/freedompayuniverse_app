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
    fontSize: 24,
    color: 'black',
  },
  des: {
    color: 'black',
    fontSize: 11,
    marginTop: 4,
    width: '70%',
  },
  forget: {
    color: theme.colors.primary,
    fontSize: 11,
    alignSelf: 'center',
    marginTop: 10,
  },
});

export default styles;
