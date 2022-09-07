import React, {useRef} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  ImageBackground,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {fonts} from 'react-native-elements/dist/config';
import Button from '../../../assets/components/button';
import Dropdown from '../../../assets/components/dropdown';
import Header from '../../../assets/components/header';
import Input from '../../../assets/components/textinput';
import {theme} from '../../../assets/constants/theme';
import styles from './styles';
import {WebView} from 'react-native-webview';
import {useToast} from 'react-native-toast-notifications';
import {useSelector} from 'react-redux';
import {NoInternet} from '../../../assets/components/noInternet';

const {height, width} = Dimensions.get('screen');

const DepositPaymentGateway = ({navigation, route}) => {
  const {homeLoading, connection} = useSelector(state => state.home);
  const {amount, feesData, method} = route.params;
  const webviewRef = useRef();

  const {loginData} = useSelector(state => state.auth);
  const toast = useToast();

  const onMessage = e => {
    let {data} = e.nativeEvent; // data you will receive from html

    console.log(data);
  };

  const injectjs = () => {
    let jsCode = `const bodyData = JSON.stringify({
      title: 'foo',
      body: 'bar',
      userId: 1
    });
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: bodyData,
    }).then(response => response.test()).then(valueText => {
      console.log('................................');
      console.log(JSON.stringify(valueText));
    });`;
    return jsCode;
  };

  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../../../assets/images/homeBg.png')}>
      <SafeAreaView style={styles.mainCont}>
        <Header
          title={'Deposit'}
          navigation={navigation}
          onPressOk={() => {
            navigation.navigate('HomeScreen');
          }}
        />
        <View style={{flex: 1}}>
          <WebView
            ref={webviewRef}
            style={{overflow: 'scroll'}}
            // source={{html: data}}
            originWhitelist={['*']}
            mixedContentMode={'always'}
            injectedJavaScript={injectjs()}
            thirdPartyCookiesEnabled={true}
            scrollEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            useWebKit={Platform.OS == 'ios'}
            javaScriptEnabled={true}
            // onLoadProgress={({path}) => {
            //   console.log('current_path', path);
            // }}
            onNavigationStateChange={state => {
              console.log('current_path', state);

              console.log(state);
              const url = state.url;
              if (url.includes('/payment-successful.php')) {
                toast.show('Payment successfully deposit.', {
                  animationType: 'zoom-in',
                  type: 'success',
                });
                navigation.navigate('DepositSuccess', {
                  amount: amount,
                });
              } else if (url.includes('/payment-cancelled.php')) {
                toast.show('Payment cancelled', {
                  animationType: 'zoom-in',
                  type: 'danger',
                });
                navigation.navigate('HomeScreen', {
                  amount: amount,
                });
              }
            }}
            onMessage={onMessage}
            // onNavigationStateChange={({url, canGoBack}) => {
            //   console.log('url>>>>>>>>', url);
            //   console.log(/payment-successful/.test(url));
            // }}
            // source={{html: '<h1>Hello world</h1>'}}
            // source={{
            //   uri: 'https://freedompayuniverse.com/apis/payment_gateways/paypal/',
            // }}
            source={{
              uri:
                method === 'Paypal'
                  ? `https://freedompayuniverse.com/apis/payment_gateways/paypal/index.php?user_id=${
                      loginData.response.user_id
                    }&first_name=${loginData.response.first_name}&last_name=${
                      loginData.response.last_name
                    }&payer_email=${
                      loginData.response.email
                    }&item_number=${Math.floor(
                      Math.random() * 11 + Math.random() * 15,
                    )}&amount=${
                      parseInt(amount) +
                      (parseInt(feesData.charge_percentage) * amount) / 100
                    }`
                  : `https://freedompayuniverse.com/apis/payment_gateways/coinpayments/index.php?user_id=${
                      loginData.response.user_id
                    }&amount=${
                      parseInt(amount) +
                      (parseInt(feesData.charge_percentage) * amount) / 100
                    }`,
            }}
          />
        </View>
        {/* <View style={styles.topTab}>
            <Text style={{color: 'white', fontSize: theme.fontSize.normal}}>
              Payment Gateway
            </Text>
            <Text style={styles.topDes}>{``}</Text>
          </View>
          <View style={styles.middleCont}>
            <View
              style={{
                height: 280,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: theme.fontSize.normal,
                }}>
                Web View/gateway screen
              </Text>
            </View>
            <Button
              width={'75%'}
              title="Confirm"
              onPress={() => {
                navigation.navigate('DepositSuccess');
              }}
            />
          </View>
          <View style={{height: 40}}></View> */}
      </SafeAreaView>
    </ImageBackground>
  );
};
export default DepositPaymentGateway;
