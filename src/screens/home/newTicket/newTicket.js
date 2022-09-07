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
import {Loading} from '../../../assets/components/Loading';
import {createTicket, homeLoad} from '../../../redux/actions/home';
import {NoInternet} from '../../../assets/components/noInternet';

const NewTicket = ({navigation}) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState('');

  const {loginData} = useSelector(state => state.auth);
  const {homeLoading, connection} = useSelector(state => state.home);
  const toast = useToast();
  const dispatch = useDispatch();
  const handleNav = () => {
    if (name == '' || message === '' || priority === '') {
      toast.show(`Enter all required fields.`, {
        animationType: 'zoom-in',
        type: 'danger',
        duration: 2000,
        animationType: 'slide-in',
      });
    } else {
      dispatch(homeLoad(true));
      var formdata = new FormData();
      // formdata.append('user_id', '2');
      // formdata.append('user_id', loginData.user_id);
      formdata.append('user_id', loginData.response.user_id);
      formdata.append('subject', name);
      formdata.append('message', message);
      formdata.append(
        'priority',
        priority === 0 ? 'Low' : priority === 1 ? 'Normal' : 'High',
      );
      console.log(formdata);
      dispatch(createTicket(formdata, success, error));
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
    navigation.navigate('HomeScreen');
  };
  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../../../assets/images/homeBg.png')}>
      <SafeAreaView style={styles.mainCont}>
        <NoInternet visible={!connection} />
        <Header title={'New Tickets'} navigation={navigation} />
        <ScrollView>
          <View style={styles.topTab}>
            <Text style={{color: 'white', fontSize: theme.fontSize.normal}}>
              New Tickets
            </Text>
            <Text style={styles.topDes}>{`Open a new ticket`}</Text>
          </View>
          <View style={styles.middleCont}>
            <Input
              width={'90%'}
              title={'Name*'}
              placeHolder="Enter Name"
              value={name}
              onChangeText={val => {
                setName(val);
              }}
            />
            <Input
              width={'90%'}
              title={'Message*'}
              placeHolder="Enter Message"
              height={100}
              multiline={true}
              textAlignVertical={'top'}
              value={message}
              onChangeText={val => {
                setMessage(val);
              }}
            />
            <Dropdown
              width={'90%'}
              title={'Priority'}
              options={['Low', 'Normal', 'High']}
              deropDownWidth="80%"
              onSelect={val => {
                console.log(val);
                setPriority(val);
              }}
            />

            <Button
              width={'90%'}
              title="Confirm"
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
export default NewTicket;
