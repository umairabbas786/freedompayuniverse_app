import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

export const theme = {
  colors: {
    primary: '#635BFF',
    gray: '#84847E',
    headerGreen: '#00BA00',
    tabBg: '#ADA8FF',
    grayTab: '#E8F0FE',
  },
  fontSize: {
    normal: 18,
    title: 28,
    small: 13,
  },
  size: {
    width: width / 1.1,
    fullWidth: width,
    sixtyWidth: width / 1.4,
  },
};
