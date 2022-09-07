import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {theme} from '../../../assets/constants/theme';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainCont: {
    flex: 1,
  },
  tabCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  tabs: {
    height: 50,
    backgroundColor: 'white',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderColor: 'black',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 0,
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
  checkboxCont: {
    flexDirection: 'row',
    alignItems: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  checkboxText: {
    color: 'white',
    marginLeft: 15,
    fontSize: theme.fontSize.small,
  },
  input: {alignSelf: 'center', marginTop: 15},
  inputCont: {
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: 'center',
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'center',
  },
  inputStyles: {
    padding: 0,
    height: '100%',
    width: '95%',
    alignSelf: 'center',
    textAlignVertical: 'center',
  },
  title: {
    color: 'white',
    marginBottom: 5,
    fontSize: theme.fontSize.normal,
  },
  proofCont: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  choosenFiles: {
    backgroundColor: '#939393',
    padding: 3,
    borderRadius: 5,
    fontSize: theme.fontSize.small,
  },
  noChoosen: {
    backgroundColor: 'white',
    padding: 3,
    borderRadius: 5,
    marginLeft: 5,
    fontSize: theme.fontSize.small,
    color: 'black',
  },
});
export default styles;
