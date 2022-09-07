import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Header from '../../../assets/components/header';
import {theme} from '../../../assets/constants/theme';
import styles from './styles';
import CheckBox from '@react-native-community/checkbox';
import Input from '../../../assets/components/textinput';
import DocumentPicker, {
  isInProgress,
  types,
} from 'react-native-document-picker';
import Button from '../../../assets/components/button';
import {useDispatch, useSelector} from 'react-redux';
import {
  checkAddressVerify,
  checkIAddressSubmission,
  checkIdentitySubmission,
  checkVerify,
  docVerify,
  homeLoad,
  submitAddress,
  submitIdentity,
} from '../../../redux/actions/home';
import {useToast} from 'react-native-toast-notifications';
import {Processing} from '../../../assets/components/Processing';
import Dropdown from '../../../assets/components/dropdown';
import {NoInternet} from '../../../assets/components/noInternet';

const KYCVerification = ({navigation}) => {
  const [tab, setTab] = useState(1);
  const [toggleCheckBox2, setToggleCheckBox2] = useState(false);
  const [result, setResult] = useState([]);
  const [result1, setResult1] = useState([]);
  const [status, setStatus] = useState(false);
  const [status1, setStatus1] = useState(false);
  const [identityType, setIdentityType] = useState('');
  const [identityNumber, setIdentityNumber] = useState('');

  const {loginData} = useSelector(state => state.auth);

  const handleError = err => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };
  const toast = useToast();
  useEffect(() => {
    checkVerification();
  }, []);
  const {homeLoading, connection} = useSelector(state => state.home);
  const {logindata} = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const checkVerification = () => {
    dispatch(homeLoad(true));
    var formdata = new FormData();
    formdata.append('user_id', loginData.response.user_id);
    dispatch(checkVerify(formdata, success, error));
    dispatch(checkAddressVerify(formdata, addressSuccess, addressError));
  };

  const success = val => {
    console.log(val);
    val.response === 'Unverified' &&
      toast.show('Your Identity Documents are no Verifired Yet.', {
        animationType: 'zoom-in',
        type: 'danger',
      });
    setStatus(val.response === 'Unverified' ? false : true);
  };
  const error = val => {
    toast.show(val.message, {
      animationType: 'zoom-in',
      type: 'danger',
    });
  };

  const addressSuccess = val => {
    console.log(val);
    val.response === 'Unverified' &&
      toast.show('Your Address Documents are no Verifired Yet.', {
        animationType: 'zoom-in',
        type: 'danger',
      });
    // setStatus1(val.response === 'Unverified' ? false : true);
    setStatus1(val.response !== 'Unverified' ? false : true);
    dispatch(docVerify(val.response === 'Unverified' ? false : true));
  };
  const addressError = val => {
    toast.show(val.message, {
      animationType: 'zoom-in',
      type: 'danger',
    });
  };

  const sendDocuments = () => {
    if (
      identityType === '' ||
      (identityNumber === '') | (result.length === 0)
    ) {
      toast.show('Please fill all required fields', {
        animationType: 'zoom-in',
        type: 'danger',
      });
    } else {
      dispatch(homeLoad(true));
      var formdata = new FormData();
      formdata.append('user_id', loginData.response.user_id);
      formdata.append(
        'identity_type',
        identityType === 0
          ? 'Driving Licence'
          : identityType === 1
          ? 'Passport'
          : 'National ID',
      );
      formdata.append('identity_number', identityNumber);
      formdata.append('file', {
        uri: result[0].uri, // this is the path to your file. see Expo ImagePicker or React Native ImagePicker
        type: result[0].type, // example: image/jpg
        name: result[0].name, // example: upload.jpg
      });
      dispatch(submitIdentity(formdata, sendIdentitySuccess, identityError));
    }
  };

  const sendIdentitySuccess = val => {
    console.log(val);
    toast.show(val.response, {
      animationType: 'zoom-in',
      type: 'success',
    });
  };
  const identityError = val => {
    console.log('val');
    console.log(val);
    toast.show(val.message, {
      animationType: 'zoom-in',
      type: 'danger',
    });
  };

  const submitAddressVerify = () => {
    if (result1.length === 0) {
      toast.show('Select the File', {
        animationType: 'zoom-in',
        type: 'danger',
      });
    } else {
      dispatch(homeLoad(true));
      var formdata = new FormData();
      formdata.append('user_id', loginData.response.user_id);
      formdata.append('file', {
        uri: result1[0].uri, // this is the path to your file. see Expo ImagePicker or React Native ImagePicker
        type: result1[0].type, // example: image/jpg
        name: result1[0].name, // example: upload.jpg
      });
      dispatch(submitAddress(formdata, sendAddressSuccess, AddressError));
    }
  };

  const sendAddressSuccess = val => {
    console.log(val);
    toast.show(val.response, {
      animationType: 'zoom-in',
      type: 'success',
    });
  };
  const AddressError = val => {
    console.log('val');
    console.log(val);
    toast.show(val.message, {
      animationType: 'zoom-in',
      type: 'danger',
    });
  };

  const checkSubmission = () => {
    dispatch(homeLoad(true));
    var formdata = new FormData();
    formdata.append('user_id', loginData.response.user_id);
    dispatch(
      checkIdentitySubmission(
        formdata,
        identitySubmissionSuccess,
        submissionerror,
      ),
    );
    dispatch(
      checkIAddressSubmission(
        formdata,
        identitySubmissionSuccess,
        addressError,
      ),
    );
  };

  const identitySubmissionSuccess = val => {
    console.log(val);
    val.response === 'Documents Already Submitted!' &&
      toast.show('Your Documents are under review. Please wait for 24 hours', {
        animationType: 'zoom-in',
        type: 'danger',
      });
    setStatus(val.response === 'Unverified' ? false : true);
  };
  const submissionerror = val => {
    toast.show(val.message, {
      animationType: 'zoom-in',
      type: 'danger',
    });
  };

  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../../../assets/images/homeBg.png')}>
      <SafeAreaView style={styles.mainCont}>
        <NoInternet visible={!connection} />
        <Header title={'KYC Verification'} navigation={navigation} />
        <View style={styles.tabCont}>
          <TouchableOpacity
            style={[
              styles.tabs,
              {backgroundColor: tab === 1 ? '#DCDBFF' : 'white'},
            ]}
            onPress={() => {
              setTab(1);
            }}>
            <Text style={{fontSize: 13, fontWeight: 'bold', color: 'black'}}>
              Identity Verification
              <Text
                style={{
                  fontWeight: '400',
                  color: status ? 'green' : 'red',
                  fontSize: 10,
                }}>
                {status ? '  Verified' : '  Unverified'}
              </Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabs,
              {backgroundColor: tab === 2 ? '#DCDBFF' : 'white'},
            ]}
            onPress={() => {
              setTab(2);
            }}>
            <Text style={{fontSize: 13, fontWeight: 'bold', color: 'black'}}>
              Address Verification
              <Text
                style={{
                  fontWeight: '400',
                  color: status1 ? 'green' : 'red',
                  fontSize: 10,
                }}>
                {status1 ? '  Verified' : '  Unverified'}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{width: theme.size.width, alignSelf: 'center'}}>
          {/* <Text
            style={{
              fontSize: theme.fontSize.normal,
              color: 'white',
              marginTop: 10,
            }}>
            Verification Type
          </Text> */}
          {/* <View style={styles.checkboxCont}>
            <CheckBox
              style={{width: 20, height: 20, borderWidth: 0, padding: 0}}
              disabled={false}
              value={toggleCheckBox1}
              boxType={'square'}
              onValueChange={newValue => setToggleCheckBox1(newValue)}
              size={10}
              tintColor={'white'}
              onCheckColor={'black'}
              onFillColor={'white'}
              onTintColor={'white'}
              tintColors={{true: 'white', false: 'white'}}
            />
            <Text style={styles.checkboxText}>Identity Verification</Text>
          </View>
          <View style={styles.checkboxCont}>
            <CheckBox
              style={{width: 20, height: 20, borderWidth: 0, padding: 0}}
              disabled={false}
              value={toggleCheckBox2}
              boxType={'square'}
              onValueChange={newValue => setToggleCheckBox2(newValue)}
              size={10}
              tintColor={'white'}
              onCheckColor={'black'}
              onFillColor={'white'}
              onTintColor={'white'}
              tintColors={{true: 'white', false: 'white'}}
            />
            <Text style={styles.checkboxText}>Adress Verification</Text>
          </View> */}
        </View>
        {tab === 1 ? (
          <View>
            <Dropdown
              width={'90%'}
              title={'Identity Type'}
              options={['Driving Licence', 'Passport', 'National ID']}
              deropDownWidth="80%"
              titleColor="white"
              defaultVal={'Select Identity type'}
              onSelect={val => {
                console.log(val);
                setIdentityType(val);
              }}
            />
            <Input
              title="Identity Number"
              titleColor="white"
              placeHolder=""
              value={identityNumber}
              onChangeText={val => {
                setIdentityNumber(val);
              }}
            />

            <View style={[styles.input, {width: theme.size.width}]}>
              <Text style={styles.title}>{'Upload Identity Proof'}</Text>
              <View style={[styles.inputCont]}>
                <View style={styles.proofCont}>
                  <Text
                    style={styles.choosenFiles}
                    onPress={() =>
                      DocumentPicker.pick().then(setResult).catch(handleError)
                    }>
                    Choose Files
                  </Text>
                  <Text style={styles.noChoosen}>
                    {result.length === 0 ? 'No File Choosen' : 'File Picked'}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{height: 40}}></View>
            <Button
              backgroundColor="white"
              borderColor="black"
              title={'Confirm'}
              color={'black'}
              onPress={() => {
                sendDocuments();
              }}
            />
          </View>
        ) : (
          <View>
            <View style={[styles.input, {width: theme.size.width}]}>
              <Text style={styles.title}>{'Address Proof'}</Text>
              <View style={[styles.inputCont]}>
                <View style={styles.proofCont}>
                  <Text
                    style={styles.choosenFiles}
                    onPress={() =>
                      DocumentPicker.pick().then(setResult1).catch(handleError)
                    }>
                    Choose Files
                  </Text>
                  <Text style={styles.noChoosen}>
                    {' '}
                    {result1.length === 0 ? 'No File Choosen' : 'File Picked'}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{height: 40}}></View>
            <Button
              backgroundColor="white"
              borderColor="black"
              title={'Confirm'}
              color={'black'}
              onPress={() => {
                submitAddressVerify();
              }}
            />
          </View>
        )}
        <Processing visible={homeLoading} />
      </SafeAreaView>
    </ImageBackground>
  );
};
export default KYCVerification;
