import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {theme} from '../constants/theme';

const Input = ({
  title = 'Title',
  placeHolder = 'Place Holder',
  onChangeText,
  width = theme.size.width,
  keyboardType = 'default',
  height = 45,
  multiline = false,
  backgroundColor = 'white',
  titleColor = 'black',
  textAlignVertical = 'center',
  placeholderTextColor = theme.colors.gray,
  borderColor = 'black',
  color = 'black',
  icon = false,
  iconName = '',
  iconType = '',
  iconPressedName = '',
  value = '',
  editable = true,
  titleTrue = true,
}) => {
  const [iconPressed, setIconPressed] = useState(false);
  return (
    <View style={[styles.input, {width: width}]}>
      {titleTrue && (
        <Text
          style={{
            color: titleColor,
            marginBottom: 5,
            fontSize: theme.fontSize.normal,
          }}>
          {title}
        </Text>
      )}
      <View
        style={[
          styles.inputCont,
          {
            width: '100%',
            backgroundColor: backgroundColor,
            borderColor: borderColor,
          },
        ]}>
        <TextInput
          style={[
            styles.inputStyles,
            {
              height: height,
              textAlignVertical: textAlignVertical,
              color: color,
              width: icon ? '90%' : '95%',
            },
          ]}
          multiline={multiline}
          secureTextEntry={icon ? iconPressed : false}
          autoCapitalize={'none'}
          keyboardType={keyboardType}
          placeholder={placeHolder}
          placeholderTextColor={placeholderTextColor}
          onChangeText={onChangeText}
          value={value}
          editable={editable}
        />
        {icon && (
          <Icon
            name={iconPressed ? iconPressedName : iconName}
            type={iconType}
            onPress={() => {
              setIconPressed(!iconPressed);
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {alignSelf: 'center', marginTop: 15},
  inputCont: {
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: 'center',
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputStyles: {
    padding: 0,
    height: '100%',
    textAlignVertical: 'center',
  },
});

export default Input;
