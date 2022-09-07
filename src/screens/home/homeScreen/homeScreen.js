import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ImageBackground,
  StatusBar,
  Animated,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {moderateScale} from '../../../assets/constants/moderateScale';
import {Icon} from 'react-native-elements';
import Modal from 'react-native-modal';
import {theme} from '../../../assets/constants/theme';
import {useDispatch, useSelector} from 'react-redux';
import {
  addressVerify,
  balanceDetail,
  checkAddressVerify,
  checkVerify,
  docVerify,
  fetchNews,
  getProfileInfo,
  getTransactions,
  homeLoad,
  setUserData,
  transactionDetail,
} from '../../../redux/actions/home';
import {authLoad} from '../../../redux/actions/auth';
import {Loading} from '../../../assets/components/Loading';
import {Processing} from '../../../assets/components/Processing';
import {useFocusEffect} from '@react-navigation/native';
import {isConnectedToInternet} from '../../../assets/constants/constants';
import {NoInternet} from '../../../assets/components/noInternet';

const {width, height} = Dimensions.get('window');

const HEADER_MAX_HEIGHT = height / 1.75;
const HEADER_MIN_HEIGHT = moderateScale(55);
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const DATA = [
  {
    name: 'John Cena',
    status: 'Transferred',
    amount: '-1345,00.00 USD',
    date: '30 May 2022',
  },
  {
    name: 'Don Fleming',
    status: 'Received',
    amount: '-67865,00.00 USD',
    date: '34 May 2022',
  },
  {
    name: 'Deposit via FredomPay Universe ',
    status: 'Deposited',
    amount: '-67865,00.00 USD',
    date: '34 May 2022',
  },
];

const HomeScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [transactionList, setTransactionList] = useState([]);
  const [balance, setBalance] = useState('0.00');
  const [refreshing, setRefreshing] = React.useState(false);
  const [news, setNews] = React.useState('');

  const dispatch = useDispatch();

  const {loginData} = useSelector(state => state.auth);
  const {homeLoading, userData, connection} = useSelector(state => state.home);
  const scrollY = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    React.useCallback(() => {
      handleNav();
      getInfo();
      getNews();
      checkVerification();
    }, [handleNav]),
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    handleNav();
  }, []);

  const handleNav = () => {
    dispatch(homeLoad(true));
    var formdata = new FormData();
    formdata.append('user_id', loginData?.response.user_id);
    console.log(formdata);
    dispatch(balanceDetail(formdata, success));
    dispatch(getTransactions(formdata, transactionSuccess));
  };
  const success = val => {
    console.log(val.response);
    setBalance(val.response.user_balance);
  };
  const transactionSuccess = val => {
    console.log(val.response);
    setTransactionList(val.response);
  };

  const getTransactionDetail = item => {
    dispatch(homeLoad(true));
    var formdata = new FormData();
    formdata.append('transaction_id', item.transaction_id);
    dispatch(transactionDetail(formdata, detailSuccess, detailError));
  };

  const detailSuccess = val => {
    console.log(val.response);
    setModalVisible(true);
    setModalData(val.response);
  };
  const detailError = () => {};

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const scrollDistance = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT - moderateScale(12), HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp',
  });
  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 1],
    extrapolate: 'clamp',
  });
  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, -8],
    extrapolate: 'clamp',
  });

  const titleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 1, 1],
    extrapolate: 'clamp',
  });
  const getInfo = () => {
    dispatch(homeLoad(true));
    var formdata = new FormData();
    formdata.append('user_id', loginData?.response.user_id);
    console.log(formdata);
    dispatch(getProfileInfo(formdata, successInfo, errorInfo));
  };
  const successInfo = val => {
    console.log('val.response');
    dispatch(setUserData(val.response));
  };
  const errorInfo = val => {
    console.log('val.message');
    console.log(val);
    val.number !== null &&
      toast.show(val.message, {
        animationType: 'zoom-in',
        type: 'danger',
      });
  };
  const getNews = () => {
    dispatch(homeLoad(true));
    dispatch(fetchNews(successNews, errorNews));
  };

  const successNews = val => {
    console.log('val.response');
    setNews(val.response);
  };
  const errorNews = val => {
    console.log('val.message');
    console.log(val);
    val.number !== null &&
      toast.show(val.message, {
        animationType: 'zoom-in',
        type: 'danger',
      });
  };

  const detailModal = () => {
    return (
      <View>
        <Modal isVisible={modalVisible}>
          <View style={styles.innerCont}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Icon name="close" color="transparent" />
              <Text style={styles.innerTopText}>Transaction Detail</Text>
              <Icon
                name="close"
                onPress={() => {
                  setModalVisible(false);
                }}
              />
            </View>
            <View>
              <View style={[styles.detailLine, {marginTop: 10}]}>
                <Text style={styles.detailText}>{modalData.type} to</Text>
                <Text style={styles.detailText}>{modalData.description}</Text>
              </View>
              <View style={[styles.detailLine, {backgroundColor: 'white'}]}>
                <Text style={styles.detailText}>Transaction id</Text>
                <Text style={styles.detailText}>{modalData.uuid}</Text>
              </View>
              <View style={styles.detailLine}>
                <Text style={styles.detailText}>{modalData.status}Amount</Text>
                <Text style={styles.detailText}>{modalData.amount}</Text>
              </View>
              <View style={[styles.detailLine, {backgroundColor: 'white'}]}>
                <Text style={styles.detailText}>Fee</Text>
                <Text style={styles.detailText}>{modalData.fee}</Text>
              </View>
              <View style={styles.detailLine}>
                <Text style={styles.detailText}>Total</Text>
                <Text style={styles.detailText}>{modalData.total}</Text>
              </View>
              <View style={[styles.detailLine, {backgroundColor: 'white'}]}>
                <Text style={styles.detailText}>Notes:</Text>
              </View>
              <Text style={[styles.detailText, {width: '90%'}]}>
                {modalData.note}
              </Text>
            </View>
            <View style={styles.bottomTab}>
              <Text style={{fontSize: theme.fontSize.normal, color: 'white'}}>
                {modalData.status} Amount
              </Text>
              <Text style={{fontSize: theme.fontSize.title, color: 'white'}}>
                {modalData.amount}
              </Text>
              <Text style={{fontSize: theme.fontSize.normal, color: 'white'}}>
                {modalData.date}
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  const checkVerification = () => {
    dispatch(homeLoad(true));
    var formdata = new FormData();
    formdata.append('user_id', loginData.response.user_id);
    dispatch(checkVerify(formdata, success1, error1));
    dispatch(checkAddressVerify(formdata, addressSuccess, addressError));
  };

  const success1 = val => {
    console.log(val);

    dispatch(docVerify(val.response === 'Verified' ? true : false));
  };
  const error1 = val => {};

  const addressSuccess = val => {
    console.log(val);

    // setStatus1(val.response === 'Unverified' ? false : true);
    dispatch(addressVerify(val.response === 'Unverified' ? false : true));
  };
  const addressError = val => {};

  return (
    <ImageBackground
      source={require('../../../assets/images/homeBg.png')}
      style={styles.mainContainer}>
      <StatusBar barStyle={'light-content'} />
      <SafeAreaView style={styles.mainContainer}>
        {modalVisible && detailModal()}
        <SafeAreaView style={styles.mainContainer}>
          <Animated.View
            style={{
              backgroundColor: 'white',
              borderTopLeftRadius: moderateScale(30),
              borderTopRightRadius: moderateScale(30),
              transform: [
                {
                  translateY: scrollDistance,
                },
              ],
              width: '100%',
              height: '100%',
              position: 'absolute',
              // zIndex: 1,
            }}
          />

          <View style={[styles.topBar]}>
            <Icon
              name={'closecircle'}
              type={'antdesign'}
              color={'transparent'}
              size={moderateScale(30)}
            />

            <Text style={[styles.title]}>Dashboard</Text>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.topBarSideContainers}
              onPress={() => {
                navigation.navigate('Setting');
              }}>
              <Image
                style={styles.profileImage}
                source={
                  userData?.profile_picture === null
                    ? require('../../../assets/images/profile.png')
                    : {uri: userData?.profile_picture}
                }
              />
            </TouchableOpacity>
          </View>

          <View style={styles.scrollCont}>
            <Animated.ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              style={styles.scroll}
              contentContainerStyle={{
                paddingTop: HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
                paddingBottom: HEADER_MAX_HEIGHT,
              }}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: scrollY}}}],
                {
                  useNativeDriver: true,
                },
              )}>
              {transactionList.length === 0 ? (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginTop: 50,
                  }}>
                  <Image
                    resizeMode="contain"
                    style={{width: 50, height: 50}}
                    source={require('../../../assets/images/noTransaction.png')}
                  />
                  <Text style={{fontWeight: 'bold', marginTop: 10}}>
                    No Transaction found
                  </Text>
                </View>
              ) : (
                transactionList.map(k => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        getTransactionDetail(k);
                      }}
                      style={styles.scrollrender}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                          source={require('../../../assets/images/transaction.png')}
                        />
                        <View style={{marginLeft: 10}}>
                          <Text
                            numberOfLines={1}
                            style={styles.scrollRenderName}>
                            {k.description}
                          </Text>
                          <Text
                            style={[
                              styles.transferred,
                              {
                                backgroundColor:
                                  k.status === 'Success'
                                    ? 'green'
                                    : k.status === 'Pending'
                                    ? '#D6BF60'
                                    : 'red',
                              },
                            ]}>
                            {k.status}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.money}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: theme.fontSize.small,
                          }}>
                          {k.total}
                        </Text>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: theme.fontSize.small,
                          }}>
                          {k.date}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })
              )}
            </Animated.ScrollView>
          </View>
          <Animated.View
            style={[
              styles.header,
              {
                opacity: imageOpacity,
                transform: [
                  {
                    // translateY: headerTranslateY,
                    scaleY: headerTranslateY,
                  },
                ],
              },
            ]}>
            <View style={styles.topTabview}>
              <View style={styles.topTab} />
              <Text
                style={{
                  color: theme.colors.primary,
                  fontSize: theme.fontSize.normal,
                }}>
                FreedomPay News
              </Text>
              <Text
                style={{
                  color: 'white',
                  marginTop: moderateScale(5),
                  fontSize: theme.fontSize.small,
                }}>
                {news}
              </Text>
            </View>
            <Text style={styles.balanceText}>Balance</Text>
            <Text style={styles.balanceAmount}>$ {balance}</Text>

            <View style={styles.buttonCont}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  navigation.navigate('Deposit');
                }}>
                <Image
                  style={{width: 50, height: 50}}
                  resizeMode={'contain'}
                  source={require('../../../assets/images/deposit.png')}
                />
                <Text style={styles.buttonText}>Deposit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  navigation.navigate('CreateWidthdraw');
                }}>
                <Image
                  style={{width: 50, height: 50}}
                  resizeMode={'contain'}
                  source={require('../../../assets/images/widthdraw.png')}
                />
                <Text style={styles.buttonText}>Widthdraw</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </SafeAreaView>
      </SafeAreaView>
      <NoInternet visible={!connection} />
      <Processing visible={homeLoading} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: (width / 100) * 5,
    position: 'absolute',
    width: '100%',
    // zIndex: 4,
  },
  topBarSideContainers: {
    width: moderateScale(50),
    height: moderateScale(50),
    justifyContent: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  title: {
    color: 'white',
    fontSize: theme.fontSize.title,
  },
  header: {
    width: '100%',
    position: 'absolute',
    top: moderateScale(70),
    // zIndex: 100,
    height: HEADER_MAX_HEIGHT - moderateScale(82),
  },
  topIcon: {
    backgroundColor: 'white',
    borderRadius: 100,
    textAlign: 'center',
    textAlignVertical: 'center',
    alignSelf: 'flex-start',
  },
  scrollCont: {
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
    overflow: 'hidden',
    padding: 0,
    // zIndex: 2,
  },
  scroll: {
    marginTop: moderateScale(65),
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
  },
  scrollrender: {
    flexDirection: 'row',
    width: theme.size.width,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.grayTab,
    alignSelf: 'center',
    marginTop: 15,
    borderRadius: 10,
    height: 75,
    paddingHorizontal: 10,
  },
  scrollRenderName: {
    fontSize: theme.fontSize.normal,
    color: 'black',
    width: 120,
  },
  transferred: {
    fontSize: theme.fontSize.small,
    color: 'white',
    textAlign: 'center',
    width: 90,
    borderRadius: 20,
  },
  topTabview: {
    paddingHorizontal: (width / 100) * 5,
    marginTop: moderateScale(20),
    backgroundColor: theme.colors.tabBg,
    height: moderateScale(100),
    justifyContent: 'center',
  },
  topTab: {
    backgroundColor: '#ADA8FF',
  },
  balanceText: {
    color: 'white',
    fontSize: moderateScale(20),
    textAlign: 'center',
    marginTop: moderateScale(20),
  },
  buttonCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: moderateScale(30),
  },
  balanceAmount: {
    color: 'white',
    fontSize: theme.fontSize.title,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    width: moderateScale(140),
    height: moderateScale(120),
    borderRadius: moderateScale(20),
    // overflow: 'hidden',
    backgroundColor: '#ADA8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    marginTop: 10,
    fontSize: theme.fontSize.normal,
  },
  money: {
    alignItems: 'flex-end',
  },

  innerCont: {
    width: width / 1.1,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    paddingBottom: 0,
    justifyContent: 'center',
  },
  innerTopText: {
    fontSize: theme.fontSize.normal,
    color: 'black',
  },
  detailLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.grayTab,
    width: width / 1.1,
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  detailText: {fontSize: theme.fontSize.normal, color: 'black', width: '48%'},
  bottomTab: {
    backgroundColor: theme.colors.primary,
    width: theme.size.width,
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 15,
    marginTop: 20,
  },
});

export default HomeScreen;
