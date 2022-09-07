import React from 'react';
import {StyleSheet} from 'react-native';
// import {theme} from '../../../assets/constants/theme';

const styles = StyleSheet.create({
  newsTab: {
    // width: theme.size.fullWidth,
    backgroundColor: theme.colors.tabBg,
    height: 55,
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginTop: 15,
  },
  tabTitle: {
    fontSize: theme.fontSize.normal,
    color: theme.colors.primary,
  },
  greeting: {
    fontSize: theme.fontSize.small,
    color: 'white',
  },
  balanceCont: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  balanceTitle: {
    fontSize: theme.fontSize.normal,
    color: 'white',
  },
  balanceAmount: {
    fontSize: theme.fontSize.title,
    color: 'white',
  },
  widthDrawDepositCont: {
    flexDirection: 'row',
    width: theme.size.sixtyWidth,
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: theme.colors.tabBg,
    borderRadius: 20,
    height: 100,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  widthdrawText: {
    color: 'white',
    fontSize: theme.fontSize.normal,
    marginTop: 5,
  },
});

export default styles;
