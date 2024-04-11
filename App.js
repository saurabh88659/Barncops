import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AuthStack from './src/shells/AuthStack';
import MainStack from './src/shells/MainStack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreens from './src/screens/AuthStackScreens/LoginScreens';
import HomeScreen from './src/screens/mainStackScreens/HomeScreen';
import ElectionOveviewScreen from './src/screens/mainStackScreens/ElectionOveviewScreen';
import {Provider, useSelector} from 'react-redux';
import {provider} from 'react-redux';
import {store} from './src/app/store';
import ConstituencyScreen from './src/screens/mainStackScreens/ConstituencyScreen';

const App = () => {
  const loggedIn = useSelector(state => state.auth.loggedIn);
  return (
    <NavigationContainer>
      {loggedIn ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const AppWapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWapper;
