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
import {State} from 'react-native-gesture-handler';
import {useToast} from 'react-native-toast-notifications';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../../assets/components/button';
import Dropdown from '../../../assets/components/dropdown';
import Header from '../../../assets/components/header';
import {NoInternet} from '../../../assets/components/noInternet';
import {Processing} from '../../../assets/components/Processing';
import Input from '../../../assets/components/textinput';
import {theme} from '../../../assets/constants/theme';
import {
  balanceDetail,
  createWidthdrawl,
  fetchcoinPaymentFees,
  fetchPaypalFees,
  fetchWidthdrawFees,
  homeLoad,
} from '../../../redux/actions/home';
import CreateWidthdraw from '../createWidthdraw/createWidthdraw';
import styles from './styles';

const ConfirmWidthdraw = ({navigation, route}) => {
  const [balance, setBalance] = useState([]);
  const [feesData, setfeesData] = useState([]);
  const [total, setTotal] = useState([]);
  const [feesPercent, setfeesPercent] = useState();
  const {id, amount, method, account} = route.params;
  const {homeLoading, connection} = useSelector(state => state.home);
  const {loginData} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    getFees();
  }, []);
  const toast = useToast();
  const getFees = () => {
    var formdata = new FormData();
    formdata.append('user_id', loginData?.response.user_id);
    dispatch(homeLoad(true));
    dispatch(fetchWidthdrawFees(success, error));
    dispatch(balanceDetail(formdata, balanceSuccess));
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
    setTotal(parseInt(amount) + (parseInt(feesPercent) * amount) / 100);
    setfeesData(val.response);
    method === 'paypal'
      ? setfeesPercent(val.response.paypal.charge_percentage)
      : method === 'BTC'
      ? setfeesPercent(val.response.BTC.charge_percentage)
      : method === 'Bank'
      ? setfeesPercent(val.response.Bank.charge_percentage)
      : setfeesPercent(val.response.USDT.charge_percentage);
  };

  const balanceSuccess = val => {
    console.log(val.response);
    setBalance(val.response.user_balance);
  };

  const handleNav = () => {
    dispatch(homeLoad(true));
    var formdata = new FormData();
    formdata.append('user_id', loginData.response.user_id);
    formdata.append('payment_method_id', id);
    formdata.append('amount', amount);
    dispatch(createWidthdrawl(formdata, successWidth, errorWidth));
  };

  const successWidth = val => {
    toast.show(val.response, {
      animationType: 'zoom-in',
      type: 'success',
    });
    navigation.navigate('HomeScreen');
  };

  const errorWidth = val => {
    toast.show(val.message, {
      animationType: 'zoom-in',
      type: 'danger',
    });
  };
  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../../../assets/images/homeBg.png')}>
      <SafeAreaView style={styles.mainCont}>
        <NoInternet visible={!connection} />
        <Header title={'Withdraw'} navigation={navigation} />
        <ScrollView>
          <View style={styles.topTab}>
            <Text style={{color: 'white', fontSize: theme.fontSize.normal}}>
              Confirm withdrawal
            </Text>
            <Text style={styles.topDes}>
              {`Accumulated wallet funds can simply be withdrawn at any time, to your paypal ID or bank account. Setting up the withdrawal settings is must before proceding to make a withdraw.`}
            </Text>
          </View>
          <View style={styles.middleCont}>
            <View style={[styles.detailLine, {borderRadius: 0}]}>
              <Text style={[styles.detailText, {width: '100%'}]}>
                Withdraw Money {method}
              </Text>
            </View>

            <View style={[styles.detailLine, {backgroundColor: 'white'}]}>
              <Text style={styles.detailText}>Details</Text>
              <Text style={[styles.detailText]} numberOfLines={2}>
                {method}({account})
              </Text>
            </View>
            <View style={[styles.detailLine]}>
              <Text style={styles.detailText}>Gateway</Text>
              <Text style={[styles.detailText]} numberOfLines={1}>
                {method}
              </Text>
            </View>
            <View style={[styles.detailLine, {backgroundColor: 'white'}]}>
              <Text style={styles.detailText}>Widthdrawl Amount</Text>
              <Text style={styles.detailText}>$ {amount}</Text>
            </View>
            <View style={[styles.detailLine]}>
              <Text style={styles.detailText}>Fee</Text>
              <Text style={[styles.detailText]} numberOfLines={1}>
                ${' '}
                <Text style={{width: 30}}>
                  {(parseInt(feesPercent) * amount) / 100}
                </Text>
              </Text>
            </View>
            <View style={[styles.detailLine, {backgroundColor: 'white'}]}>
              <Text style={styles.detailText}>Total</Text>
              <Text style={styles.detailText}>
                {parseInt(amount) + (parseInt(feesPercent) * amount) / 100}
              </Text>
            </View>
            <Button
              width={'75%'}
              title="Confirm"
              onPress={() => {
                const totalA =
                  parseInt(amount) + (parseInt(feesPercent) * amount) / 100;
                if (totalA > balance) {
                  toast.show(`You don't have enough balance.`, {
                    animationType: 'zoom-in',
                    type: 'danger',
                  });
                } else {
                  handleNav();
                }
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
export default ConfirmWidthdraw;
