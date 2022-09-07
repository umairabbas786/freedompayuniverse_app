import React, {useState} from 'react';
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
import {useToast} from 'react-native-toast-notifications';
import {NoInternet} from '../../../assets/components/noInternet';
import {useSelector} from 'react-redux';

const Deposit = ({navigation}) => {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('');
  const toast = useToast();
  const {homeLoading, connection} = useSelector(state => state.home);

  const handleNav = () => {
    if (amount === '' || method === '') {
      toast.show('Please fill all fields', {
        animationType: 'zoom-in',
        type: 'danger',
      });
    } else if (amount < 20) {
      toast.show('Enter atleast 20', {
        animationType: 'zoom-in',
        type: 'danger',
      });
    } else {
      navigation.navigate('ConfirmDeposit', {
        amount: amount,
        method: method === 0 ? 'coinpayments' : 'Paypal',
      });
    }
  };
  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../../../assets/images/homeBg.png')}>
      <SafeAreaView style={styles.mainCont}>
        <NoInternet visible={!connection} />
        <Header title={'Deposit'} navigation={navigation} />
        <ScrollView>
          <View style={styles.topTab}>
            <Text style={{color: 'white', fontSize: theme.fontSize.normal}}>
              Create Deposit
            </Text>
            <Text style={styles.topDes}>
              {`You can deposit to your wallets using our popular payment methods.Fill the details correctly & the amount you want to deposit.`}
            </Text>
          </View>
          <View style={styles.middleCont}>
            <Input
              width={'90%'}
              title={'Amount'}
              placeHolder="0.00"
              value={amount}
              onChangeText={val => {
                setAmount(val);
              }}
              keyboardType="decimal-pad"
            />
            <Input
              width={'90%'}
              title={'Currency'}
              placeHolder="USD"
              keyboardType="numeric"
              editable={false}
            />
            {/* <Dropdown
              width={'90%'}
              title={'Currency'}
              options={['USD', 'PKR']}
              deropDownWidth="80%"
            /> */}
            <Dropdown
              width={'90%'}
              title={'Payment Method'}
              options={['Coin Payment', 'Paypal']}
              deropDownWidth="80%"
              onSelect={val => {
                setMethod(val);
              }}
            />
            <Button
              width={'90%'}
              title="Next"
              onPress={() => {
                handleNav();
              }}
            />
          </View>
          <View style={{height: 40}}></View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Deposit;
