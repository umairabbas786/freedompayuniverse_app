import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import VerifyPhoneOtp from '../../screens/auth/verifyPhoneOtp/verifyPhoneOtp';
import HomeScreen from '../../screens/home/homeScreen/homeScreen';
import Deposit from '../../screens/home/deposit/deposit';
import ConfirmDeposit from '../../screens/home/confirmDeposit/confirmDeposit';
import DepositPaymentGateway from '../../screens/home/depositPaymentGateway/depositPaymentGateway';
import DepositSuccess from '../../screens/home/depositSuccess/depositSuccess';
import CreateWidthdraw from '../../screens/home/createWidthdraw/createWidthdraw';
import ConfirmWidthdraw from '../../screens/home/confirmWidthdraw/confirmWidthdraw';
import WidthDrawSuccess from '../../screens/home/widthDrawSuccess/widthDrawSuccess';
import WidthDrawPaymentSuccess from '../../screens/home/widthDrawPaymentGateway/widthDrawPaymentGateway';
import SendMoney from '../../screens/home/sendMoney/sendMoney';
import SendSuccess from '../../screens/home/sendSuccess/sendSuccess';
import NewTicket from '../../screens/home/newTicket/newTicket';
import Tickets from '../../screens/home/tickets/tickets';
import KYCVerification from '../../screens/home/kycVerification/kycVerification';
import Setting from '../../screens/home/setting/setting';
import WidthDrawPaymentGateway from '../../screens/home/widthDrawPaymentGateway/widthDrawPaymentGateway';
import BottomTab from '../bottomTab';
import ManageTickets from '../../screens/home/manageTickets/manageTickets';
import WidthdrawSetting from '../../screens/home/widthdrawSetting/widthdrawSetting';
import AddWidthdrawSetting from '../../screens/home/addWidthdrawSetting/addWidthdrawSetting';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={BottomTab} />
      <Stack.Screen name="Deposit" component={Deposit} />
      <Stack.Screen name="ConfirmDeposit" component={ConfirmDeposit} />
      <Stack.Screen
        name="DepositPaymentGateway"
        component={DepositPaymentGateway}
      />
      <Stack.Screen name="DepositSuccess" component={DepositSuccess} />
      <Stack.Screen name="CreateWidthdraw" component={CreateWidthdraw} />
      <Stack.Screen name="ConfirmWidthdraw" component={ConfirmWidthdraw} />
      <Stack.Screen name="WidthDrawSuccess" component={WidthDrawSuccess} />
      <Stack.Screen name="WidthdrawSetting" component={WidthdrawSetting} />
      <Stack.Screen
        name="AddWidthdrawSetting"
        component={AddWidthdrawSetting}
      />
      <Stack.Screen
        name="WidthDrawPaymentGateway"
        component={WidthDrawPaymentGateway}
      />
      <Stack.Screen name="SendMoney" component={SendMoney} />
      <Stack.Screen name="SendSuccess" component={SendSuccess} />
      <Stack.Screen name="VerifyPhoneOtp" component={VerifyPhoneOtp} />
      <Stack.Screen name="NewTicket" component={NewTicket} />
      <Stack.Screen name="ManageTickets" component={ManageTickets} />
      <Stack.Screen name="KYCVerification" component={KYCVerification} />
      <Stack.Screen name="MSetting" component={Setting} />
    </Stack.Navigator>
  );
};
export default HomeStack;
