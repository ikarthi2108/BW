// src/navigation/AppNavigator.js
import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Register from '../screens/Register/Register';
import Login from '../screens/Login/Login';
import EmailVerification from '../components/EmailVerification';
import TabNavigator from './TabNavigator';
import {ActivityIndicator, View} from 'react-native';
import Profile from '../screens/Profile/Profile';
import RegisterWorker from '../screens/RegisterWorker/RegisterWorker';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');

        if (accessToken || isLoggedIn === 'true') {
          setInitialRoute('HomeScreen');
        } else {
          setInitialRoute('Login');
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setInitialRoute('Login');
      }
    };

    checkAuthStatus();
  }, []);

  if (initialRoute === null) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="EmailVerification" component={EmailVerification} />
      <Stack.Screen name="HomeScreen" component={TabNavigator} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="RegisterWorker" component={RegisterWorker} />
    </Stack.Navigator>
  );
}
