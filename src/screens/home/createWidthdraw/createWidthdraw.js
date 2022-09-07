import {useFocusEffect} from '@react-navigation/native';
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
import {useToast} from 'react-native-toast-notifications';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../../assets/components/button';
import Dropdown from '../../../assets/components/dropdown';
import Header from '../../../assets/components/header';
import {NoInternet} from '../../../assets/components/noInternet';
import {Processing} from '../../../assets/components/Processing';
import Input from '../../../assets/components/textinput';
import {theme} from '../../../assets/constants/theme';
import {homeLoad, widthdrawlSetting} from '../../../redux/actions/home';
import styles from './styles';

const CreateWidthdraw = ({navigation}) => {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('');
  const [disable, setDisable] = useState(false);
  const [data, setData] = useState(['No data found']);
  const [dat, setDat] = useState([]);
  const [index, setIndex] = useState([]);

  const {loginData} = useSelector(state => state.auth);
  const {homeLoading, connection} = useSelector(state => state.home);
  useFocusEffect(
    React.useCallback(() => {
      getSetting();
    }, []),
  );
  const toast = useToast();
  const dispatch = useDispatch();

  const getSetting = () => {
    dispatch(homeLoad(true));
    var formdata = new FormData();
    formdata.append('user_id', loginData.response.user_id);
    dispatch(widthdrawlSetting(formdata, success, error));
  };
  const error = val => {
    console.log('val.message');
    console.log(val);
    toast.show(`You don't have any widthdraw setting `, {
      animationType: 'zoom-in',
      type: 'danger',
    });
    setData([]);
    setDisable(true);
  };
  const success = val => {
    console.log(val);
    const payments = val.response.map(item => {
      return `${item.withdrawal_type}(${item.account})`;
    });
    setData(payments);
    setDat(val.response);
  };

  const handleNext = () => {
    if (amount === '' || method === '') {
      toast.show(`Fill all fields`, {
        animationType: 'zoom-in',
        type: 'danger',
      });
    } else {
      navigation.navigate('ConfirmWidthdraw', {
        id: dat[index].id,
        amount: amount,
        method: dat[index].withdrawal_type,
        account: dat[index].account,
      });
    }
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
              Create Widthdrawl
            </Text>
            <Text style={styles.topDes}>
              {`Accumulated wallet funds can simply be withdrawn at any time, to your paypal ID or bank account. Setting up the withdrawal settings is must before proceding to make a withdraw.`}
            </Text>
          </View>
          <View style={{width: theme.size.width, alignSelf: 'center'}}>
            <TouchableOpacity
              style={styles.newTicketButton}
              onPress={() => {
                navigation.navigate('WidthdrawSetting');
              }}>
              <Icon
                name="setting"
                type="ant-design"
                size={theme.fontSize.normal}
              />
              <Text
                style={{
                  fontSize: theme.fontSize.small,
                  marginLeft: 8,
                  color: 'black',
                }}>
                Widthdraw Setting
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.middleCont}>
            <Dropdown
              width={'90%'}
              title={'Payment Method'}
              options={data}
              deropDownWidth="80%"
              onSelect={(index, val) => {
                setMethod(val);
                setIndex(index);
              }}
            />
            <Input
              width={'90%'}
              title={'Currency'}
              placeHolder="USD"
              keyboardType="numeric"
              editable={false}
            />
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

            {/* <Dropdown
              width={'90%'}
              title={'Currency'}
              options={['USD', 'PKR']}
              deropDownWidth="80%"
            /> */}

            <Button
              width={'90%'}
              title="Next"
              onPress={() => {
                disable
                  ? toast.show(`You don't have any widthdraw setting `, {
                      animationType: 'zoom-in',
                      type: 'danger',
                    })
                  : handleNext();
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
export default CreateWidthdraw;
