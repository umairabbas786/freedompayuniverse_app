import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import AuthStack from './stacks/authStack';
import HomeStack from './stacks/homeStack';
import BottomTab from './bottomTab';
import Splash from '../screens/splash/splash';

const MainNav = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="HomeStack" component={HomeStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNav;
