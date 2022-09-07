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

const ConfirmSendMoney = () => {
  const {homeLoading, connection} = useSelector(state => state.home);
  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../../../assets/images/homeBg.png')}>
      <SafeAreaView style={styles.mainCont}>
        <Header title={'Send Money'} navigation={navigation} />
        <ScrollView>
          <View style={styles.topTab}></View>
          <View style={styles.middleCont}>
            <View
              style={[
                styles.detailLine,
                {backgroundColor: 'white', borderRadius: 20},
              ]}>
              <Text style={[styles.detailText, {width: '100%'}]}>
                Send Money via Coinpayments
              </Text>
            </View>
            <View style={[styles.detailLine]}>
              <Text style={styles.detailText}>Details</Text>
            </View>
            <View style={[styles.detailLine, {backgroundColor: 'white'}]}>
              <Text style={styles.detailText}>Recipient Name</Text>
              <Text style={styles.detailText}>Jack Forester</Text>
            </View>

            <View style={[styles.detailLine]}>
              <Text style={styles.detailText}>Deposit Amount</Text>
              <Text style={styles.detailText}>$ 20,000.00</Text>
            </View>
            <View style={[styles.detailLine, {backgroundColor: 'white'}]}>
              <Text style={styles.detailText}>Fee</Text>
              <Text style={styles.detailText}>$ 2.00</Text>
            </View>
            <View style={[styles.detailLine]}>
              <Text style={styles.detailText}>Total</Text>
              <Text style={styles.detailText}>$ 20,002.00</Text>
            </View>
            <Button width={'75%'} title="Confirm" />
          </View>
          <View style={{height: 40}}></View>
        </ScrollView>
      </SafeAreaView>
      <NoInternet visible={!connection} />
    </ImageBackground>
  );
};
export default ConfirmSendMoney;
