import React from 'react';

import {StyleSheet} from 'react-native';
import {theme} from '../../../assets/constants/theme';

const styles = StyleSheet.create({
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
    width: theme.size.width,
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: 25,
    paddingBottom: 30,
  },
  infoCont: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginLeft: 10,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});

export default styles;
