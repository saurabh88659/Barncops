import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/mainStackScreens/HomeScreen';
import ElectionOveviewScreen from '../screens/mainStackScreens/ElectionOveviewScreen';
import ConstituencyScreen from '../screens/mainStackScreens/ConstituencyScreen';
import {routes} from './routes';
import DrawerStack from './DrawerStack';
import IndiaVotesScreen from '../screens/mainStackScreens/IndiaVotesScreen';

const MainStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={'DrawerStack'} component={DrawerStack} />
      <Stack.Screen name={routes.Home_Screen} component={HomeScreen} />
      <Stack.Screen
        name={routes.Election_Oveview_Screen}
        component={ElectionOveviewScreen}
      />
      <Stack.Screen
        name={routes.Constituency_Screen}
        component={ConstituencyScreen}
      />
      <Stack.Screen
        name={routes.IndiaVotes_Screen}
        component={IndiaVotesScreen}
      />
    </Stack.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
