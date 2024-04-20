import React from 'react';
import AuthStack from './src/shells/AuthStack';
import MainStack from './src/shells/MainStack';
import {NavigationContainer} from '@react-navigation/native';
import {Provider, useSelector} from 'react-redux';
import {store} from './src/app/store';

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
