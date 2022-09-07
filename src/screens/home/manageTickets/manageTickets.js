import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../../assets/components/button';
import Header from '../../../assets/components/header';
import {theme} from '../../../assets/constants/theme';
import {
  fetchConversation,
  homeLoad,
  replyTicket,
} from '../../../redux/actions/home';
import {useToast} from 'react-native-toast-notifications';
import styles from './styles';
import {Icon} from 'react-native-elements';
import Input from '../../../assets/components/textinput';
import {Processing} from '../../../assets/components/Processing';
import {NoInternet} from '../../../assets/components/noInternet';

const ManageTickets = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const [reply, setReply] = useState();
  const {item} = route.params;
  console.log(item);

  useEffect(() => {
    getConversation();
  }, []);
  const toast = useToast();
  const dispatch = useDispatch();
  const {loginData} = useSelector(state => state.auth);
  const {homeLoading, connection} = useSelector(state => state.home);

  const getConversation = () => {
    dispatch(homeLoad(true));
    var formdata = new FormData();
    formdata.append('user_id', loginData.response.user_id);
    formdata.append('ticket_id', item.ticket_id);
    dispatch(fetchConversation(formdata, success, error));
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
    setData(val.response);
  };

  const handleReply = () => {
    dispatch(homeLoad(true));
    if (reply === '') {
      toast.show(`Can't send emply Message.`, {
        animationType: 'zoom-in',
        type: 'danger',
      });
    } else {
      var formdata = new FormData();
      formdata.append('user_id', loginData.response.user_id);
      // formdata.append('user_id', '2');
      formdata.append('ticket_id', item.ticket_id);
      formdata.append('message', reply);
      dispatch(replyTicket(formdata, replySuccess, replyError));
    }
  };
  const replyError = val => {
    console.log('val.message');
    console.log(val);
    toast.show(val.message, {
      animationType: 'zoom-in',
      type: 'danger',
    });
  };
  const replySuccess = val => {
    console.log(val);
    setReply('');
    getConversation();
  };
  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../../../assets/images/homeBg.png')}>
      <SafeAreaView style={{flex: 1}}>
        <NoInternet visible={!connection} />
        <Header title={item.subject} navigation={navigation} />
        <ScrollView>
          <View style={styles.topTab}>
            <Text style={{color: 'white', fontSize: theme.fontSize.normal}}>
              Ticket Repy
            </Text>
            <Text style={styles.topDes}>{`Manage your tickets`}</Text>
          </View>
          <View style={styles.middleCont}>
            {data.length === 0 ? (
              <View
                style={{
                  marginVertical: 20,
                  alignItems: 'center',
                }}>
                <Icon
                  name="chat"
                  type="entypo"
                  color={theme.colors.primary}
                  size={30}
                />
                <Text
                  style={{
                    fontSize: theme.fontSize.normal,
                    fontWeight: '600',
                    color: 'black',
                    marginTop: 10,
                  }}>
                  No Conversation found
                </Text>
              </View>
            ) : (
              data.map(item => {
                return item.type !== 'user' ? (
                  <View style={styles.infoCont}>
                    <Image
                      style={{width: 40, height: 40, borderRadius: 100}}
                      source={require('../../../assets/images/profile.png')}
                    />
                    <View style={{width: '65%', marginLeft: 10}}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: 'black',
                          fontWeight: 'bold',
                          marginBottom: 5,
                        }}>
                        {item.name}
                      </Text>
                      <View
                        style={{
                          borderWidth: 1,
                          padding: 14,
                          borderRadius: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            color: 'black',
                            marginTop: 5,
                            marginLeft: 5,
                          }}>
                          {item.message}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 12,
                          color: 'black',
                          marginTop: 4,
                          marginLeft: 5,
                        }}>
                        {item.date}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View
                    style={[
                      styles.infoCont,
                      {alignSelf: 'flex-end', marginRight: 10, marginTop: 25},
                    ]}>
                    <View style={{width: '65%', marginRight: 10}}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: 'black',
                          fontWeight: 'bold',
                          marginBottom: 5,
                        }}>
                        {item.name}
                      </Text>
                      <View
                        style={{
                          borderWidth: 1,
                          padding: 14,
                          borderRadius: 10,
                        }}>
                        <Text style={{fontSize: 14, color: 'black'}}>
                          {item.message}
                        </Text>
                      </View>
                      <Text
                        style={{fontSize: 12, color: 'black', marginTop: 4}}>
                        {item.date}
                      </Text>
                    </View>
                    <Image
                      style={{width: 40, height: 40, borderRadius: 100}}
                      source={require('../../../assets/images/profile.png')}
                    />
                  </View>
                );
              })
            )}
          </View>
          <View style={{height: 40}}></View>
        </ScrollView>
        {item.status === 'CLosed' ? (
          <View>
            <Input
              titleTrue={false}
              placeHolder={'Enter Reply'}
              value={reply}
              onChangeText={val => {
                setReply(val);
              }}
            />
            <Button
              backgroundColor="white"
              title={'Reply'}
              color={'black'}
              onPress={() => {
                handleReply();
              }}
            />
          </View>
        ) : (
          <Button
            backgroundColor="white"
            title={'Ticket Closed'}
            color={'black'}
          />
        )}
        <Processing visible={homeLoading} />
      </SafeAreaView>
    </ImageBackground>
  );
};
export default ManageTickets;
