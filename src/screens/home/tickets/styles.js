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
    marginTop: 10,
    paddingBottom: 30,
    paddingTop: 20,
    alignItems: 'center',
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
  desTab: {
    width: theme.size.width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: theme.colors.grayTab,
    paddingVertical: 8,
  },
  tabLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tabText: {color: 'black', marginLeft: 10, width: 70},
  closeCont: {
    backgroundColor: 'red',
    borderRadius: 100,
    alignItems: 'center',
    marginLeft: 10,
    paddingHorizontal: 8,
  },
});
export default styles;
