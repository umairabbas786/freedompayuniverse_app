import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/homeScreen/homeScreen';
import SendMoney from '../screens/home/sendMoney/sendMoney';
import HomeStack from './stacks/homeStack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {theme} from '../assets/constants/theme';
import Tickets from '../screens/home/tickets/tickets';
import {Icon} from 'react-native-elements';
import Setting from '../screens/home/setting/setting';
import ScamProtest from '../screens/home/scamProtest/scamProtest';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Tickets') {
            iconName = focused ? 'send' : 'send';
            return (
              <Icon
                name={'ticket'}
                type="foundation"
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Home') {
            iconName = focused ? 'dashboard' : 'dashboard';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'SendMoney') {
            iconName = focused ? 'send' : 'send';
            return <FontAwesome name={iconName} size={size} color={color} />;
          } else if (route.name === 'Ticket') {
            iconName = focused ? 'send' : 'send';
            return (
              <Icon
                name={'ticket'}
                type="foundation"
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Setting') {
            iconName = focused ? 'gear' : 'gear';
            return (
              <Icon
                name={'gear'}
                type="font-awesome"
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'ScamProtest') {
            iconName = focused ? 'error' : 'error';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          }

          // You can return any component that you like here!
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="ScamProtest" component={ScamProtest} />
      <Tab.Screen name="SendMoney" component={SendMoney} />
      <Tab.Screen name="Ticket" component={Tickets} />
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  );
};
export default BottomTab;
