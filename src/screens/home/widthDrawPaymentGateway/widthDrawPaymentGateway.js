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
import {useSelector} from 'react-redux';
import Button from '../../../assets/components/button';
import Dropdown from '../../../assets/components/dropdown';
import Header from '../../../assets/components/header';
import {NoInternet} from '../../../assets/components/noInternet';
import Input from '../../../assets/components/textinput';
import {theme} from '../../../assets/constants/theme';
import styles from './styles';

const WidthDrawPaymentGateway = ({navigation}) => {
  const {homeLoading, connection} = useSelector(state => state.home);
  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../../../assets/images/homeBg.png')}>
      <SafeAreaView style={styles.mainCont}>
        <NoInternet visible={!connection} />
        <Header title={'WidthDraw'} navigation={navigation} />
        <ScrollView>
          <View style={styles.topTab}>
            <Text style={{color: 'white', fontSize: theme.fontSize.normal}}>
              Payment Gateway
            </Text>
            <Text style={styles.topDes}>{``}</Text>
          </View>
          <View style={styles.middleCont}>
            <View
              style={{
                height: 280,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: theme.fontSize.normal,
                }}>
                Web View/gateway screen
              </Text>
            </View>
            <Button
              width={'75%'}
              title="Confirm"
              onPress={() => {
                navigation.navigate('WidthDrawSuccess');
              }}
            />
          </View>
          <View style={{height: 40}}></View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default WidthDrawPaymentGateway;
