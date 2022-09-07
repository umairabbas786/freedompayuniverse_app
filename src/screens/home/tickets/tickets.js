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
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../../assets/components/button';
import Dropdown from '../../../assets/components/dropdown';
import Header from '../../../assets/components/header';
import Input from '../../../assets/components/textinput';
import {theme} from '../../../assets/constants/theme';
import {homeLoad, ticketList} from '../../../redux/actions/home';
import {Processing} from '../../../../src/assets/components/Processing';
import styles from './styles';
import {useToast} from 'react-native-toast-notifications';
import {NoInternet} from '../../../assets/components/noInternet';

const Tickets = ({navigation}) => {
  const [data, setData] = useState([]);
  const toast = useToast();

  useFocusEffect(
    React.useCallback(() => {
      handleNav();
    }, [handleNav]),
  );
  const dispatch = useDispatch();
  const {loginData} = useSelector(state => state.auth);
  const {homeLoading, connection} = useSelector(state => state.home);

  const handleNav = () => {
    dispatch(homeLoad(true));
    var formdata = new FormData();
    formdata.append('user_id', loginData.response.user_id);
    dispatch(ticketList(formdata, success, error));
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
    dispatch(homeLoad(false));
    setData(val.response);
  };
  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../../../assets/images/homeBg.png')}>
      <SafeAreaView style={styles.mainCont}>
        <NoInternet visible={!connection} />
        <Header title={'Tickets'} navigation={navigation} />
        <ScrollView>
          <View style={styles.topTab}>
            <Text style={{color: 'white', fontSize: theme.fontSize.normal}}>
              New Tickets
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: theme.fontSize.normal,
                marginTop: 10,
              }}>
              Open New Tickets
            </Text>
          </View>
          <View style={{width: theme.size.width, alignSelf: 'center'}}>
            <TouchableOpacity
              style={styles.newTicketButton}
              onPress={() => {
                navigation.navigate('NewTicket');
              }}>
              <Icon
                name="edit"
                type="font-awesome"
                size={theme.fontSize.normal}
              />
              <Text
                style={{
                  fontSize: theme.fontSize.small,
                  marginLeft: 8,
                  color: 'black',
                }}>
                New Ticket
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.middleCont}>
            {data.length === 0 ? (
              <View style={{marginVertical: 20}}>
                <Icon
                  name="ticket"
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
                  No Tickets found
                </Text>
              </View>
            ) : (
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontSize: theme.fontSize.normal,
                    alignSelf: 'center',
                  }}>
                  Recent Tickets
                </Text>

                {data?.map(item => {
                  return (
                    <View
                      style={{
                        elevation: 5,
                        marginTop: 10,
                        borderRadius: 20,
                        borderWidth: 0.5,
                        borderColor: '#E8F0FE',
                      }}>
                      <View
                        style={[
                          styles.desTab,
                          {
                            marginTop: 10,
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                          },
                        ]}>
                        <View style={[styles.tabLeft, {borderRadius: 20}]}>
                          <Text style={styles.tabText}>Subject:</Text>
                          <Text style={[styles.tabText, {width: 100}]}>
                            {item.subject}
                          </Text>
                        </View>
                        <Text style={{color: 'black'}}>
                          {item.ticket_number}
                        </Text>
                      </View>
                      <View style={[styles.desTab, {backgroundColor: 'white'}]}>
                        <View style={[styles.tabLeft]}>
                          <Text style={styles.tabText}>Status:</Text>
                          <View
                            style={[
                              styles.closeCont,
                              {
                                backgroundColor:
                                  item.status === 'Open'
                                    ? 'green'
                                    : item.status === 'Pending'
                                    ? 'yellow'
                                    : 'red',
                              },
                            ]}>
                            <Text style={{color: 'white', textAlign: 'center'}}>
                              {item.status}
                            </Text>
                          </View>
                        </View>
                        <Text style={{color: 'black'}}></Text>
                      </View>
                      <View style={[styles.desTab]}>
                        <View style={[styles.tabLeft]}>
                          <Text style={styles.tabText}>Priority:</Text>
                          <Text style={[styles.tabText, {width: 100}]}>
                            {item.priority}
                          </Text>
                        </View>
                        <Text style={{color: 'black'}}></Text>
                      </View>
                      <View
                        style={[
                          styles.desTab,
                          {
                            backgroundColor: 'white',
                            borderBottomLeftRadius: 20,
                            borderBottomRightRadius: 20,
                          },
                        ]}>
                        <View style={[styles.tabLeft]}>
                          <Text style={styles.tabText}>Date:</Text>
                          <Text style={[styles.tabText, {width: 100}]}>
                            {item.date}
                          </Text>
                        </View>
                        <Icon
                          name="remove-red-eye"
                          type="material-icons"
                          onPress={() => {
                            navigation.navigate('ManageTickets', {
                              item: item,
                            });
                          }}
                        />
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
          <View style={{height: 40}}></View>
        </ScrollView>
        <Processing visible={homeLoading} />
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Tickets;
