import React, {useEffect, useState} from 'react';
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
import {useToast} from 'react-native-toast-notifications';
import {useDispatch, useSelector} from 'react-redux';
import {authLoad, resetpassword} from '../../../redux/actions/auth';
import {Loading} from '../../../assets/components/Loading';
import {NoInternet} from '../../../assets/components/noInternet';

const ResetPassword = ({navigation, route}) => {
  const {num, number} = route.params;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const toast = useToast();
  const {authLoading} = useSelector(state => state.auth);
  const {connection} = useSelector(state => state.home);

  useEffect(() => {}, []);

  const handleNav = () => {
    if (password === '' || confirmPassword === '') {
      toast.show(`Please enter your new password`, {
        animationType: 'zoom-in',
        type: 'success',
        duration: 2000,
        animationType: 'slide-in',
      });
    } else if (password !== confirmPassword) {
      toast.show(`Please enter your new password`, {
        animationType: 'zoom-in',
        type: 'danger',
        duration: 2000,
        animationType: 'slide-in',
      });
    } else {
      resetPass();
    }
  };
  const dispatch = useDispatch();
  const resetPass = () => {
    dispatch(authLoad(true));
    var formdata = new FormData();
    formdata.append('phone', number);
    formdata.append('password', password);
    console.log(formdata);
    dispatch(resetpassword(formdata, success, error));
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
    toast.show('Password reset Successfully.', {
      animationType: 'zoom-in',
      type: 'success',
    });
    dispatch(authLoad(false));
    navigation.replace('Login');
  };
  return (
    <SafeAreaView style={styles.mainCont}>
      <ImageBackground
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        source={require('../../../assets/images/bgImage.png')}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{alignItems: 'center'}}>
            <Image
              style={{width: 200, height: 200, marginBottom: 15}}
              source={require('../../../assets/images/password.png')}
            />
            <Text style={styles.title}>Reset Password</Text>
            <Input
              title={'New Password*'}
              placeHolder="Enter your New Password"
              onChangeText={val => {
                setPassword(val);
              }}
              value={password}
            />
            <Input
              title={'Confirm Password*'}
              placeHolder="Confirm your Password"
              onChangeText={val => {
                setConfirmPassword(val);
              }}
              value={confirmPassword}
            />
            <View style={{height: 10}}></View>
            <Button
              title={'Submit'}
              onPress={() => {
                handleNav();
              }}
            />
            <View style={{height: 10}}></View>
            <Text
              style={styles.forget}
              onPress={() => {
                navigation.goBack();
              }}>
              Go Back{' '}
            </Text>
          </View>
        </ScrollView>
        <Loading visible={authLoading} />
        <NoInternet visible={!connection} />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ResetPassword;
