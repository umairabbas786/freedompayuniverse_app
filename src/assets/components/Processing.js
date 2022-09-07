import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, Animated, Text} from 'react-native';
import theme from '../constants/theme';
import * as Animatable from 'react-native-animatable';

export const Processing = ({visible}) => {
  return (
    <View style={visible ? loader.centering : loader.hideIndicator}>
      <Animated.Image
        style={{width: 80, height: 90}}
        resizeMode={'contain'}
        source={require('../images/processing.png')}
      />
      <Animated.Image
        style={{width: 140, height: 30}}
        resizeMode={'contain'}
        source={require('../images/processingText.png')}
      />
    </View>
  );
};

const loader = StyleSheet.create({
  centering: {
    flex: 1,
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.99,
    zIndex: 99,
  },
  hideIndicator: {
    top: -100,
    opacity: 0,
    position: 'absolute',
  },
});
