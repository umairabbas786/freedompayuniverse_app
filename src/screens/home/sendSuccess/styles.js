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
    borderRadius: 30,
    marginTop: 25,
    paddingBottom: 30,
    paddingTop: 20,
  },
  detailLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.grayTab,
    width: width / 1.1,
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  detailText: {fontSize: theme.fontSize.normal, color: 'black', width: '48%'},
});
export default styles;
