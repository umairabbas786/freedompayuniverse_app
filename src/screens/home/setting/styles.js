import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {theme} from '../../../assets/constants/theme';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainCont: {
    flex: 1,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 0,
    borderWidth: 1,
    borderColor: 'white',
  },
  contentContainer: {
    alignItems: 'center',
    backgroundColor: 'red',
  },
  bottomTabs: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 0.5,
    padding: 10,
  },
});
export default styles;
