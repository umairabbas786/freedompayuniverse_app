import React, {useState} from 'react';
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
import {homeLoad, scamProtest} from '../../../redux/actions/home';
import {useFocusEffect} from '@react-navigation/native';
import {Processing} from '../../../assets/components/Processing';
import {NoInternet} from '../../../assets/components/noInternet';

const ScamProtest = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [response, setResponse] = useState([]);
  const {homeLoading, connection} = useSelector(state => state.home);
  const dispatch = useDispatch();
  const toast = useToast();

  useFocusEffect(
    React.useCallback(() => {
      setResponse([]);
      setEmail('');
    }, [setResponse]),
  );
  const handleNav = () => {
    if (email === '') {
      toast.show('Please fill all fields', {
        animationType: 'zoom-in',
        type: 'danger',
        duration: 2000,
        animationType: 'slide-in',
      });
    } else {
      dispatch(homeLoad(true));
      var formdata = new FormData();
      formdata.append('email', email);
      dispatch(scamProtest(formdata, success, error));
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
    setResponse(val.response);
    dispatch(homeLoad(false));
  };
  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../../../assets/images/homeBg.png')}>
      <SafeAreaView style={styles.mainCont}>
        <NoInternet visible={!connection} />
        <Header title={'Scam Protest'} navigation={navigation} />
        <ScrollView>
          <View style={styles.middleCont}>
            <Input
              title="Verify User and Balance "
              width={'95%'}
              placeHolder={'Enter your email address'}
              onChangeText={val => {
                setEmail(val);
              }}
              value={email}
            />
            <Button
              width={'90%'}
              title="Confirm"
              onPress={() => {
                handleNav();
              }}
            />
          </View>
          {response.length !== 0 && (
            <View style={styles.middleCont}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    backgroundColor: '#499853',
                    borderRadius: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'flex-start',
                    height: 40,
                    width: 40,
                    marginLeft: 20,
                  }}>
                  <Icon name="dollar" type="font-awesome" color={'white'} />
                </View>
                <View style={{marginLeft: 10}}>
                  <Text style={{fontWeight: 'bold'}}>USD</Text>
                  <Text style={{color: '#499853'}}>{response.balance}</Text>
                </View>
              </View>
            </View>
          )}
          <View style={{height: 40}}></View>
        </ScrollView>
        <Processing visible={homeLoading} />
      </SafeAreaView>
    </ImageBackground>
  );
};
export default ScamProtest;
