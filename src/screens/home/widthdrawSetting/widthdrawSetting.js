import React, {useEffect, useState} from 'react';
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
import {State} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../../assets/components/button';
import Dropdown from '../../../assets/components/dropdown';
import Header from '../../../assets/components/header';
import {Processing} from '../../../assets/components/Processing';
import Input from '../../../assets/components/textinput';
import {theme} from '../../../assets/constants/theme';
import {
  deleteWidthdrawlSetting,
  fetchcoinPaymentFees,
  fetchPaypalFees,
  homeLoad,
  widthdrawlSetting,
} from '../../../redux/actions/home';
import {useToast} from 'react-native-toast-notifications';
import styles from './styles';
import {useFocusEffect} from '@react-navigation/native';
import {NoInternet} from '../../../assets/components/noInternet';

const WidthdrawSetting = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const {homeLoading, connection} = useSelector(state => state.home);
  const {loginData} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      getSetting();
    }, [getSetting]),
  );
  const toast = useToast();

  const getSetting = () => {
    dispatch(homeLoad(true));
    var formdata = new FormData();
    formdata.append('user_id', loginData.response.user_id);
    dispatch(widthdrawlSetting(formdata, success, error));
  };
  const error = val => {
    console.log('val.message');
    console.log(val);
    toast.show(val.message, {
      animationType: 'zoom-in',
      type: 'danger',
    });
    setData([]);
  };
  const success = val => {
    console.log(val);
    setData(val.response);
  };
  const deleteSetting = item => {
    dispatch(homeLoad(true));
    var formdata = new FormData();
    formdata.append('withdraw_setting_id', item.id);
    dispatch(deleteWidthdrawlSetting(formdata, deleteSuccess, deleteError));
  };
  const deleteError = val => {
    console.log('val.message');
    console.log(val);
    toast.show(val.message, {
      animationType: 'zoom-in',
      type: 'danger',
    });
    getSetting();
  };
  const deleteSuccess = val => {
    console.log(val);
    getSetting();
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
              Widthdraw Setting
            </Text>
            <Text
              style={styles.topDes}>{`Manage your withdrawl settings`}</Text>
          </View>
          <View style={{height: 40}}></View>
          <TouchableOpacity
            style={styles.newTicketButton}
            onPress={() => {
              navigation.navigate('AddWidthdrawSetting');
            }}>
            <Icon
              name="pluscircle"
              type="ant-design"
              size={theme.fontSize.normal}
            />
            <Text
              style={{
                fontSize: theme.fontSize.small,
                marginLeft: 8,
                color: 'black',
              }}>
              Add Setting
            </Text>
          </TouchableOpacity>
          <View style={styles.scrollrender}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <Text style={{fontWeight: 'bold', color: 'black'}}>
                Widthdrawl Type
              </Text>
              <Text style={{fontWeight: 'bold', color: 'black'}}>Account</Text>
              <Text style={{fontWeight: 'bold', color: 'black'}}>Action</Text>
            </View>
            {data?.map(item => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    marginTop: 20,
                  }}>
                  <Text style={{color: 'black', width: '25%'}}>
                    {item.withdrawal_type}
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      width: '50%',
                    }}>
                    {item.account}
                  </Text>
                  <Icon
                    name="delete"
                    onPress={() => {
                      deleteSetting(item);
                    }}
                  />
                </View>
              );
            })}
            {data.length === 0 && (
              <View style={{marginVertical: 20, alignItems: 'center'}}>
                <Icon
                  name="sad-tear"
                  type="font-awesome-5"
                  color={theme.colors.primary}
                  size={45}
                />
                <Text style={{fontWeight: 'bold', marginTop: 10}}>
                  Sorry! No data Found
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
        <Processing visible={homeLoading} />
      </SafeAreaView>
    </ImageBackground>
  );
};
export default WidthdrawSetting;
