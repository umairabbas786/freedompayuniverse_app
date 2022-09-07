import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  ImageBackground,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import Button from '../../../assets/components/button';
import Input from '../../../assets/components/textinput';
import styles from './styles';
import PhoneInput from 'react-native-phone-number-input';
import {useDispatch, useSelector} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';
import {authLoad, checkNum} from '../../../redux/actions/auth';
import {Loading} from '../../../assets/components/Loading';
import {NoInternet} from '../../../assets/components/noInternet';

const ForgetPassword = ({navigation}) => {
  const [value, setValue] = useState('');
  const phoneInput = useRef(null);
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [formatted, setFormattedPhone] = useState('');
  const dispatch = useDispatch();
  const {connection} = useSelector(state => state.home);
  const {authLoading} = useSelector(state => state.auth);
  const toast = useToast();
  const handleNav = () => {
    if (phone === '') {
      toast.show('Enter the phone Number', {
        animationType: 'zoom-in',
        type: 'danger',
      });
    } else {
      dispatch(authLoad(true));
      var formdata = new FormData();
      formdata.append('phone', phone);
      dispatch(checkNum(formdata, success, error));
    }
  };

  const error = val => {
    console.log('val.message');
    dispatch(authLoad(false));
    console.log(val);
    toast.show(val.message, {
      animationType: 'zoom-in',
      type: 'danger',
    });
  };
  const success = val => {
    dispatch(authLoad(false));
    console.log(val);
    navigation.navigate('VerifyOtp', {
      num: formatted,
      number: phone,
    });
  };
  return (
    <SafeAreaView style={styles.mainCont}>
      <ImageBackground
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'red',
        }}
        source={require('../../../assets/images/bgImage.png')}>
        <View style={{height: 100}}></View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{alignItems: 'center'}}>
            <Image
              style={{width: 180, height: 180, marginBottom: 20}}
              source={require('../../../assets/images/lock.png')}
            />
            <View>
              <Text style={styles.title}>Reset Password</Text>
              <Text style={styles.des}>
                Enter your Phone number to reset your password
              </Text>
            </View>
            <PhoneInput
              ref={phoneInput}
              defaultValue={value}
              defaultCode="PK"
              layout="first"
              containerStyle={styles.constStyleInput}
              textContainerStyle={styles.constTextInputPhone}
              textInputStyle={{padding: 0, height: 43}}
              codeTextStyle={styles.codePhoneText}
              onChangeText={text => {
                setPhone(text);
              }}
              onChangeFormattedText={text => {
                setFormattedPhone(text);
                console.log(phone);
              }}
              onChangeCountry={val => {
                setCountryCode(val);
                console.log(val);
              }}
              withDarkTheme
              withShadow
            />
            <View style={{height: 10}}></View>
            <Button
              onPress={() => {
                handleNav();
              }}
              title={'Confirm'}
            />
            <View style={{height: 10}}></View>
            <Text
              style={styles.forget}
              onPress={() => {
                navigation.goBack();
              }}>
              Back to Sign In{' '}
            </Text>
          </View>
        </ScrollView>
        <Loading visible={authLoading} />
        <NoInternet visible={!connection} />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ForgetPassword;
