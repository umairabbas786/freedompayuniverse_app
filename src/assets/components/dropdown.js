import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import {theme} from '../constants/theme';

const Dropdown = ({
  title = 'Title',
  width = theme.size.width,
  options = ['Option 1', 'Option 2'],
  deropDownWidth = '85%',
  onSelect,
  titleColor = 'black',
  defaultVal,
  height = 100,
}) => {
  return (
    <View style={[styles.input, {width: width}]}>
      <Text
        style={{
          color: titleColor,
          marginBottom: 5,
          fontSize: theme.fontSize.normal,
        }}>
        {title}
      </Text>

      <ModalDropdown
        defaultValue={defaultVal}
        style={[
          styles.dropDownStyles,
          {
            width: '100%',
          },
        ]}
        dropdownStyle={{
          width: deropDownWidth,
          alignSelf: 'center',
          height: height,
        }}
        containerStyle={{
          height: 40,
          zIndex: 100,
        }}
        textStyle={{
          fontSize: 15,
          color: 'black',
        }}
        options={options}
        onSelect={onSelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {alignSelf: 'center', marginTop: 15},

  dropDownStyles: {
    height: 45,
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 10,
  },
});

export default Dropdown;
