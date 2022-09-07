import React, {useEffect} from 'react';
import {Image, Dimensions, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {authLoad} from '../../redux/actions/auth';

const {width, height} = Dimensions.get('screen');

const Splash = ({navigation}) => {
  const dispatch = useDispatch();
  const {loggedIn} = useSelector(state => state.auth);
  useEffect(() => {
    setTimeout(() => {
      dispatch(authLoad(false));
      loggedIn
        ? navigation.navigate('HomeStack')
        : navigation.navigate('AuthStack');
    }, 2000);
  }, []);

  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image
        resizeMode="contain"
        style={{width: width / 1.1, height: 190}}
        source={require('./../../assets/images/logo.png')}
      />
    </SafeAreaView>
  );
};

export default Splash;
