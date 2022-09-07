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
import Input from '../../../assets/components/textinput';
import {theme} from '../../../assets/constants/theme';
import styles from './styles';
import {useToast} from 'react-native-toast-notifications';
import {homeLoad, transferMoney} from '../../../redux/actions/home';
import {Loading} from '../../../assets/components/Loading';
import {useFocusEffect} from '@react-navigation/native';
import {NoInternet} from '../../../assets/components/noInternet';

const SendMoney = ({navigation}) => {
  const [recipient, setRecipent] = useState('');
  const [currency, setCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const toast = useToast();

  const {loginData} = useSelector(state => state.auth);
  const {homeLoading, connection} = useSelector(state => state.home);

  useFocusEffect(
    React.useCallback(() => {
      clear();
    }, []),
  );

  const dispatch = useDispatch();

  const clear = () => {
    setRecipent('');
    setAmount('');
    setNotes('');
  };
  const handleNav = () => {
    if (recipient === '' || amount === '' || notes === '') {
      toast.show('Fill all fields', {
        animationType: 'zoom-in',
        type: 'danger',
      });
    } else {
      dispatch(homeLoad(true));
      var formdata = new FormData();
      formdata.append('user_id', loginData.response.user_id);
      formdata.append('recipient_email', recipient);
      formdata.append('amount', amount);
      formdata.append('note', notes);
      console.log(formdata);
      dispatch(transferMoney(formdata, success, error));
    }
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
    toast.show(val.response, {
      animationType: 'zoom-in',
      type: 'success',
    });
    clear();
  };

  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../../../assets/images/homeBg.png')}>
      <SafeAreaView style={styles.mainCont}>
        <NoInternet visible={!connection} />
        <Header title={'Send Money'} navigation={navigation} />
        <ScrollView>
          <View style={styles.topTab}>
            <Text style={{color: 'white', fontSize: theme.fontSize.normal}}>
              Send Money
            </Text>
            <Text style={styles.topDes}>
              {`Enter your recipient's email address or phone number & then add an amount with currency to send money securely. You can also provide a note for a reference.`}
            </Text>
          </View>
          <View style={styles.middleCont}>
            <Input
              width={'90%'}
              title={'Recipient '}
              placeHolder="Enter Recipient email"
              keyboardType="email-address"
              value={recipient}
              onChangeText={val => {
                setRecipent(val);
              }}
            />

            <Input
              width={'90%'}
              title={'Currency '}
              placeHolder="USD"
              keyboardType="email-address"
              editable={false}
            />

            <Input
              width={'90%'}
              title={'Amount'}
              placeHolder="Enter Amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={val => {
                setAmount(val);
              }}
            />
            <Input
              width={'90%'}
              title={'Note'}
              placeHolder="Enter Notes for Receiver"
              value={notes}
              onChangeText={val => {
                setNotes(val);
              }}
              height={90}
              textAlignVertical={'top'}
              multiline={true}
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
        <Loading visible={homeLoading} />
      </SafeAreaView>
    </ImageBackground>
  );
};
export default SendMoney;
