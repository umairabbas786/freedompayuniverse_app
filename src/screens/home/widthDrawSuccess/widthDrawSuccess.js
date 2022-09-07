import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {fonts} from 'react-native-elements/dist/config';
import Button from '../../../assets/components/button';
import Dropdown from '../../../assets/components/dropdown';
import Header from '../../../assets/components/header';
import Input from '../../../assets/components/textinput';
import {theme} from '../../../assets/constants/theme';
import styles from './styles';

const WidthDrawSuccess = ({navigation}) => {
  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../../../assets/images/homeBg.png')}>
      <SafeAreaView style={styles.mainCont}>
        <Header
          title={'Widthdraw'}
          navigation={navigation}
          onPressImage={() => {
            navigation.navigate('Setting');
          }}
        />
        <ScrollView>
          <View style={styles.topTab}>
            <Text style={{color: 'white', fontSize: theme.fontSize.normal}}>
              Payment Success
            </Text>
            <Text style={styles.topDes}>{``}</Text>
          </View>
          <View style={styles.middleCont}>
            <View
              style={{
                height: 230,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                name="checkcircle"
                type="ant-design"
                color={theme.colors.primary}
                size={40}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: theme.fontSize.normal,
                  marginTop: 15,
                }}>
                Success
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: theme.fontSize.small,
                  marginTop: 15,
                }}>
                Your Withdrawn Amount is Been Processed
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: theme.fontSize.normal,
                  marginTop: 15,
                }}>
                Deposit Amount : $ 500.00
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '85%',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  color: theme.colors.primary,
                  fontSize: theme.fontSize.small,
                }}
                onPress={() => {
                  navigation.navigate('HomeScreen');
                }}>
                Back to Home
              </Text>
              <Button
                width={'55%'}
                title="Widthdraw Again"
                marginTop={0}
                fontSize={theme.fontSize.small}
                onPress={() => {
                  navigation.navigate('CreateWidthdraw');
                }}
              />
            </View>
          </View>
          <View style={{height: 40}}></View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default WidthDrawSuccess;
