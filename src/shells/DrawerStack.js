import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ConstituencyScreen from '../screens/mainStackScreens/ConstituencyScreen';
import ElectionOveviewScreen from '../screens/mainStackScreens/ElectionOveviewScreen';
import HomeScreen from '../screens/mainStackScreens/HomeScreen';
import {routes} from './routes';
import CustomDrawerStack from './CustomDrawerStack';
import {AppColors} from '../assests/AppColors';
import Profile from '../screens/mainStackScreens/Profile';

const DrawerStack = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: AppColors.primaryColor,
        drawerActiveTintColor: AppColors.white,
        drawerInactiveTintColor: AppColors.black,
        drawerLabelStyle: {
          fontSize: 16,
          paddingHorizontal: 10,
        },
      }}
      drawerContent={props => <CustomDrawerStack {...props} />}
      initialRouteName={'Home'}>
      <Drawer.Screen name={'Home'} component={HomeScreen} />
      <Drawer.Screen
        name={'Election Oveview'}
        component={ElectionOveviewScreen}
      />
      <Drawer.Screen name={'Profile'} component={Profile} />
    </Drawer.Navigator>
  );
};

export default DrawerStack;

const styles = StyleSheet.create({});
