import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Button from '../../../assets/components/button';
import Input from '../../../assets/components/textinput';
import {theme} from '../../../assets/constants/theme';
import PhoneInput from 'react-native-phone-number-input';
import styles from './styles';
import Dropdown from '../../../assets/components/dropdown';
import {useToast} from 'react-native-toast-notifications';
import {useDispatch, useSelector} from 'react-redux';
import {authLoad, registerUser} from '../../../redux/actions/auth';
import {Loading} from '../../../assets/components/Loading';
import {NoInternet} from '../../../assets/components/noInternet';

const Signup = ({navigation}) => {
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);
  const [firstName, setFirstName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [countryCode, setCountryCode] = useState('');

  const [formatted, setFormattedPhone] = useState('');
  const toast = useToast();
  const dispatch = useDispatch();
  const {authLoading} = useSelector(state => state.auth);
  const {connection} = useSelector(state => state.home);
  const phoneInput = useRef(null);
  const handleNav = () => {
    const validateData = validation();
    if (validateData) {
      register();
    }
  };

  const validation = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (
      firstName === '' ||
      lastname === '' ||
      email === '' ||
      phone === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      toast.show('Please fill all fields', {
        animationType: 'zoom-in',
        type: 'danger',
        duration: 2000,
        animationType: 'slide-in',
      });
      return false;
    } else if (password !== confirmPassword) {
      toast.show(`Password didn't match.`, {
        animationType: 'zoom-in',
        type: 'danger',
        duration: 2000,
        animationType: 'slide-in',
      });
      return false;
    } else if (reg.test(email) === false) {
      toast.show(`Enter a valid email.`, {
        animationType: 'zoom-in',
        type: 'danger',
        duration: 2000,
        animationType: 'slide-in',
      });
      return false;
    } else {
      return true;
    }
  };

  const register = () => {
    dispatch(authLoad(true));
    var formdata = new FormData();
    formdata.append('first_name', firstName);
    formdata.append('last_name', lastname);
    formdata.append('email', email);
    formdata.append('phone', phone);
    formdata.append('formatted_phone', formatted);
    formdata.append(
      'country_code',
      countryCode === '' ? 'PK' : countryCode.cca2,
    );
    formdata.append(
      'carrier_code',
      countryCode === '' ? '+92' : '+' + countryCode.callingCode[0],
    );
    formdata.append('password', password);
    formdata.append(
      'country_id',
      countryCode === '' ? '+92' : '+' + countryCode.callingCode[0],
    );

    console.log(formdata);
    dispatch(registerUser(formdata, success, error));
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
    navigation.navigate('VerifyPhoneOtp', {
      num: formatted,
    });
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
            <Text style={styles.signIn}>Create a new User</Text>
            <Text style={styles.donthave}>
              Already have an account?{' '}
              <Text
                style={{color: theme.colors.primary}}
                onPress={() => {
                  navigation.navigate('Login');
                }}>
                Sign In here.
              </Text>
            </Text>
          </View>
          <Input
            title="First Name*"
            placeHolder="Enter your First Name"
            onChangeText={val => {
              setFirstName(val);
            }}
            value={firstName}
          />
          <Input
            title="Last Name*"
            placeHolder="Enter your Last Name"
            onChangeText={val => {
              setLastname(val);
            }}
            value={lastname}
          />
          <Input
            title="Email*"
            placeHolder="Enter your Email"
            onChangeText={val => {
              setEmail(val.trim());
            }}
            value={email}
          />
          <View style={styles.input}>
            <Text
              style={{
                color: 'black',
                marginBottom: 5,
                fontSize: theme.fontSize.normal,
              }}>
              {'Phone Number*'}
            </Text>
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
          </View>
          <Input
            title="Password*"
            placeHolder="Enter your Password"
            onChangeText={val => {
              setPassword(val);
            }}
            value={password}
          />
          <Input
            title="Confirm Password*"
            placeHolder="Confirm your Password"
            onChangeText={val => {
              setConfirmPassword(val);
            }}
            value={confirmPassword}
          />
          {/* <Dropdown
            options={['Admin', 'User']}
            title={'User type*'}
            onSelect={val => {
              console.log(val);
              setUserType(val);
            }}
          /> */}
          <View style={{height: 20}} />
          <View
            style={{width: theme.size.width, alignSelf: 'center', zIndex: 0}}>
            <Text style={styles.forget}>
              By clicking Signup, You agree to our Terms, Data Policy and Cookie
              Policy.
            </Text>
          </View>
          <Button
            title={'Sign Up'}
            onPress={() => {
              handleNav();
            }}
          />

          <View style={{height: 200}}></View>
        </ScrollView>
        <NoInternet visible={!connection} />
        <Loading visible={authLoading} />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Signup;
