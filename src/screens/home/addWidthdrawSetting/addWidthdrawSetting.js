import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {fonts} from 'react-native-elements/dist/config';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../../assets/components/button';
import Dropdown from '../../../assets/components/dropdown';
import Header from '../../../assets/components/header';
import Input from '../../../assets/components/textinput';
import {theme} from '../../../assets/constants/theme';
import {useToast} from 'react-native-toast-notifications';
import {Loading} from './../../../assets/components/Loading';
import styles from './styles';
import {
  addWidthdrawlSetting,
  fetchCountry,
  homeLoad,
} from '../../../redux/actions/home';
import {useFocusEffect} from '@react-navigation/native';
import {NoInternet} from '../../../assets/components/noInternet';

const AddWidthdrawSetting = ({navigation}) => {
  const {loginData} = useSelector(state => state.auth);
  const {homeLoading, connection} = useSelector(state => state.home);
  const [type, setType] = useState('');
  const [address, setAddress] = useState('');
  const [HolderNmae, setHolderName] = useState('');
  const [bankNum, setBankNum] = useState('');
  const [swiftCode, setSwiftCode] = useState('');
  const [bankName, setBankName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [branchCity, setBranchCity] = useState('');
  const [branchAddress, setBranchAddress] = useState('');
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState('');

  const toast = useToast();
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      getCountries();
    }, [getCountries]),
  );

  const getCountries = () => {
    dispatch(fetchCountry(countrySuccess, countryError));
  };

  const countryError = val => {};
  const countrySuccess = val => {
    console.log(val);
    const filtered = val.response.map(item => {
      return item.name;
    });
    console.log(filtered);
    setCountries(filtered);
  };

  const handleNav = () => {
    if (type !== 1) {
      if (type === '' || address === '') {
        toast.show('Please fill all fields', {
          animationType: 'zoom-in',
          type: 'danger',
          duration: 2000,
          animationType: 'slide-in',
        });
      } else {
        dispatch(homeLoad(true));
        var formdata = new FormData();
        formdata.append('user_id', loginData.response.user_id);
        formdata.append(
          'withdraw_type',
          type === 0 ? 'Paypal' : type === 2 ? 'BTC' : 'USDT TRC20',
        );
        formdata.append('address', address);
        dispatch(addWidthdrawlSetting(formdata, success, error));
      }
    } else {
      if (
        type === '' ||
        HolderNmae === '' ||
        bankNum === '' ||
        swiftCode === '' ||
        bankName === '' ||
        branchName === '' ||
        branchCity === '' ||
        branchAddress === '' ||
        country === ''
      ) {
        toast.show('Please fill all fields', {
          animationType: 'zoom-in',
          type: 'danger',
          duration: 2000,
          animationType: 'slide-in',
        });
      } else {
        dispatch(homeLoad(true));
        var formdata = new FormData();
        formdata.append('user_id', loginData.response.user_id);
        formdata.append('withdraw_type', 'Bank');
        formdata.append('account_holder_name', HolderNmae);
        formdata.append('account_number', bankNum);
        formdata.append('swift_code', swiftCode);
        formdata.append('bank_name', bankName);
        formdata.append('branch_name', branchName);
        formdata.append('branch_address', branchAddress);
        formdata.append('branch_city', branchCity);
        formdata.append('country_id', country);

        dispatch(addWidthdrawlSetting(formdata, success, error));
      }
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
              Add Widthdrawl Setting
            </Text>
            <Text style={styles.topDes}>{`Add new widthdraw setting.`}</Text>
          </View>

          <View style={styles.middleCont}>
            {/* <Input
              width={'90%'}
              title={'Widthdraw Type'}
              placeHolder="Enter you Withdraw type"
              value={type}
              onChangeText={val => {
                setType(val);
              }}
              keyboardType="decimal-pad"
            /> */}
            <Dropdown
              width={'90%'}
              title={'Widthdraw Type'}
              options={['Paypal', 'Bank', 'BTC', 'USDT TRC20']}
              deropDownWidth="80%"
              onSelect={val => {
                setType(val);
                console.log(type);
              }}
            />
            {type !== 1 ? (
              <Input
                width={'90%'}
                title={'Address/Email'}
                placeHolder="Enter Address or Email"
                value={address}
                onChangeText={val => {
                  setAddress(val);
                }}
                keyboardType="default"
              />
            ) : (
              <View>
                <Input
                  width={'90%'}
                  title={`Bank Account Holder's name`}
                  placeHolder="Enter Bank Account Holder's name"
                  value={HolderNmae}
                  onChangeText={val => {
                    setHolderName(val);
                  }}
                  keyboardType="default"
                />
                <Input
                  width={'90%'}
                  title={`Bank Account Number/IBAN`}
                  placeHolder="Enter Bank Account Number/IBAN"
                  value={bankNum}
                  onChangeText={val => {
                    setBankNum(val);
                  }}
                  keyboardType="default"
                />
                <Input
                  width={'90%'}
                  title={'Swift Code'}
                  placeHolder="Enter Swift Code"
                  value={swiftCode}
                  onChangeText={val => {
                    setSwiftCode(val);
                  }}
                />
                <Input
                  width={'90%'}
                  title={'Bank Name'}
                  placeHolder="Enter Bank Name"
                  value={bankName}
                  onChangeText={val => {
                    setBankName(val);
                  }}
                />
                <Input
                  width={'90%'}
                  title={'Branch Name'}
                  placeHolder="Enter Branch Name"
                  value={branchName}
                  onChangeText={val => {
                    setBranchName(val);
                  }}
                />
                <Input
                  width={'90%'}
                  title={'Branch City'}
                  placeHolder="Enter Branch City"
                  value={branchCity}
                  onChangeText={val => {
                    setBranchCity(val);
                  }}
                />
                <Input
                  width={'90%'}
                  title={'Branch Address'}
                  placeHolder="Enter Branch Address"
                  value={branchAddress}
                  onChangeText={val => {
                    setBranchAddress(val);
                  }}
                />
                {/* <Input
                  width={'90%'}
                  title={'Country'}
                  placeHolder="Enter Country"
                  value={country}
                  onChangeText={val => {
                    setCountry(val);
                  }}
                /> */}
                <Dropdown
                  width={'90%'}
                  title={'Country'}
                  options={countries}
                  deropDownWidth="80%"
                  height={200}
                  onSelect={val => {
                    setCountry(val + 1);
                    console.log(country);
                  }}
                />
              </View>
            )}

            {/* <Dropdown
              width={'90%'}
              title={'Currency'}
              options={['USD', 'PKR']}
              deropDownWidth="80%"
            /> */}

            <Button
              width={'90%'}
              title="Submit"
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
export default AddWidthdrawSetting;
