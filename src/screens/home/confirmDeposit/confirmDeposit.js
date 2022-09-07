import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {fonts} from 'react-native-elements/dist/config';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../../assets/components/button';
import Dropdown from '../../../assets/components/dropdown';
import Header from '../../../assets/components/header';
import {Processing} from '../../../assets/components/Processing';
import Input from '../../../assets/components/textinput';
import {theme} from '../../../assets/constants/theme';
import {
  fetchcoinPaymentFees,
  fetchPaypalFees,
  homeLoad,
  paypalAPIs,
} from '../../../redux/actions/home';
import {useToast} from 'react-native-toast-notifications';
import styles from './styles';
import {NoInternet} from '../../../assets/components/noInternet';

const ConfirmDeposit = ({navigation, route}) => {
  const [feesData, setfeesData] = useState([]);
  const {amount, method} = route.params;
  const {homeLoading, connection} = useSelector(state => state.home);
  const {loginData} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    getFees();
  }, []);

  const getFees = () => {
    dispatch(homeLoad(true));
    method === 'Paypal'
      ? dispatch(fetchPaypalFees(success, error))
      : dispatch(fetchcoinPaymentFees(success, error));
  };

  const error = val => {
    console.log('val.message');
    console.log(val);
    toast.show(val.message, {
      animationType: 'zoom-in',
      type: 'danger',
    });
  };
  const success = val => {
    console.log(val);
    setfeesData(val.response);
  };

  const handleNav = () => {
    dispatch(homeLoad(true));
    var formdata = new FormData();
    formdata.append('cmd', '_xclick');
    formdata.append('no_note', '1');
    formdata.append('lc', 'UK');
    formdata.append('bn', 'PP-BuyNowBF:btn_buynow_LG.gif:NonHostedGuest');
    formdata.append('first_name', loginData.response.first_name);
    formdata.append('last_name', loginData.response.last_name);
    formdata.append('payer_email', loginData.response.email);
    formdata.append(
      'item_number',
      Math.floor(Math.random() * 11 + Math.random() * 15),
    );
    formdata.append('amount', amount);
    formdata.append('user_id', loginData.response.user_id);

    console.log(formdata);
    dispatch(paypalAPIs(formdata, navSuccess, navError));
  };
  const navError = val => {
    console.log('val.message');
    console.log(val);
  };
  const navSuccess = val => {
    console.log('val');
    console.log(val);
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
              Confirmation
            </Text>
            <Text style={styles.topDes}>
              {`Check your deposit information before confirm.`}
            </Text>
          </View>
          <View style={styles.middleCont}>
            <View
              style={[
                styles.detailLine,
                {backgroundColor: 'white', borderRadius: 20},
              ]}>
              <Text style={[styles.detailText, {width: '100%'}]}>
                Deposit Money via Coinpayments
              </Text>
            </View>
            <View style={[styles.detailLine, {backgroundColor: 'white'}]}>
              <Text style={styles.detailText}>Details</Text>
            </View>
            <View style={[styles.detailLine]}>
              <Text style={styles.detailText}>Gateway</Text>
              <Text style={[styles.detailText]} numberOfLines={1}>
                {feesData.gateway}
              </Text>
            </View>
            <View style={[styles.detailLine, {backgroundColor: 'white'}]}>
              <Text style={styles.detailText}>Deposit Amount</Text>
              <Text style={styles.detailText}>$ {amount}</Text>
            </View>
            <View style={[styles.detailLine]}>
              <Text style={styles.detailText}>Fee</Text>
              <Text style={styles.detailText} numberOfLines={1}>
                ${' '}
                <Text style={{width: 30}}>
                  {(parseInt(feesData.charge_percentage) * amount) / 100}
                </Text>
              </Text>
            </View>
            <View style={[styles.detailLine, {backgroundColor: 'white'}]}>
              <Text style={styles.detailText}>Total</Text>
              <Text style={styles.detailText}>
                ${' '}
                {parseInt(amount) +
                  (parseInt(feesData.charge_percentage) * amount) / 100}
              </Text>
            </View>
            <Button
              width={'75%'}
              title="Confirm"
              onPress={() => {
                navigation.navigate('DepositPaymentGateway', {
                  amount: amount,
                  feesData: feesData,
                  method: method,
                });
                // navigation.navigate('DepositPaymentGateway');
              }}
            />
          </View>
          <View style={{height: 40}}></View>
        </ScrollView>
        <Processing visible={homeLoading} />
      </SafeAreaView>
    </ImageBackground>
  );
};
export default ConfirmDeposit;
