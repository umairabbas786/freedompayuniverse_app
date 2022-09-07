import React, {useRef, useEffect, useState} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import OTPTextInput from 'react-native-otp-textinput';
import styles from './styles';
import {theme} from '../../../assets/constants/theme';
import {useToast} from 'react-native-toast-notifications';
import {authLoad, loginUser, verifyPhone} from '../../../redux/actions/auth';
import auth from '@react-native-firebase/auth';
import {NoInternet} from '../../../assets/components/noInternet';

const VerifyPhoneOtp = ({navigation, route}) => {
  const [confirm, setConfirm] = useState('');
  const [otp, setOtp] = useState('');

  const {num} = route.params;
  let otpInput = useRef(null);
  const dispatch = useDispatch();
  const {connection} = useSelector(state => state.home);

  const clearText = () => {
    otpInput.current.clear();
  };

  const setText = () => {
    otpInput.current.setValue('1234');
  };
  const toast = useToast();

  useEffect(() => {
    handleNav();
  }, []);
  const handleNav = () => {
    dispatch(authLoad(true));
    signInWithPhoneNumber(num);
  };

  // Handle the button press
  const signInWithPhoneNumber = async phoneNumber => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      toast.show(`Otp sent to your Phone.${num}`, {
        animationType: 'zoom-in',
        type: 'success',
        duration: 2000,
        animationType: 'slide-in',
      });
      dispatch(authLoad(false));
      setConfirm(confirmation);
    } catch (error) {
      console.log(error);
      console.log('error.message');
      console.log(error.message);

      toast.show(
        'Invalid Phone Number : Phone numbers are written in the format [+][country code]',
        {
          animationType: 'zoom-in',
          type: 'danger',
          duration: 2000,
          animationType: 'slide-in',
        },
      );
    }
  };

  const confirmCode = async () => {
    try {
      dispatch(authLoad(false));
      const res = await confirm.confirm(otp);
      res && OtpSuccess();
    } catch (error) {
      dispatch(authLoad(false));
      console.log(error);
      console.warn('Invalid code.');
      toast.show('Invalid Code', {
        animationType: 'zoom-in',
        type: 'danger',
        duration: 2000,
        animationType: 'slide-in',
      });
    }
  };

  const OtpSuccess = () => {
    var formdata = new FormData();
    formdata.append('phone', num);
    dispatch(verifyPhone(formdata, success, error));
  };

  const success = () => {
    navigation.navigate('Login');
  };

  const error = () => {
    toast.show('Something went wrong.', {
      animationType: 'zoom-in',
      type: 'danger',
      duration: 2000,
      animationType: 'slide-in',
    });
  };

  return (
    <SafeAreaView style={styles.mainCont}>
      <ImageBackground
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        source={require('../../../assets/images/bgImage.png')}>
        <View style={{height: 100}}></View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{alignItems: 'center'}}>
            <Image
              style={{width: 200, height: 200, marginBottom: 20}}
              source={require('../../../assets/images/phoneOtp.png')}
            />
            <Text style={styles.title}>Verify Your OTP</Text>
            <Text style={styles.des}>
              Check Your Phone to get your 4 digit OTP
            </Text>
            <OTPTextInput
              tintColor={theme.colors.primary}
              inputCount={6}
              ref={e => (otpInput = e)}
              handleTextChange={val => {
                setOtp(val);
              }}
              inputCellLength={1}
            />
            <View style={{height: 10}}></View>
            <Text style={[styles.forget, {color: 'black'}]}>Send again </Text>
            <Button
              title={'Verify'}
              onPress={() => {
                dispatch(authLoad(true));
                confirmCode();
              }}
            />
            <View style={{height: 10}}></View>
            <Text
              style={styles.forget}
              onPress={() => {
                navigation.goBack();
              }}>
              Go Back
            </Text>
          </View>
        </ScrollView>
        <NoInternet visible={!connection} />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default VerifyPhoneOtp;
