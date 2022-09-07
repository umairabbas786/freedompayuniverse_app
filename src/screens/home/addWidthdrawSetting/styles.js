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
  newTicketButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    alignSelf: 'flex-end',
    padding: 10,
    borderRadius: 10,
  },
});
export default styles;
