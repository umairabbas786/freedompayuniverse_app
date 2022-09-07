import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {theme} from '../constants/theme';

const Button = ({
  title,
  onPress,
  fontSize = theme.fontSize.normal,
  width = theme.size.width,
  marginTop = 20,
  backgroundColor = theme.colors.primary,
  color = 'white',
  extraData = '',
  extraColor = '',
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          width: width,
          marginTop: marginTop,
          backgroundColor: backgroundColor,
        },
      ]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={{color: color, fontSize: fontSize}}>
        {title}

        <Text style={{color: extraColor}}>
          {'  '}
          {extraData}
        </Text>
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 45,
    borderRadius: 10,
    alignSelf: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Button;
