import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  RefreshControl,
} from 'react-native';
import Header from '../../../assets/components/header';
import {theme} from '../../../assets/constants/theme';
import RBSheet from 'react-native-raw-bottom-sheet';
import styles from './styles';
import ImagePicker from 'react-native-image-crop-picker';
import {Icon} from 'react-native-elements';
import Input from '../../../assets/components/textinput';
import Button from '../../../assets/components/button';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../../redux/actions/auth';
import {
  getProfileInfo,
  homeLoad,
  setUserData,
  updateUserInfo,
  updatePassword,
  updatePicture,
} from '../../../redux/actions/home';
import {Processing} from '../../../assets/components/Processing';
import {useFocusEffect} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';
import {NoInternet} from '../../../assets/components/noInternet';

const Setting = ({navigation}) => {
  const refRBSheet = useRef();
  const dispatch = useDispatch();
  const {loginData} = useSelector(state => state.auth);
  const {homeLoading, userData, docVerfied, connection, addressVerified} =
    useSelector(state => state.home);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [profileInfo, setProfileInfo] = useState([]);
  const [picture, setPicture] = useState(userData?.profile_picture);
  const [picInfo, setPicInfo] = useState([]);
  const [firstName, setFirstName] = useState(userData?.first_name);
  const [lastName, setLastName] = useState(userData?.last_name);
  const [email, setEmail] = useState(userData?.email);
  const [phoneNumber, SetPhoneNumer] = useState(userData?.phone);
  const [address1, setAddress1] = useState(userData?.address1);
  const [address2, setAddress2] = useState(userData?.address2);
  const [city, setCity] = useState(userData?.city);
  const [state, setState] = useState(userData?.state);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getInfo();
  }, []);

  const toast = useToast();

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setPicture(image.path);
      picUpdate(image);
      var filename = image.path.substr(location.pathname.lastIndexOf('/') + 1);
      console.log(filename);
      refRBSheet.current.close();
    });
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      getInfo();
    }, [getInfo]),
  );
  const getInfo = () => {
    dispatch(homeLoad(true));
    var formdata = new FormData();
    formdata.append('user_id', loginData.response.user_id);
    console.log(formdata);
    dispatch(getProfileInfo(formdata, success, error));
  };
  const success = val => {
    console.log('val.response');
    setRefreshing(false);
    console.log(val);
    dispatch(setUserData(val.response));
    setFirstName(val.response.first_name);
    setLastName(val.response.last_name);
    setEmail(val.response.email);
    SetPhoneNumer(val.response.phone);
    setAddress1(val.response.address1);
    setAddress2(val.response.address2);
    setCity(val.response.city);
    setState(val.response.state);
    setPicture(val.response.profile_picture);
  };
  const error = val => {
    console.log('val.message');
    console.log(val);
    setRefreshing(false);

    val.number !== null &&
      toast.show(val.message, {
        animationType: 'zoom-in',
        type: 'danger',
      });
  };

  const updateInfo = () => {
    if (
      address1 === null ||
      address2 === null ||
      state === null ||
      city === null
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
      formdata.append('address1', address1);
      formdata.append('address2', address2);
      formdata.append('state', state);
      formdata.append('city', city);

      console.log(formdata);
      dispatch(updateUserInfo(formdata, successUpdate, errorUpdate));
    }
  };
  const successUpdate = val => {
    console.log('val.response');
    console.log(val);
    toast.show(val.response, {
      animationType: 'zoom-in',
      type: 'success',
      duration: 2000,
      animationType: 'slide-in',
    });
  };
  const errorUpdate = val => {
    console.log('val.message');
    console.log(val);

    toast.show(val.response, {
      animationType: 'zoom-in',
      type: 'danger',
      duration: 2000,
      animationType: 'slide-in',
    });
  };

  const passwordUpdate = () => {
    if (newPassword === '' || confirmPassword === '') {
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
      formdata.append('password', newPassword);
      dispatch(
        updatePassword(formdata, updatePasswordSuccess, updateErrorPassword),
      );
    }
  };
  const updatePasswordSuccess = val => {
    console.log('val.response');
    console.log(val);
    toast.show(val.response, {
      animationType: 'zoom-in',
      type: 'success',
      duration: 2000,
      animationType: 'slide-in',
    });
    setPasswordVisible(false);
  };
  const updateErrorPassword = val => {
    console.log('val.message');
    console.log(val);

    toast.show(val.response, {
      animationType: 'zoom-in',
      type: 'danger',
      duration: 2000,
      animationType: 'slide-in',
    });
  };

  const picUpdate = pic => {
    dispatch(homeLoad(true));
    var formdata = new FormData();
    formdata.append('user_id', loginData.response.user_id);
    formdata.append('picture', {
      name: 'picture.jpg',
      type: pic.mime,
      uri: pic.path,
    });

    console.log('formdata');
    console.log(formdata);
    dispatch(updatePicture(formdata, updatePicSuccess, updateErrorPic));
  };
  const updatePicSuccess = val => {
    console.log('val.response');
    console.log(val);
    toast.show(val.response, {
      animationType: 'zoom-in',
      type: 'success',
      duration: 2000,
      animationType: 'slide-in',
    });
    setPasswordVisible(false);
  };
  const updateErrorPic = val => {
    console.log('val.message');
    console.log(val);

    toast.show(val.response, {
      animationType: 'zoom-in',
      type: 'danger',
      duration: 2000,
      animationType: 'slide-in',
    });
  };

  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../../../assets/images/homeBg.png')}>
      <SafeAreaView style={styles.mainCont}>
        <NoInternet visible={!connection} />
        <Header title={'Setting'} navigation={navigation} />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View>
            <Button
              width={'90%'}
              color={'black'}
              title={'Submit KYC'}
              backgroundColor={'white'}
              extraData={
                docVerfied && addressVerified ? '(Verified)' : '(Unverified)'
              }
              extraColor={docVerfied && addressVerified ? 'green' : 'red'}
              disabled={docVerfied && addressVerified ? true : false}
              onPress={() => {
                navigation.navigate('KYCVerification');
              }}
            />
          </View>
          <View style={{alignSelf: 'center', zIndex: 0, marginTop: 10}}>
            <Image
              style={styles.profileImage}
              source={
                userData?.profile_picture === null
                  ? require('../../../assets/images/profile.png')
                  : {uri: picture}
              }
            />
            <Text
              style={{
                color: 'white',
                fontSize: theme.fontSize.small,
                alignSelf: 'center',
                marginTop: 10,
              }}
              onPress={() => {
                refRBSheet.current.open();
              }}>
              Edit Picture
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: theme.size.width,
              alignSelf: 'center',
            }}>
            <Input
              backgroundColor={'white'}
              title={'First Name'}
              placeHolder={'First Name'}
              titleColor={'white'}
              width={'49%'}
              placeholderTextColor={'#AFAFAF'}
              borderColor={'white'}
              value={firstName}
              onChangeText={val => {
                setFirstName(val);
              }}
              editable={false}
            />
            <Input
              backgroundColor={'white'}
              titleColor={'white'}
              title={'Last Name'}
              placeHolder={'Last Name'}
              width={'49%'}
              placeholderTextColor={'#AFAFAF'}
              borderColor={'white'}
              value={lastName}
              onChangeText={val => {
                setLastName(val);
              }}
              editable={false}
            />
          </View>
          <Input
            backgroundColor={'white'}
            titleColor={'white'}
            placeHolder={'abc@gmail.com'}
            title={'Email'}
            placeholderTextColor={'#AFAFAF'}
            borderColor={'white'}
            keyboardType={'email-address'}
            value={email}
            onChangeText={val => {
              setEmail(val);
            }}
            editable={false}
          />
          <Input
            backgroundColor={'white'}
            titleColor={'white'}
            placeHolder={'+9234567891'}
            title={'Phone Number'}
            placeholderTextColor={'#AFAFAF'}
            borderColor={'white'}
            keyboardType={'phone-pad'}
            value={phoneNumber}
            onChangeText={val => {
              SetPhoneNumer(val);
            }}
            editable={false}
          />
          <Input
            backgroundColor={'white'}
            titleColor={'white'}
            placeHolder={''}
            title={'Address 1'}
            placeholderTextColor={'#AFAFAF'}
            borderColor={'white'}
            keyboardType={'default'}
            value={address1}
            onChangeText={val => {
              setAddress1(val);
            }}
          />
          <Input
            backgroundColor={'white'}
            titleColor={'white'}
            placeHolder={''}
            title={'Address 2'}
            placeholderTextColor={'#AFAFAF'}
            borderColor={'white'}
            keyboardType={'default'}
            value={address2}
            onChangeText={val => {
              setAddress2(val);
            }}
          />
          <Input
            backgroundColor={'white'}
            titleColor={'white'}
            placeHolder={''}
            title={'City'}
            placeholderTextColor={'#AFAFAF'}
            borderColor={'white'}
            keyboardType={'default'}
            value={city}
            onChangeText={val => {
              setCity(val);
            }}
          />
          <Input
            backgroundColor={'white'}
            titleColor={'white'}
            placeHolder={''}
            title={'State'}
            placeholderTextColor={'#AFAFAF'}
            borderColor={'white'}
            keyboardType={'default'}
            value={state}
            onChangeText={val => {
              setState(val);
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: theme.size.width,
              alignSelf: 'center',
              justifyContent: 'space-between',
              marginVertical: 20,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: theme.fontSize.normal,
              }}>
              Change Password
            </Text>
            <Icon
              onPress={() => {
                setPasswordVisible(!passwordVisible);
              }}
              name={passwordVisible ? 'upcircle' : 'downcircle'}
              type="ant-design"
              color={'white'}
            />
          </View>
          {passwordVisible ? (
            <View>
              <Input
                backgroundColor={'white'}
                titleColor={'white'}
                placeHolder={''}
                title={'New Password'}
                placeholderTextColor={'#AFAFAF'}
                borderColor={'white'}
                keyboardType={'phone-pad'}
                value={newPassword}
                onChangeText={val => {
                  setNewPassword(val);
                }}
              />
              <Input
                backgroundColor={'white'}
                titleColor={'white'}
                placeHolder={''}
                title={'Confirm Password'}
                placeholderTextColor={'#AFAFAF'}
                borderColor={'white'}
                keyboardType={'default'}
                value={confirmPassword}
                onChangeText={val => {
                  setConfirmPassword(val);
                }}
              />
              <Button
                title={'Update'}
                backgroundColor={'white'}
                color={'black'}
                onPress={() => {
                  passwordUpdate();
                }}
              />
            </View>
          ) : (
            <View>
              <View style={{height: 40}}></View>
              <Button
                title={'Update'}
                backgroundColor={'white'}
                color={'black'}
                onPress={() => {
                  updateInfo();
                }}
              />
              <Button
                title={'Logout'}
                backgroundColor={'red'}
                color={'white'}
                onPress={() => {
                  dispatch(logout(false));
                  navigation.replace('AuthStack');
                }}
              />
            </View>
          )}

          <View style={{height: 40}}></View>
        </ScrollView>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          height={120}
          minClosingHeight={0}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity
              style={styles.bottomTabs}
              onPress={() => {
                openCamera();
              }}>
              <Icon name="camera" type="feather" size={28} />
              <Text style={{color: 'black', marginTop: 5}}>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomTabs}
              onPress={() => {
                openGallery();
              }}>
              <Icon name="picture" type="ant-design" size={28} />
              <Text style={{color: 'black', marginTop: 5}}>Open Gallery</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
        <Processing visible={homeLoading} />
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Setting;
