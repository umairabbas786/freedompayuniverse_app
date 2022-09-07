import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../../assets/components/button';
import {Loading} from '../../../assets/components/Loading';
import Input from '../../../assets/components/textinput';
import {theme} from '../../../assets/constants/theme';
import {authLoad, loginUser} from '../../../redux/actions/auth';
import {useToast} from 'react-native-toast-notifications';

import styles from './styles';
import {NoInternet} from '../../../assets/components/noInternet';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  useEffect(() => {
    dispatch(authLoad(false));
  }, []);

  const dispatch = useDispatch();
  const {authLoading} = useSelector(state => state.auth);
  const {connection} = useSelector(state => state.home);
  const handleNav = () => {
    if (email === '' || password === '') {
      toast.show('Please fill all fields', {
        animationType: 'zoom-in',
        type: 'danger',
        duration: 2000,
        animationType: 'slide-in',
      });
    } else {
      dispatch(authLoad(true));
      var formdata = new FormData();
      formdata.append('email', email);
      formdata.append('password', password);

      console.log(formdata);
      dispatch(loginUser(formdata, success, error));
    }
  };

  const error = val => {
    console.log('val.message');
    console.log(val);
    {
      val.number !== null &&
        toast.show(val.message, {
          animationType: 'zoom-in',
          type: 'danger',
        });
    }
    if (val.message === 'Verify Your Phone Number' && val.number !== null) {
      navigation.navigate('VerifyPhoneOtp', {
        num: val.number,
      });
    } else if (
      val.message === 'Verify Your Phone Number' &&
      val.number === null
    ) {
      toast.show(
        'Please Contact Support at support@freedompayuniverse.com for login problem.',
        {
          animationType: 'zoom-in',
          type: 'danger',
          duration: 2000,
          animationType: 'slide-in',
        },
      );
    }
  };
  const success = val => {
    console.log(val);
    toast.show('Login Success.', {
      animationType: 'zoom-in',
      type: 'success',
    });
    dispatch(authLoad(false));
    navigation.replace('HomeStack');
  };
  return (
    <SafeAreaView style={styles.mainCont}>
      <ImageBackground
        resizeMode="cover"
        style={{flex: 1}}
        source={require('../../../assets/images/bgImage.png')}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.toCont}>
            <Image
              resizeMode="contain"
              style={styles.topImage}
              source={require('../../../assets/images/logo.png')}
            />
          </View>
          <View style={styles.signIntext}>
            <Text style={styles.signIn}>Sign In</Text>
            <Text style={styles.donthave}>
              Don't have an account?{' '}
              <Text
                style={{color: theme.colors.primary}}
                onPress={() => {
                  navigation.navigate('Signup');
                }}>
                Sign up here.
              </Text>
            </Text>
          </View>
          <Input
            title="Email"
            placeHolder="Enter your email"
            onChangeText={val => {
              setEmail(val);
            }}
            value={email}
          />
          <Input
            title="Password"
            placeHolder="Enter your Password"
            onChangeText={val => {
              setPassword(val);
            }}
            icon={true}
            iconName={'eye'}
            iconType={'feather'}
            iconPressedName="eye-off"
            value={password}
          />
          <Button
            onPress={() => {
              handleNav();
            }}
            title={'Login'}
          />
          <Text
            style={styles.forget}
            onPress={() => {
              navigation.navigate('ForgetPassword');
            }}>
            Forget Password ?
          </Text>
          <View style={{height: 40}}></View>
        </ScrollView>
        <NoInternet visible={!connection} />
        <Loading visible={authLoading} />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Login;
