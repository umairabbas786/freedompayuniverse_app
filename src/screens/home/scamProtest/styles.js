import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {theme} from '../../../assets/constants/theme';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainCont: {
    flex: 1,
  },
  topTab: {
    width: theme.size.width,
    alignSelf: 'center',
    marginTop: 20,
  },
  topDes: {
    color: 'white',
    fontSize: theme.fontSize.small,
    marginTop: 5,
  },
  middleCont: {
    backgroundColor: 'white',
    width: theme.size.width,
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 25,
    paddingBottom: 30,
    paddingTop: 20,
  },
});
export default styles;
