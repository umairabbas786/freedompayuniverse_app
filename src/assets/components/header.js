import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {theme} from '../constants/theme';

const Header = ({title, navigation}) => {
  const {userData} = useSelector(state => state.home);
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          width: theme.size.width,
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 50,
          alignSelf: 'center',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            borderRadius: 100,
          }}>
          <Icon
            name={'leftcircle'}
            type={'ant-design'}
            color={theme.colors.headerGreen}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </TouchableOpacity>
        <Text style={{color: 'white', fontSize: theme.fontSize.title}}>
          {title}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Setting');
          }}>
          <Image
            style={{width: 37, height: 37, borderRadius: 100}}
            source={
              userData?.profile_picture === null
                ? require('../images/profile.png')
                : {uri: userData?.profile_picture}
            }
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: 'white',
          width: theme.size.fullWidth,
        }}
      />
    </View>
  );
};

export default Header;
